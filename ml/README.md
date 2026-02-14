# VitalGuard ML Module

This module contains the machine learning components for VitalGuard, including data preprocessing, model training, and a prediction API.

## Setup

1.  **Install Dependencies**:
    ```bash
    pip install -r ../requirements.txt
    ```

2.  **Generate Dummy Data** (if you don't have real data):
    ```bash
    python ml/create_dummy_data.py
    ```

3.  **Process Data**:
    ```bash
    python ml/preprocess.py
    ```

4.  **Train Model**:
    ```bash
    python ml/train_model.py
    ```

## Running the API

To serve the model for the frontend to consume:

```bash
python ml/api.py
```

The API will be available at `http://localhost:5000`.

## API Endpoints

-   `POST /predict`: Predicts patient risk based on vitals.
    -   **Body**: JSON object with vital signs (heart_rate, spo2, blood_pressure, etc.)
    -   **Response**: detailed risk analysis and score.
