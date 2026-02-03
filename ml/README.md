#  VitalGuard Machine Learning Module

This folder contains the complete pipeline for the Patient Risk Assessment AI. It is designed to take patient vital signs and predict the risk of deterioration (Stable vs. High Risk).

##  File Guide: What does everything do?

### 1. Core Logic (The "Brain")
*   **`train_model.py`**: **(The Builder)**
    *   This script acts as the "teacher." It takes historical patient data, fixes imbalances (using SMOTE), and trains multiple models (Logistic Regression, Random Forest, Gradient Boosting).
    *   It picks the best performing model and saves it to the `models/` folder.
*   **`predict.py`**: **(The Connector)**
    *   **Crucial for your Backend.** This is the file your website will import.
    *   It loads the saved model and provides a simple function `predict(vitals)` that returns "High Risk" or "Stable".
*   **`preprocess.py`**: **(The Cleaner)**
    *   Raw medical data is messy. This script handles missing values, scales numbers (e.g., standardizing BP), and creates new features (like calculating NEWS scores automatically).

### 2. Evaluation & Testing
*   **`baseline_model.py`**: **(The Benchmark)**
    *   It calculates the "NEWS Score" (National Early Warning Score - a standard medical rule).
    *   We use this to prove that our AI is *better* than just using a simple manual checklist.
*   **`test_inference.py`**:
    *   A simple script to test if predictions are working without running the full website.

### 3. Data & Storage
*   **`models/`**:
    *   Stores the "frozen" intelligence. After training, files like `best_model.joblib` appear here.
    *   *Note:* These are what `predict.py` loads.
*   **`data/`**:
    *   Contains your raw CSVs and the processed versions. (Excluded from GitHub).

---

##  Data Pipeline Flow

1.  **Input:** Raw CSV data (`data/raw/`)
2.  **Processing:** `preprocess.py` cleans it and calculates features.
3.  **Training:** `train_model.py` learns patterns from the clean data.
4.  **Saving:** The best "brain" is saved to `models/best_model.joblib`.
5.  **Inference:** Your Backend imports `VitalGuardPredictor` from `predict.py`.
6.  **Output:** Backend sends patient vitals -> `predict.py` -> Returns Risk Level.

---

