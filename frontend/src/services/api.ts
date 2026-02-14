// Patient Types
export interface Patient {
    id: number;
    name: string;
    age: number;
    gender: 'M' | 'F';
    mrn: string;
}

export interface PatientCreate {
    name: string;
    age: number;
    gender: 'M' | 'F';
    mrn: string;
}

// ... existing Vitals/Assessment interfaces ...

export interface Vitals {
  age?: number;
  gender?: 'M' | 'F';
  heart_rate: number;
  systolic_bp: number;
  spo2: number;
  temperature: number;
  respiratory_rate: number;
  consciousness: 'Alert' | 'Voice' | 'Pain' | 'Unresponsive' | 'Confusion';
}

export interface AssessmentData extends Vitals {
  patient_id: number;
  notes?: string;
}

export interface AssessmentResponse extends AssessmentData {
  id: number;
  risk_level: string;
  prediction_prob: number;
  analysis_text: string;
  timestamp: string;
}

const API_URL = 'http://localhost:8000';

// --- Patient API ---

export const getPatients = async (): Promise<Patient[]> => {
    try {
        const response = await fetch(`${API_URL}/patients/?limit=100`);
        if (!response.ok) throw new Error('Failed to fetch patients');
        return await response.json();
    } catch (error) {
        console.error('Get Patients Error:', error);
        throw error;
    }
};

export const createPatient = async (patient: PatientCreate): Promise<Patient> => {
    try {
        const response = await fetch(`${API_URL}/patients/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patient)
        });
        if (!response.ok) throw new Error('Failed to create patient');
        return await response.json();
    } catch (error) {
        console.error('Create Patient Error:', error);
        throw error;
    }
};

// --- Assessment API ---

export const createAssessment = async (data: AssessmentData): Promise<AssessmentResponse> => {
    // Ensure numeric values
    const payload = {
        ...data,
        patient_id: Number(data.patient_id),
        heart_rate: Number(data.heart_rate),
        systolic_bp: Number(data.systolic_bp),
        spo2: Number(data.spo2),
        temperature: Number(data.temperature),
        respiratory_rate: Number(data.respiratory_rate),
    };

    try {
      const response = await fetch(`${API_URL}/assessments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if available, for now skipping
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.detail || 'Failed to create assessment');
      }
      return result;

    } catch (error) {
      console.error('Assessment API Error:', error);
      throw error;
    }
};

export const getPatientHistory = async (patientId: number): Promise<AssessmentResponse[]> => {
    try {
        const response = await fetch(`${API_URL}/assessments/${patientId}`);
        if (!response.ok) throw new Error('Failed to fetch history');
        return await response.json();
    } catch (error) {
        console.error('History API Error:', error);
        throw error;
    }
};

// Legacy support if needed
export const predictRisk = async (vitals: any) => {
    return createAssessment({ ...vitals, patient_id: 1 }); // Fallback
};
