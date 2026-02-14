import pandas as pd
import numpy as np
import os
from pathlib import Path

def generate_dummy_data(n_samples=1000):
    """
    Generate synthetic patient vital signs data
    """
    np.random.seed(42)
    
    # Generate balanced classes
    n_deteriorating = int(n_samples * 0.3)
    n_stable = n_samples - n_deteriorating
    
    # 1. Stable patients (Normal ranges)
    stable_data = {
        'age': np.random.randint(18, 90, n_stable),
        'gender': np.random.choice(['M', 'F'], n_stable),
        'heart_rate': np.random.normal(72, 10, n_stable),
        'systolic_bp': np.random.normal(120, 15, n_stable),
        'respiratory_rate': np.random.normal(16, 3, n_stable),
        'temperature': np.random.normal(37.0, 0.5, n_stable),
        'spo2': np.random.normal(98, 1, n_stable),
        'consciousness': ['Alert'] * n_stable,
        'deterioration': [0] * n_stable
    }
    
    # 2. Deteriorating patients (Abnormal ranges)
    deteriorating_data = {
        'age': np.random.randint(40, 95, n_deteriorating),
        'gender': np.random.choice(['M', 'F'], n_deteriorating),
        'heart_rate': np.random.normal(110, 20, n_deteriorating),  # Tachycardia
        'systolic_bp': np.random.normal(95, 20, n_deteriorating),  # Hypotension
        'respiratory_rate': np.random.normal(24, 6, n_deteriorating), # Tachypnea
        'temperature': np.random.choice(
            [np.random.normal(38.5, 1.0), np.random.normal(35.5, 0.5)], 
            n_deteriorating
        ), # Fever or Hypothermia
        'spo2': np.random.normal(92, 4, n_deteriorating), # Hypoxia
        'consciousness': np.random.choice(
            ['Alert', 'Voice', 'Pain', 'Unresponsive'], 
            n_deteriorating, 
            p=[0.4, 0.3, 0.2, 0.1]
        ),
        'deterioration': [1] * n_deteriorating
    }
    
    # Combine
    df_stable = pd.DataFrame(stable_data)
    df_det = pd.DataFrame(deteriorating_data)
    df = pd.concat([df_stable, df_det]).sample(frac=1).reset_index(drop=True)
    
    # Clip values to realistic ranges
    df['spo2'] = df['spo2'].clip(70, 100)
    df['heart_rate'] = df['heart_rate'].clip(30, 200)
    df['systolic_bp'] = df['systolic_bp'].clip(60, 250)
    df['respiratory_rate'] = df['respiratory_rate'].clip(8, 60)
    df['temperature'] = df['temperature'].clip(34, 42)
    
    # Calculate crude NEWS score for existing logic compatibility (optional but good)
    # (Simplified logic just for consistent feature existence if needed)
    df['news_score'] = np.random.randint(0, 20, len(df)) # Placeholder, real logic is in predictor
    
    # Ensure directories exist
    os.makedirs('ml/data', exist_ok=True)
    
    # Save
    output_path = 'ml/data/patient_vitals.csv'
    df.to_csv(output_path, index=False)
    print(f"Generated {n_samples} synthetic records at {output_path}")
    print(df['deterioration'].value_counts())

if __name__ == "__main__":
    generate_dummy_data()
