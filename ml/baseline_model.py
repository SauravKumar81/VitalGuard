import pandas as pd
import numpy as np
import joblib
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, 
    f1_score, roc_auc_score, confusion_matrix,
    classification_report, roc_curve
)
import matplotlib.pyplot as plt
import seaborn as sns

def evaluate_news_baseline():
    """
    Evaluate NEWS score as baseline model
    """
    print("\n" + "="*70)
    print("NEWS BASELINE MODEL EVALUATION")
    print("="*70)
    
    # Load processed data
    data = joblib.load('ml/data/processed_data.joblib')
    
    # Load original data to get NEWS scores
    from pathlib import Path
    input_path = 'data/patient_vitals.csv'
    if not Path(input_path).exists():
        input_path = '../data/patient_vitals.csv'
        if not Path(input_path).exists():
            input_path = 'ml/data/patient_vitals.csv'
            
    print(f"Loading original data from: {input_path}")
    df = pd.read_csv(input_path)
    
    # Split based on same random state
    from sklearn.model_selection import train_test_split
    
    _, df_test = train_test_split(
        df, test_size=0.2, random_state=42, stratify=df['deterioration']
    )
    
    # Use NEWS score threshold
    # NEWS >= 5 is typically considered medium-high risk
    news_threshold = 5
    
    y_true = df_test['deterioration']
    y_pred_news = (df_test['news_score'] >= news_threshold).astype(int)
    
    # Calculate metrics
    accuracy = accuracy_score(y_true, y_pred_news)
    precision = precision_score(y_true, y_pred_news, zero_division=0)
    recall = recall_score(y_true, y_pred_news)
    f1 = f1_score(y_true, y_pred_news)
    
    # For AUC-ROC, use actual NEWS scores as probabilities (normalized)
    news_scores_normalized = df_test['news_score'] / df_test['news_score'].max()
    auc_roc = roc_auc_score(y_true, news_scores_normalized)
    
    print("\n NEWS Baseline Performance (threshold >= 5):")
    print(f"   Accuracy:  {accuracy:.4f}")
    print(f"   Precision: {precision:.4f}")
    print(f"   Recall:    {recall:.4f}")
    print(f"   F1-Score:  {f1:.4f}")
    print(f"   AUC-ROC:   {auc_roc:.4f}")
    
    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred_news)
    print("\n Confusion Matrix:")
    print(cm)
    
    # Visualize confusion matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['No Deterioration', 'Deterioration'],
                yticklabels=['No Deterioration', 'Deterioration'])
    plt.title('NEWS Baseline - Confusion Matrix', fontsize=14, fontweight='bold')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.tight_layout()
    plt.savefig('ml/models/news_baseline_confusion_matrix.png', dpi=300)
    print("\n✓ Saved confusion matrix to ml/models/")
    
    # ROC Curve
    fpr, tpr, thresholds = roc_curve(y_true, news_scores_normalized)
    
    plt.figure(figsize=(8, 6))
    plt.plot(fpr, tpr, label=f'NEWS (AUC = {auc_roc:.4f})', linewidth=2, color='blue')
    plt.plot([0, 1], [0, 1], 'k--', label='Random', linewidth=1)
    plt.xlabel('False Positive Rate', fontsize=12)
    plt.ylabel('True Positive Rate', fontsize=12)
    plt.title('NEWS Baseline - ROC Curve', fontsize=14, fontweight='bold')
    plt.legend(fontsize=10)
    plt.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig('ml/models/news_baseline_roc_curve.png', dpi=300)
    print("✓ Saved ROC curve to ml/models/")
    
    # Save baseline metrics
    baseline_metrics = {
        'model': 'NEWS Baseline',
        'threshold': news_threshold,
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1_score': f1,
        'auc_roc': auc_roc
    }
    
    joblib.dump(baseline_metrics, 'ml/models/baseline_metrics.joblib')
    print("✓ Saved baseline metrics")
    
    print("\n" + "="*70)
    print(" BASELINE EVALUATION COMPLETE!")
    print("="*70)
    print("\n This is what we need to BEAT with ML models!")
    print(f"   Target: F1-Score > {f1:.4f}, Recall > {recall:.4f}")
    
    print("\n Next step: python ml/train_model.py")
    
    return baseline_metrics

if __name__ == "__main__":
    baseline_metrics = evaluate_news_baseline()