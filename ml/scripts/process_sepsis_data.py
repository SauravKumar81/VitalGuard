import pandas as pd
import numpy as np
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

def process_sepsis_data():
    """
    Process sepsis dataset for ML training
    Handles both PhysioNet .psv files and CSV files
    """
    print("\n" + "="*60)
    print("PROCESSING SEPSIS DATASET")
    print("="*60 + "\n")
    
    # Check for PhysioNet .psv files first
    base_path = Path('ml/data/raw/sepsis')
    training_a = base_path / 'training_setA'
    training_b = base_path / 'training_setB'
    
    patient_files = []
    
    # Look for .psv files
    if training_a.exists():
        psv_files = list(training_a.glob('*.psv'))
        patient_files.extend(psv_files)
        print(f" Found training_setA: {len(psv_files)} .psv files")
    
    if training_b.exists():
        psv_files = list(training_b.glob('*.psv'))
        patient_files.extend(psv_files)
        print(f" Found training_setB: {len(psv_files)} .psv files")
    
    # If we found .psv files, process them
    if patient_files:
        print(f"\n Processing PhysioNet .psv files...")
        print(f"   Total files: {len(patient_files)}")
        print("   (This may take 1-2 minutes...)\n")
        
        all_data = []
        
        # Process files (limit to 1000 for speed, or use all)
        max_files = min(1000, len(patient_files))  # Change to len(patient_files) for all
        
        for idx, file_path in enumerate(patient_files[:max_files], 1):
            try:
                # Read pipe-separated file
                patient_df = pd.read_csv(file_path, sep='|')
                patient_df['patient_id'] = file_path.stem
                all_data.append(patient_df)
                
                if idx % 100 == 0:
                    print(f"   ✓ Processed {idx}/{max_files} files...")
                    
            except Exception as e:
                continue
        
        df = pd.concat(all_data, ignore_index=True)
        print(f"\n✓ Loaded {len(df):,} records from {max_files} patients")
    
    else:
        # Fallback: Try CSV files
        print("No .psv files found. Trying CSV files...")
        
        possible_paths = [
            'ml/data/raw/sepsis_synthetic.csv',
            'ml/data/raw/sepsis/Paitients_Files_Train.csv',
            'ml/data/raw/sepsis/training_setA.csv',
        ]
        
        data_path = None
        for path in possible_paths:
            if Path(path).exists():
                data_path = path
                break
        
        if data_path is None:
            print(" No sepsis data found!")
            print("\nOptions:")
            print("1. Make sure .psv files are in ml/data/raw/sepsis/training_setA/")
            print("2. Or run: python ml/scripts/generate_sepsis_like_data.py")
            return None
        
        print(f" Loading data from: {data_path}")
        df = pd.read_csv(data_path)
    
    print(f"✓ Columns found: {list(df.columns)[:10]}...\n")
    
    # Standardize column names
    print("🔧 Standardizing column names...")
    column_mapping = {
        'HR': 'heart_rate',
        'O2Sat': 'spo2',
        'Temp': 'temperature',
        'SBP': 'systolic_bp',
        'Resp': 'respiratory_rate',
        'Age': 'age',
        'Gender': 'gender',
        'SepsisLabel': 'deterioration',
        'ICULOS': 'hours_in_icu'
    }
    
    df = df.rename(columns=column_mapping)
    
    # Handle missing values
    print("🧹 Cleaning missing values...")
    
    vital_signs = ['heart_rate', 'respiratory_rate', 'systolic_bp', 'spo2', 'temperature']
    
    # Forward fill within each patient
    if 'patient_id' in df.columns:
        for col in vital_signs:
            if col in df.columns:
                df[col] = df.groupby('patient_id')[col].fillna(method='ffill')
                df[col] = df.groupby('patient_id')[col].fillna(method='bfill')
    
    # Fill remaining with median
    for col in vital_signs:
        if col in df.columns:
            df[col] = df[col].fillna(df[col].median())
    
    # Drop rows with critical missing values
    before = len(df)
    df = df.dropna(subset=['heart_rate', 'respiratory_rate', 'systolic_bp'])
    print(f"   Dropped {before - len(df):,} rows with missing critical vitals")
    print(f"   Remaining: {len(df):,} records\n")
    
    # Add consciousness level
    if 'consciousness' not in df.columns:
        print(" Creating consciousness level...")
        df['consciousness'] = 'Alert'
        df.loc[df['systolic_bp'] < 70, 'consciousness'] = 'Pain'
        df.loc[df['systolic_bp'] < 60, 'consciousness'] = 'Unresponsive'
    
    # Fix gender
    if 'gender' in df.columns:
        df['gender'] = df['gender'].map({0: 'F', 1: 'M', 0.0: 'F', 1.0: 'M'})
    else:
        df['gender'] = 'M'
    
    # Ensure age exists
    if 'age' not in df.columns:
        df['age'] = 65
    else:
        df['age'] = df['age'].fillna(65)
    
    # Calculate NEWS score
    print(" Calculating NEWS scores...")
    df['news_score'] = df.apply(calculate_news_score, axis=1)
    
    # Risk category
    df['risk_category'] = df['news_score'].apply(
        lambda x: 'low' if x <= 4 else
                 'medium' if x <= 6 else
                 'high' if x <= 9 else
                 'critical'
    )
    
    # Add timestamp
    if 'hours_in_icu' in df.columns:
        df['timestamp'] = pd.to_datetime('2024-01-01') + pd.to_timedelta(df['hours_in_icu'], unit='h')
    else:
        df['timestamp'] = pd.to_datetime('2024-01-01')
    
    # Ensure deterioration exists
    if 'deterioration' not in df.columns:
        print(" Creating deterioration labels from vitals...")
        df['deterioration'] = (
            (df['systolic_bp'] < 90) |
            (df['spo2'] < 90) |
            (df['news_score'] >= 7)
        ).astype(int)
    
    # Save processed data
    output_path = 'ml/data/patient_vitals.csv'
    df.to_csv(output_path, index=False)
    
    print(f"\n Saved to: {output_path}")
    
    # Summary
    print("\n" + "="*60)
    print("DATASET SUMMARY")
    print("="*60)
    print(f"Total records: {len(df):,}")
    if 'patient_id' in df.columns:
        print(f"Unique patients: {df['patient_id'].nunique():,}")
    print(f"\nDeterioration distribution:")
    print(df['deterioration'].value_counts())
    print(f"Deterioration rate: {df['deterioration'].mean():.1%}")
    print(f"\nRisk category distribution:")
    print(df['risk_category'].value_counts())
    
    print("\n✅ Processing complete! Run your notebook now.")
    
    return df

def calculate_news_score(row):
    """Calculate NEWS score"""
    score = 0
    
    # Respiratory Rate
    if pd.notna(row.get('respiratory_rate')):
        rr = row['respiratory_rate']
        if rr <= 8: score += 3
        elif rr <= 11: score += 1
        elif rr <= 20: score += 0
        elif rr <= 24: score += 2
        else: score += 3
    
    # SpO2
    if pd.notna(row.get('spo2')):
        spo2 = row['spo2']
        if spo2 <= 91: score += 3
        elif spo2 <= 93: score += 2
        elif spo2 <= 95: score += 1
    
    # Systolic BP
    if pd.notna(row.get('systolic_bp')):
        sbp = row['systolic_bp']
        if sbp <= 90: score += 3
        elif sbp <= 100: score += 2
        elif sbp <= 110: score += 1
        elif sbp > 219: score += 3
    
    # Heart Rate
    if pd.notna(row.get('heart_rate')):
        hr = row['heart_rate']
        if hr <= 40: score += 3
        elif hr <= 50: score += 1
        elif hr <= 90: score += 0
        elif hr <= 110: score += 1
        elif hr <= 130: score += 2
        else: score += 3
    
    # Temperature
    if pd.notna(row.get('temperature')):
        temp = row['temperature']
        if temp <= 35.0: score += 3
        elif temp <= 36.0: score += 1
        elif temp <= 38.0: score += 0
        elif temp <= 39.0: score += 1
        else: score += 2
    
    # Consciousness
    if row.get('consciousness') != 'Alert':
        score += 3
    
    return score

if __name__ == "__main__":
    df = process_sepsis_data()