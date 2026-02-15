import pandas as pd
import numpy as np
import os
import glob
from pathlib import Path
import warnings

# --- SETUP ---
# Adjust these paths as needed based on your structure
BASE_DIR = Path(__file__).resolve().parent
RAW_DATA_DIR = BASE_DIR / 'data' / 'raw' / 'sepsis'
OUTPUT_FILE = BASE_DIR / 'data' / 'patient_vitals.csv'

def compile_sepsis_dataset():
    """
    Compiles individual patient PSV files from the PhysioNet Sepsis Challenge 2019 dataset
    into a single CSV file suitable for model training.
    """
    print(f"Searching for PSV files in {RAW_DATA_DIR}...")
    
    # 1. Find all PSV files recursively
    psv_files = []
    for root, dirs, files in os.walk(RAW_DATA_DIR):
        for file in files:
            if file.endswith(".psv"):
                psv_files.append(os.path.join(root, file))
    
    if not psv_files:
        print(f"Error: No PSV files found in {RAW_DATA_DIR}")
        return

    print(f"Found {len(psv_files)} patient files. Processing...")

    all_data = []
    
    # 2. Process files in batches to manage memory if needed, but for 20k files pandas list usually fine
    # For progress tracking
    total_files = len(psv_files)
    
    for i, file_path in enumerate(psv_files):
        if i % 1000 == 0:
            print(f"  Processed {i}/{total_files} files...")
            
        try:
            # Read PSV file (Pipe Separated Values)
            df = pd.read_csv(file_path, sep='|')
            
            # Add patient identifier (derived from filename)
            patient_id = Path(file_path).stem  # e.g., 'p000001'
            df['patient_id'] = patient_id
            
            # --- FEATURE MAPPING ---
            # Map PhysioNet columns to our internal schema
            # PhysioNet cols: HR,O2Sat,Temp,SBP,MAP,DBP,Resp,EtCO2,BaseExcess,HCO3,FiO2,pH,PaCO2,SaO2,AST,BUN,Alkalinephos,Calcium,Chloride,Creatinine,Bilirubin_direct,Glucose,Lactate,Magnesium,Phosphate,Potassium,Bilirubin_total,TroponinI,Hct,Hgb,PTT,WBC,Fibrinogen,Platelets,Age,Gender,Unit1,Unit2,HospAdmTime,ICULOS,SepsisLabel
            
            # We want: 
            # patient_id, timestamp (simulated from ICULOS), hours_in_icu (ICULOS), 
            # age, gender, heart_rate (HR), respiratory_rate (Resp), spo2 (O2Sat), 
            # systolic_bp (SBP), temperature (Temp), consciousness (if avail?), news_score (calc later), 
            # risk_category (calc later), deterioration (SepsisLabel)

            # Rename columns
            rename_map = {
                'HR': 'heart_rate',
                'O2Sat': 'spo2',
                'Temp': 'temperature',
                'SBP': 'systolic_bp',
                'Resp': 'respiratory_rate',
                'Age': 'age',
                'Gender': 'gender',
                'ICULOS': 'hours_in_icu',
                'SepsisLabel': 'deterioration'
            }
            df = df.rename(columns=rename_map)
            
            # Keep only relevant columns + derived ones
            # Fill missing gender/age if consistent per patient (usually they are)
            df['age'] = df['age'].ffill().bfill()
            df['gender'] = df['gender'].ffill().bfill().map({1: 'F', 0: 'M'}) # 1=Female, 0=Male in PhysioNet
            
            # Add dummy timestamp (start date + hours)
            # define a start date for the patient
            start_date = pd.Timestamp('2024-01-01')
            df['timestamp'] = start_date + pd.to_timedelta(df['hours_in_icu'], unit='h')
            
            # Placeholder for consciousness (not in dataset, assume Alert/NaN)
            df['consciousness'] = 'Alert' # Default
            
            # Placeholder for NEWS score (will be calculated by preprocess.py or baseline)
            df['news_score'] = np.nan
            
            # Placeholder for risk_category
            df['risk_category'] = 'unknown'

            # Select final columns
            cols_to_keep = [
                'patient_id', 'timestamp', 'hours_in_icu', 
                'age', 'gender', 
                'heart_rate', 'respiratory_rate', 'spo2', 'systolic_bp', 'temperature',
                'consciousness', 'news_score', 'risk_category', 'deterioration'
            ]
            
            # Filter to keep columns that exist
            cols_to_keep = [c for c in cols_to_keep if c in df.columns]
            
            all_data.append(df[cols_to_keep])
            
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    # 3. Concatenate all data
    print("Concatenating data...")
    full_df = pd.concat(all_data, ignore_index=True)
    
    # 4. Save to CSV
    print(f"Saving {len(full_df)} records to {OUTPUT_FILE}...")
    full_df.to_csv(OUTPUT_FILE, index=False)
    print("Done!")

if __name__ == "__main__":
    compile_sepsis_dataset()
