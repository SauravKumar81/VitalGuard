# VitalGuard - Patient Risk Assessment System

VitalGuard is a comprehensive full-stack application designed to assist healthcare professionals in monitoring patient vital signs and predicting the risk of clinical deterioration. By leveraging Machine Learning, VitalGuard provides real-time risk assessments (Stable vs. High Risk) based on key physiological parameters.

## 🚀 Features

*   **Real-time Risk Prediction**: Instantly assesses patient stability using an integrated ML model.
*   **Patient Management**: Create and manage patient records securely.
*   **Assessment History**: Track patient health trends over time with historical assessment data.
*   **Modern Dashboard**: A responsive and intuitive user interface built with React and Vite.
*   **Secure API**: Robust FastAPI backend handling authentication, data validation, and persistence.
*   **ML Microservice**: Dedicated Flask-based API for model inference (optional/standalone usage).

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React 19
*   **Build Tool**: Vite
*   **Language**: TypeScript
*   **Routing**: React Router DOM
*   **Icons**: Lucide React

### Backend
*   **Framework**: FastAPI
*   **Database**: SQLite (via SQLModel)
*   **ORM**: SQLModel (SQLAlchemy + Pydantic)
*   **Authentication**: OAuth2 with Password Flow (JWT)

### Machine Learning
*   **Language**: Python
*   **Libraries**: Scikit-learn, Pandas, NumPy
*   **API**: Flask (for standalone ML service)
*   **Model**: Logistic Regression / Random Forest (trained on patient vital data)

## 📂 Project Structure

```
VitalGuard/
├── backend/            # FastAPI Application and Database Logic
│   ├── main.py         # API Entry Point
│   ├── models.py       # SQLModel Database Schemas
│   ├── auth.py         # Authentication Logic
│   └── database.py     # Database Connection
├── frontend/           # React Frontend Application
│   ├── src/            # Source Code
│   │   ├── pages/      # Application Pages (Login, Dashboard, etc.)
│   │   └── App.tsx     # Main Component
├── ml/                 # Machine Learning Module
│   ├── models/         # Trained Model Files
│   ├── api.py          # Standalone Flask API
│   ├── predict.py      # Inference Logic
│   └── train_model.py  # Model Training Script
└── README.md           # Project Documentation
```

## ⚡ Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites
*   **Node.js** (v18+ recommended)
*   **Python** (v3.8+)
*   **Git**

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Start-Up-Sih/VitalGuard
    cd VitalGuard
    ```

2.  **Run the Backend**
    This script will install Python dependencies and start the FastAPI server.
    ```bash
    ./run_backend.bat
    ```
    *   **Server**: `http://localhost:8000`
    *   **API Documentation**: `http://localhost:8000/docs`

3.  **Run the Frontend**
    This script will install Node modules and start the Vite development server
    ```bash
    ./run_frontend.bat
    ```
    *   **App URL**: `http://localhost:5173`

4.  **Run the ML API (Optional)**
    If you wish to run the Machine Learning model as a separate microservice.
    ```bash
    ./run_ml_api.bat
    ```
    *   **Server**: `http://localhost:5000`

## 🧠 ML Model Pipeline

The Machine Learning component is the "brain" of VitalGuard.

1.  **Data Processing**: `preprocess.py` cleans raw medical data, handles missing values, and scales features.
2.  **Training**: `train_model.py` uses historical data to train the model, handling class imbalances with SMOTE.
3.  **Inference**: `predict.py` loads the saved model (`models/best_model.joblib`) to make real-time predictions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT Licens
