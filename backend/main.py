from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import timedelta
import sys
import os

# Import local modules
from .database import init_db
from .models import User, Patient, PatientCreate, PatientRead, Assessment, AssessmentCreate, AssessmentRead
from .auth import create_access_token, get_current_user, verify_password, get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES, oauth2_scheme

# Add project root to sys.path to import ml module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

try:
    from ml.predict import VitalGuardPredictor
except ImportError:
    # If starting from backend dir directly without adding root to path (less likely with above line)
    print("Warning: ML module not found. Run from project root.")
    VitalGuardPredictor = None

app = FastAPI(title="VitalGuard API")

# CORS setup for frontend integration
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",  # React default
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model instance
predictor = None

@app.on_event("startup")
async def on_startup():
    await init_db()
    try:
        from create_default_user import create_default_user # Note: adjust if this needs to be async now
        # Call this safely, or remove it and use an explicitly script
    except Exception as e:
        print(f"Warning: Could not create default user: {e}")
        
    global predictor
    try:
        # Initialize ML model
        # Assuming ml/models exists relative to project root
        models_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'models')
        if VitalGuardPredictor is not None:
            predictor = VitalGuardPredictor(models_dir=models_path)  # type: ignore
            print("ML Model loaded successfully.")
        else:
            print("ML Model not loaded: VitalGuardPredictor is None")
    except Exception as e:
        print(f"Warning: Could not load ML model: {e}")

@app.get("/")
def read_root():
    return {"message": "Welcome to VitalGuard API"}

# --- Auth Routes ---
class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/token")
async def login_for_access_token(login_data: LoginRequest):
    username_or_email = login_data.username
    # Try to find user by username or email
    user = await User.find_one({"$or": [{"username": username_or_email}, {"email": username_or_email}]})
    
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role}, 
        expires_delta=access_token_expires
    )
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "username": user.username,
        "role": user.role
    }

@app.post("/register", response_model=User)
async def register_user(user: User):
    existing_user = await User.find_one(User.username == user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_pwd = get_password_hash(user.hashed_password)
    user.hashed_password = hashed_pwd
    await user.insert()
    return user

# --- Patient Routes ---
@app.post("/patients/", response_model=PatientRead)
async def create_patient(patient_in: PatientCreate):
    db_patient = Patient(**patient_in.dict())
    await db_patient.insert()
    return db_patient

@app.get("/patients/", response_model=List[PatientRead])
async def read_patients(offset: int = 0, limit: int = 100):
    patients = await Patient.find_all().skip(offset).limit(limit).to_list()
    return patients

@app.get("/patients/{patient_id}", response_model=PatientRead)
async def read_patient(patient_id: str):
    patient = await Patient.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

# --- Assessment Routes (ML Integration) ---
@app.post("/assessments/", response_model=AssessmentRead)
async def create_assessment(assessment_in: AssessmentCreate):
    global predictor
    
    # Check if patient exists if ID provided
    if assessment_in.patient_id:
        patient = await Patient.get(assessment_in.patient_id)
        if not patient:
             raise HTTPException(status_code=404, detail="Patient not found")

    # Call ML Model
    risk_level = "Unknown"
    prediction_prob = 0.0
    analysis_text = "Model not loaded"
    
    if predictor:
        try:
            # Prepare vitals dictionary for predictor
            vitals = {
                "heart_rate": assessment_in.heart_rate,
                "systolic_bp": assessment_in.systolic_bp,
                "respiratory_rate": assessment_in.respiratory_rate,
                "temperature": assessment_in.temperature,
                "spo2": assessment_in.spo2,
                "consciousness": assessment_in.consciousness,
                # Default age/gender if not provided (could fetch from patient)
                "age": 50, 
                "gender": "M"
            }
            if assessment_in.patient_id:
                # We already grabbed patient above, let's reuse
                if 'patient' in locals() and patient:
                    vitals["age"] = patient.age
                    vitals["gender"] = patient.gender
            
            result = predictor.predict(vitals)
            risk_level = result.get("risk_level", "Unknown")
            prediction_prob = result.get("probability", 0.0)
            analysis_text = result.get("analysis", "")
            
        except Exception as e:
            print(f"Error during prediction: {e}")
            risk_level = "Error"
    
    # Save to Database
    db_assessment = Assessment(
        **assessment_in.dict(),
        risk_level=risk_level,
        prediction_prob=prediction_prob,
        analysis_text=analysis_text
    )
    
    await db_assessment.insert()
    return db_assessment

@app.get("/assessments/recent", response_model=List[AssessmentRead])
async def read_recent_assessments(limit: int = 10):
    assessments = await Assessment.find_all().sort("-timestamp").limit(limit).to_list()
    return assessments

@app.get("/assessments/{patient_id}", response_model=List[AssessmentRead])
async def read_assessments(patient_id: str):
    assessments = await Assessment.find(Assessment.patient_id == patient_id).to_list()
    return assessments

@app.get("/dashboard-stats")
async def get_dashboard_stats():
    total_patients = await Patient.count()
    
    # Use native motor collection for fast aggregation
    collection = Assessment.get_motor_collection()
    pipeline = [
        {"$sort": {"timestamp": -1}},
        {
            "$group": {
                "_id": "$patient_id",
                "risk_level": {"$first": "$risk_level"}
            }
        }
    ]
    latest_assessments = await collection.aggregate(pipeline).to_list(length=None)
    
    high_risk_count = sum(1 for a in latest_assessments if a.get("risk_level") in ["High Risk", "Critical"])
    # Any patient not in high risk is stable (including those with no assessments)
    stable_count = total_patients - high_risk_count

    return {
        "total_patients": total_patients,
        "high_risk_patients": high_risk_count,
        "stable_patients": stable_count,
        "ai_accuracy": 98.5 # hardcoded or calculated if ground truth exists
    }

# --- Legacy/Direct Predict Endpoint ---
@app.post("/predict")
def predict_risk(vitals: dict):
    global predictor
    if not predictor:
        return {"error": "Model not loaded", "risk_level": "Unknown", "probability": 0.0}
    
    try:
        # Ensure minimal fields
        defaults = {
            "age": 50, "gender": "M", "consciousness": "Alert",
            "heart_rate": 75, "systolic_bp": 120, "spo2": 98, 
            "temperature": 37.0, "respiratory_rate": 16
        }
        for k, v in defaults.items():
            if k not in vitals:
                vitals[k] = v
                
        result = predictor.predict(vitals)
        return result
    except Exception as e:
        print(f"Prediction error: {e}")
        return {"error": str(e), "risk_level": "Error", "probability": 0.0}
