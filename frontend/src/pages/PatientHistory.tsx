import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Activity, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { getPatientHistory, type AssessmentResponse } from '../services/api';

const PatientHistory = () => {
  const location = useLocation();
  const [assessments, setAssessments] = useState<AssessmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Default to patient_id 1 if not passed
  const patientId = location.state?.patient_id || 1;

  useEffect(() => {
    const fetchHistory = async () => {
        try {
            const data = await getPatientHistory(patientId);
            // Sort by timestamp desc
            const sorted = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setAssessments(sorted);
        } catch (err: any) {
            setError(err.message || "Failed to load history");
        } finally {
            setLoading(false);
        }
    };

    fetchHistory();
  }, [patientId]);

  if (loading) return <div>Loading history...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error} (Is the backend running?)</div>;

  return (
    <div>
      <div className="page-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem' }}>
        <h1 className="page-title">Patient History</h1>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
          <span><strong style={{ color: '#0f172a' }}>Patient ID:</strong> {patientId}</span>
          <span><strong style={{ color: '#0f172a' }}>Total Assessments:</strong> {assessments.length}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: '0 0 300px' }}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <Activity size={18} style={{ marginRight: '0.5rem', color: '#0ea5e9' }} />
              Latest Vitals
            </h3>
            {assessments.length > 0 ? (
                <>
                    <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Heart Rate</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{assessments[0].heart_rate} bpm</div>
                    </div>
                    <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>O2 Saturation</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{assessments[0].spo2} %</div>
                    </div>
                </>
            ) : (
                <p>No data recorded.</p>
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
           <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
             <Clock size={24} style={{ marginRight: '0.75rem' }} />
             Assessment Timeline
           </h3>

           <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid #e2e8f0' }}>
             
             {assessments.map((assessment) => {
                 const isRisk = assessment.risk_level === 'High Risk';
                 const color = isRisk ? '#ef4444' : '#22c55e';
                 const date = new Date(assessment.timestamp);
                 
                 return (
                    <div key={assessment.id} style={{ marginBottom: '2rem', position: 'relative' }}>
                        <div style={{ 
                            position: 'absolute', 
                            left: '-2.6rem', 
                            top: '0.25rem', 
                            width: '16px', 
                            height: '16px', 
                            borderRadius: '50%', 
                            backgroundColor: color, 
                            border: '4px solid white',
                            boxShadow: `0 0 0 1px ${color}`
                        }}></div>
                        <div className="card" style={{ borderColor: isRisk ? '#fecaca' : '#e2e8f0', backgroundColor: isRisk ? '#fef2f2' : 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontWeight: 600, color: isRisk ? '#991b1b' : '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {isRisk ? <AlertTriangle size={16}/> : <CheckCircle size={16}/>}
                                    {isRisk ? 'Risk Alert' : 'Stable Assessment'}
                                </h4>
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                                </span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '0.5rem' }}>
                                <strong>Vitals:</strong> HR: {assessment.heart_rate} | BP: {assessment.systolic_bp} | SpO2: {assessment.spo2}% | Temp: {assessment.temperature}°C
                            </p>
                            {assessment.analysis_text && (
                                <p style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                                    Note: {assessment.analysis_text}
                                </p>
                            )}
                        </div>
                    </div>
                 );
             })}
             
             {assessments.length === 0 && (
                 <p>No history found for this patient.</p>
             )}

           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
