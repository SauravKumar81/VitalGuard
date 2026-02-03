import pandas as pd
import numpy as np
from pathlib import Path

def process_dataset_csv():
    """
    Process the Dataset.csv file from PhysioNet
    Compatible with Pandas 3.0+
    """
    print("\n" + "="*60)
    print("PROCESSING DATASET.CSV")
    print("="*60 + "\n")
    
    csv_path = Path('ml/data/raw/sepsis/Dataset.csv')
    
    if not csv_path.exists():
        print(f" File not found: {csv_path}")
        return None
    
    print(f" Loading: {csv_path}")
    print("   (This may take a moment, file is 153 MB...)\n")
    
    # Load the CSV
    df = pd.read_csv(csv_path)
    
    print(f"✓ Loaded {len(df):,} records")
    print(f"✓ Columns ({len(df.columns)}): {list(df.columns)[:10]}...\n")
    
    # Standardize column names
    print(" Standardizing column names...")
    column_mapping = {
        'HR': 'heart_rate',
        'O2Sat': 'spo2',
        'Temp': 'temperature',
        'SBP': 'systolic_bp',
        'Resp': 'respiratory_rate',
        'Age': 'age',
        'Gender': 'gender',
        'SepsisLabel': 'deterioration',
        'ICULOS': 'hours_in_icu',
        'Patient_ID': 'patient_id'
    }
    
    df = df.rename(columns=column_mapping)
    
    print(f"   Found {df['patient_id'].nunique():,} unique patients\n")
    
    # Clean data - Pandas 3.0 compatible
    print(" Cleaning data...")
    vital_signs = ['heart_rate', 'respiratory_rate', 'systolic_bp', 'spo2', 'temperature']
    
    # Forward fill by patient (Pandas 3.0 syntax)
    for col in vital_signs:
        if col in df.columns:
            # Sort by patient and hour to ensure proper forward fill
            df = df.sort_values(['patient_id', 'hours_in_icu'])
            df[col] = df.groupby('patient_id')[col].ffill()  # New syntax
            df[col] = df.groupby('patient_id')[col].bfill()  # New syntax
    
    # Fill remaining with median
    for col in vital_signs:
        if col in df.columns:
            median_val = df[col].median()
            df[col] = df[col].fillna(median_val)
    
    # Drop critical missing
    before = len(df)
    df = df.dropna(subset=['heart_rate', 'respiratory_rate', 'systolic_bp'])
    print(f"   Removed {before - len(df):,} rows with missing critical vitals")
    print(f"   Remaining: {len(df):,} records\n")
    
    # Add consciousness
    print(" Creating consciousness level...")
    df['consciousness'] = 'Alert'
    df.loc[df['systolic_bp'] < 70, 'consciousness'] = 'Pain'
    df.loc[df['systolic_bp'] < 60, 'consciousness'] = 'Unresponsive'
    
    # Fix gender
    if 'gender' in df.columns:
        df['gender'] = df['gender'].map({0: 'F', 1: 'M', 0.0: 'F', 1.0: 'M'})
    else:
        df['gender'] = 'M'
    
    # Age
    if 'age' not in df.columns:
        df['age'] = 65
    else:
        df['age'] = df['age'].fillna(65)
    
    # Calculate NEWS
    print(" Calculating NEWS scores...")
    df['news_score'] = df.apply(calculate_news_score, axis=1)
    
    df['risk_category'] = df['news_score'].apply(
        lambda x: 'low' if x <= 4 else 'medium' if x <= 6 else 'high' if x <= 9 else 'critical'
    )
    
    # Timestamp
    if 'hours_in_icu' in df.columns:
        df['timestamp'] = pd.to_datetime('2024-01-01') + pd.to_timedelta(df['hours_in_icu'], unit='h')
    else:
        df['timestamp'] = pd.to_datetime('2024-01-01')
    
    # Deterioration
    if 'deterioration' not in df.columns:
        print(" Creating deterioration labels...")
        df['deterioration'] = ((df['systolic_bp'] < 90) | (df['spo2'] < 90) | (df['news_score'] >= 7)).astype(int)
    
    # Select final columns
    final_cols = [
        'patient_id', 'timestamp', 'hours_in_icu',
        'age', 'gender',
        'heart_rate', 'respiratory_rate', 'spo2', 'systolic_bp', 'temperature',
        'consciousness', 'news_score', 'risk_category', 'deterioration'
    ]
    
    df_final = df[final_cols].copy()
    
    # Save
    output_path = 'ml/data/patient_vitals.csv'
    df_final.to_csv(output_path, index=False)
    
    print(f"\n Saved to: {output_path}\n")
    
    # Summary
    print("="*60)
    print("DATASET SUMMARY")
    print("="*60)
    print(f"✓ Total records: {len(df_final):,}")
    print(f"✓ Unique patients: {df_final['patient_id'].nunique():,}")
    print(f"✓ Average records per patient: {len(df_final) / df_final['patient_id'].nunique():.1f}")
    
    print(f"\n Deterioration Distribution:")
    print(df_final['deterioration'].value_counts())
    print(f"   Rate: {df_final['deterioration'].mean():.1%}")
    
    print(f"\n Risk Categories:")
    print(df_final['risk_category'].value_counts())
    
    print(f"\n Vital Signs Summary:")
    vitals_summary = df_final[vital_signs].describe()
    print(vitals_summary)
    
    # Compare stable vs deteriorating
    stable = df_final[df_final['deterioration'] == 0]
    deteriorating = df_final[df_final['deterioration'] == 1]
    
    print(f"\n Stable vs Deteriorating Comparison:")
    print(f"\n   Stable patients (n={len(stable):,}):")
    print(f"      {stable[vital_signs].mean()}")
    
    print(f"\n   Deteriorating patients (n={len(deteriorating):,}):")
    print(f"      {deteriorating[vital_signs].mean()}")
    
    print("\n" + "="*60)
    print(" REAL PHYSIONET DATA PROCESSED!")
    print("="*60)
    print("\n You now have 1.5M+ real ICU patient records!")
    print("   Run your notebook to explore the data!\n")
    
    return df_final

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
    df = process_dataset_csv()