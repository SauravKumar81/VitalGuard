# VitalGuard Backend

This is the main backend for the VitalGuard application, built with FastAPI.

## Features
- **Authentication**: User registration and login (JWT).
- **Patient Management**: Create and view patient records.
- **Risk Assessment**: Integrate with the ML model to predict patient risk.

## Setup

1.  **Install Dependencies**:
    Dependencies are handled by the `run_backend.bat` script, but you can install them manually:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the Server**:
    Use the provided batch script in the root directory:
    ```bash
    ../run_backend.bat
    ```
    Or run manually:
    ```bash
    uvicorn main:app --reload --port 8000
    ```

## API Documentation

Once the server is running, visit:
-   **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
-   **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## ML Integration

The backend automatically loads the ML model from the `../ml/models` directory. Ensure you have trained the model using `ml/train_model.py` before running the backend.
