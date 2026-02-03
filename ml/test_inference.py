from ml.predict import VitalGuardPredictor

def test_inference():
    print("="*50)
    print("TESTING ML INFERENCE PIPELINE")
    print("="*50)
    
    try:
        predictor = VitalGuardPredictor()
        
        # Test Case 1: Healthy
        print("\nTest Case 1: Healthy 25yo Male")
        vitals1 = {
            'age': 25, 'gender': 'M', 
            'heart_rate': 65, 'systolic_bp': 118,
            'spo2': 99, 'temperature': 36.6, 
            'respiratory_rate': 14, 'consciousness': 'Alert'
        }
        res1 = predictor.predict(vitals1)
        print(f"Result: {res1['risk_level']} ({res1['probability']:.1%})")
        print(f"Analysis: {res1['analysis']}")
        
        # Test Case 2: Septic Shock
        print("\nTest Case 2: 70yo Female with Hypotension & Tachycardia")
        vitals2 = {
            'age': 70, 'gender': 'F', 
            'heart_rate': 120, 'systolic_bp': 85,
            'spo2': 91, 'temperature': 39.2, 
            'respiratory_rate': 28, 'consciousness': 'Pain'
        }
        res2 = predictor.predict(vitals2)
        print(f"Result: {res2['risk_level']} ({res2['probability']:.1%})")
        print(f"Analysis: {res2['analysis']}")
        
        print("\n" + "="*50)
        print("✓ TEST PASSED")
        print("="*50)
        
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_inference()
