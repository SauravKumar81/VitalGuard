export interface Vitals {
  age: number;
  gender: 'M' | 'F';
  heart_rate: number;
  systolic_bp: number;
  spo2: number;
  temperature: number;
  respiratory_rate: number;
  consciousness: 'Alert' | 'Voice' | 'Pain' | 'Unresponsive';
}

export interface PredictionResult {
    risk_level: string;
    probability: number;
    news_score: number;
    analysis: string;
    timestamp: string;
    prediction?: number;
    error?: string;
  }
  
const API_URL = 'http://localhost:8000';
  
export const predictRisk = async (vitals: Vitals): Promise<PredictionResult> => {
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vitals),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get prediction');
      }
      return data;

    } catch (error) {
      console.error('Prediction API Error:', error);
      throw error;
    }
  };
