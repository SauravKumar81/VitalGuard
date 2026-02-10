import { useNavigate } from 'react-router-dom';
import { Info, Activity } from 'lucide-react';
import type { FormEvent } from 'react';

const PatientAssessment = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/risk-assessment');
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

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>Patient Information</h3>
          
          <div className="grid grid-cols-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Patient ID / Name *</label>
              <input type="text" className="input-field" placeholder="Search or enter ID" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Room Number</label>
              <input type="text" className="input-field" placeholder="" />
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>Clinical Vitals</h3>
          
          <div className="grid grid-cols-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Heart Rate (BPM) *</label>
              <input type="number" className="input-field" placeholder="e.g. 72" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Blood Pressure (mmHg) *</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="number" className="input-field" placeholder="Sys" required />
                <span style={{ alignSelf: 'center', fontWeight: 'bold', color: '#94a3b8' }}>/</span>
                <input type="number" className="input-field" placeholder="Dia" required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>O2 Saturation (%) *</label>
              <input type="number" className="input-field" placeholder="e.g. 98" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Respiratory Rate (breath/min) *</label>
              <input type="number" className="input-field" placeholder="e.g. 16" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Temperature (°C)</label>
              <input type="number" step="0.1" className="input-field" placeholder="e.g. 36.6" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Consciousness Level</label>
              <select className="input-field">
                <option>Alert</option>
                <option>Confusion</option>
                <option>Voice</option>
                <option>Pain</option>
                <option>Unresponsive</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="button" className="btn" style={{ backgroundColor: 'white', border: '1px solid #cbd5e1' }} onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary" style={{ minWidth: '150px' }}>
            <Activity size={18} style={{ marginRight: '0.5rem' }} />
            Run AI Analysis
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientAssessment;
