from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the project root to sys.path to ensure imports work correctly
# This allows us to import relative modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from predict import VitalGuardPredictor
    from preprocess import DataPreprocessor
except ImportError:
    # If starting from root
    from ml.predict import VitalGuardPredictor
    from ml.preprocess import DataPreprocessor

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend

predictor = None

try:
    predictor = VitalGuardPredictor()
    print("Model loaded successfully")
except Exception as e:
    print(f"Warning: Model not loaded immediately: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    global predictor
    if predictor is None:
        try:
            predictor = VitalGuardPredictor()
        except Exception as e:
            return jsonify({'error': f'Model not loaded: {str(e)}'}), 500
            
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        result = predictor.predict(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': predictor is not None
    })

if __name__ == '__main__':
    # Initialize predictor on startup
    try:
        predictor = VitalGuardPredictor()
        print("Model initialized")
    except Exception as e:
        print(f"Warning: Model not initialized: {e}")
        
    app.run(port=5000, debug=True)
