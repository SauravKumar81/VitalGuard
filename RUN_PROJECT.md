# How to Run VitalGuard Project

This guide provides instructions on how to set up and run the VitalGuard project, including the frontend, backend, and machine learning components.

## Prerequisites

- **Python 3.8+**: Ensure you have Python installed.
- **Node.js**: Required for the frontend.
- **Git**: For version control.
- **PowerShell** (Windows): For running setup scripts.

## 1. Machine Learning Setup

The ML component processes patient data and trains models to predict health deterioration.

### A. Install Dependencies
```bash
pip install -r requirements.txt
```

### B. Prepare Data and Train Model
Run the setup script to preprocess data and train the models. This will use the large dataset in `data/patient_vitals.csv` if available.
```powershell
./setup_ml.ps1
```
*Note: This process may take several minutes as it trains on a large dataset.*

## 2. Running the Backend Server (REQUIRED)

The frontend communicates with this server to manage patients and assessments. It also integrates the ML model.

```powershell
./run_backend.bat
```
- The API will be available at: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`

*(Optional) Standalone ML API:*
To run **only** the ML prediction model without the full backend:
```bash
python ml/api.py
```
*Port 5000. Not used by the main frontend app.*

## 3. Running the Frontend

The frontend is a React application that interacts with the backend API.

### A. Navigate to Frontend Directory
```bash
cd frontend
```

### B. Install Dependencies
```bash
npm install
```

### C. Start Development Server
```bash
npm run dev
```
- The application will be accessible at the URL provided in the terminal (usually `http://localhost:5173`).

## Summary of Commands

**Terminal 1 (Backend - ML API):**
```bash
python ml/api.py
```

**Terminal 2 (Frontend - React App):**
```bash
cd frontend
npm run dev
```

## Troubleshooting

- **ModuleNotFoundError: No module named 'flask_cors'**: Run `pip install flask-cors`.
- **Model not found**: Ensure you have run `python ml/train_model.py` or `./setup_ml.ps1` to generate the model artifacts (`best_model.joblib`, etc.) in `ml/models/`.
