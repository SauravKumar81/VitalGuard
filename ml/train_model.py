import pandas as pd
import numpy as np
import joblib
import time
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, 
    f1_score, roc_auc_score, confusion_matrix, roc_curve
)
from imblearn.over_sampling import SMOTE
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

def train_and_evaluate_models():
    """
    Train and evaluate multiple ML models
    """
    print("\n" + "="*70)
    print("ML MODEL TRAINING & EVALUATION")
    print("="*70)
    
    # Load data
    print("\n Loading preprocessed data...")
    data = joblib.load('ml/data/processed_data.joblib')
    
    X_train = data['X_train']
    X_val = data['X_val']
    X_test = data['X_test']
    y_train = data['y_train']
    y_val = data['y_val']
    y_test = data['y_test']
    
    print(f"   Train: {len(X_train):,} samples")
    print(f"   Val: {len(X_val):,} samples")
    print(f"   Test: {len(X_test):,} samples")
    
    # Handle imbalance with SMOTE
    print("\n Handling class imbalance with SMOTE...")
    print(f"   Before: {pd.Series(y_train).value_counts().to_dict()}")
    
    smote = SMOTE(random_state=42)
    X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)
    
    print(f"   After: {pd.Series(y_train_balanced).value_counts().to_dict()}")
    
    # Train models
    models = {}
    results = {}
    
    # 1. Logistic Regression
    print("\n" + "-"*70)
    print("1- Training Logistic Regression...")
    print("-"*70)
    start = time.time()
    lr = LogisticRegression(max_iter=1000, random_state=42, class_weight='balanced', C=0.1)
    lr.fit(X_train_balanced, y_train_balanced)
    print(f"   ✓ Completed in {time.time()-start:.2f}s")
    models['Logistic Regression'] = lr
    
    # 2. Random Forest
    print("\n" + "-"*70)
    print("2- Training Random Forest...")
    print("-"*70)
    start = time.time()
    rf = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42, 
                                 class_weight='balanced', n_jobs=-1)
    rf.fit(X_train_balanced, y_train_balanced)
    print(f"   ✓ Completed in {time.time()-start:.2f}s")
    models['Random Forest'] = rf
    
    # 3. Gradient Boosting
    print("\n" + "-"*70)
    print("3- Training Gradient Boosting...")
    print("-"*70)
    start = time.time()
    gb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
    gb.fit(X_train_balanced, y_train_balanced)
    print(f"   ✓ Completed in {time.time()-start:.2f}s")
    models['Gradient Boosting'] = gb
    
    # Evaluate all models
    print("\n" + "="*70)
    print(" MODEL EVALUATION ON TEST SET")
    print("="*70)
    
    best_f1 = 0
    best_model = None
    best_model_name = None
    
    for model_name, model in models.items():
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        
        metrics = {
            'accuracy': accuracy_score(y_test, y_pred),
            'precision': precision_score(y_test, y_pred),
            'recall': recall_score(y_test, y_pred),
            'f1_score': f1_score(y_test, y_pred),
            'auc_roc': roc_auc_score(y_test, y_pred_proba)
        }
        
        results[model_name] = {
            'metrics': metrics,
            'y_pred': y_pred,
            'y_pred_proba': y_pred_proba,
            'confusion_matrix': confusion_matrix(y_test, y_pred)
        }
        
        print(f"\n{model_name}:")
        print(f"   Accuracy:  {metrics['accuracy']:.4f}")
        print(f"   Precision: {metrics['precision']:.4f}")
        print(f"   Recall:    {metrics['recall']:.4f}")
        print(f"   F1-Score:  {metrics['f1_score']:.4f}")
        print(f"   AUC-ROC:   {metrics['auc_roc']:.4f}")
        
        if metrics['f1_score'] > best_f1:
            best_f1 = metrics['f1_score']
            best_model = model
            best_model_name = model_name
    
    # Compare with baseline
    print("\n" + "="*70)
    print(" COMPARISON WITH NEWS BASELINE")
    print("="*70)
    
    baseline = joblib.load('ml/models/baseline_metrics.joblib')
    
    comparison_df = pd.DataFrame({
        'Model': ['NEWS Baseline'] + list(models.keys()),
        'Accuracy': [baseline['accuracy']] + [results[m]['metrics']['accuracy'] for m in models.keys()],
        'Precision': [baseline['precision']] + [results[m]['metrics']['precision'] for m in models.keys()],
        'Recall': [baseline['recall']] + [results[m]['metrics']['recall'] for m in models.keys()],
        'F1-Score': [baseline['f1_score']] + [results[m]['metrics']['f1_score'] for m in models.keys()],
        'AUC-ROC': [baseline['auc_roc']] + [results[m]['metrics']['auc_roc'] for m in models.keys()]
    })
    
    print("\n" + comparison_df.to_string(index=False))
    comparison_df.to_csv('ml/models/model_comparison.csv', index=False)
    print("\n✓ Saved comparison to ml/models/model_comparison.csv")
    
    # Save best model
    print(f"\n" + "="*70)
    print(f" BEST MODEL: {best_model_name}")
    print(f"   F1-Score: {best_f1:.4f}")
    print("="*70)
    
    joblib.dump(best_model, 'ml/models/best_model.joblib')
    joblib.dump(best_model_name, 'ml/models/best_model_name.joblib')
    joblib.dump(results, 'ml/models/test_results.joblib')
    
    print("\n✓ Saved best model to ml/models/best_model.joblib")
    print("✓ Saved all results")
    
    print("\n" + "="*70)
    print(" MODEL TRAINING COMPLETE!")
    print("="*70)
    
    print("\n Next step: python ml/predict.py")
    
    return results, best_model, best_model_name

if __name__ == "__main__":
    results, best_model, best_model_name = train_and_evaluate_models()