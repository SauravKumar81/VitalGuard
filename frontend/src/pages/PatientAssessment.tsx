import { useLocation, useNavigate } from 'react-router-dom';
import { Info, Activity, AlertCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { createAssessment, type AssessmentData } from '../services/api';

const PatientAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialPatientId = location.state?.patient_id || 1;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AssessmentData>({
      patient_id: initialPatientId,
      heart_rate: 75,
      systolic_bp: 120,
      spo2: 98,
      respiratory_rate: 16,
      temperature: 36.6,
      consciousness: 'Alert'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: value
      }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const result = await createAssessment(formData);
        // Navigate to Risk Assessment page with the result data
        navigate('/app/risk-assessment', { state: { result, vitals: formData } });
    } catch (err: any) {
        setError(err.message || "Failed to submit assessment");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Patient Assessment</h1>
        <p style={{ color: '#64748b' }}>Enter clinical vitals to generate an AI risk prediction analysis.</p>
      </div>

      <div style={{ 
        backgroundColor: '#f0f9ff', 
        border: '1px solid #bae6fd', 
        borderRadius: '0.5rem', 
        padding: '1rem', 
        marginBottom: '2rem',
        display: 'flex',
        gap: '0.75rem'
      }}>
        <Info color="#0ea5e9" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ color: '#0369a1', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>AI Reliability Note</h4>
          <p style={{ color: '#334155', fontSize: '0.875rem' }}>
            Ensure all vitals are recorded within the last 15 minutes for the most accurate prediction results. Fields marked with * are required.
          </p>
        </div>
      </div>

      {error && (
        <div style={{ 
            backgroundColor: '#fef2f2', 
            border: '1px solid #fecaca', 
            borderRadius: '0.5rem', 
            padding: '1rem', 
            marginBottom: '2rem',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            <AlertCircle size={20} />
            {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>Patient Information</h3>
          
          <div className="grid grid-cols-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Patient ID *</label>
              <input 
                type="number" 
                name="patient_id"
                className="input-field" 
                value={formData.patient_id}
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Room Number (Optional)</label>
              <input type="text" className="input-field" placeholder="e.g. 101" />
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>Clinical Vitals</h3>
          
          <div className="grid grid-cols-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Heart Rate (BPM) *</label>
              <input 
                type="number" 
                name="heart_rate"
                className="input-field" 
                value={formData.heart_rate}
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Systolic BP (mmHg) *</label>
              <input 
                type="number" 
                name="systolic_bp"
                className="input-field" 
                value={formData.systolic_bp}
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>O2 Saturation (%) *</label>
              <input 
                type="number" 
                name="spo2"
                className="input-field" 
                value={formData.spo2}
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Respiratory Rate (breath/min) *</label>
              <input 
                type="number" 
                name="respiratory_rate"
                className="input-field" 
                value={formData.respiratory_rate}
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Temperature (°C)</label>
              <input 
                type="number" 
                step="0.1" 
                name="temperature"
                className="input-field" 
                value={formData.temperature}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Consciousness Level</label>
              <select 
                name="consciousness"
                className="input-field"
                value={formData.consciousness}
                onChange={handleChange}
              >
                <option value="Alert">Alert</option>
                <option value="Confusion">Confusion</option>
                <option value="Voice">Voice</option>
                <option value="Pain">Pain</option>
                <option value="Unresponsive">Unresponsive</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="button" className="btn" style={{ backgroundColor: '#e2e8f0' }} onClick={() => navigate('/app')}>
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ minWidth: '150px' }}
            disabled={loading}
          >
            <Activity size={18} style={{ marginRight: '0.5rem' }} />
            {loading ? 'Analyzing...' : 'Run AI Analysis'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientAssessment;
