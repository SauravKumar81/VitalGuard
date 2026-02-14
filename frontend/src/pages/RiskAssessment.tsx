import { useState } from 'react';
import { ShieldAlert, AlertTriangle, Activity, TrendingDown, RefreshCw } from 'lucide-react';
import { predictRisk, type PredictionResult } from '../services/api';

const RiskAssessment = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [vitals, setVitals] = useState({
        heart_rate: 118,
        spo2: 91,
        systolic_bp: 120,
        respiratory_rate: 22,
        temperature: 37.0,
        consciousness: 'Alert'
    });

    const handleReassess = async () => {
        setLoading(true);
        try {
            // Simulate reading new sensor data
            const newVitals = {
                age: 45,
                gender: 'M' as const,
                heart_rate: Math.floor(60 + Math.random() * 60),
                spo2: Math.floor(90 + Math.random() * 10),
                systolic_bp: Math.floor(90 + Math.random() * 50),
                respiratory_rate: Math.floor(12 + Math.random() * 20),
                temperature: 36.5 + Math.random() * 2,
                consciousness: 'Alert' as const
            };
            
            const data = await predictRisk(newVitals);
            setResult(data);
            setVitals(prev => ({
                ...prev,
                ...newVitals
            }));
            
        } catch (error) {
            console.error(error);
            alert("Failed to connect to ML model. Please ensure the backend server is running on port 5000.");
        } finally {
            setLoading(false);
        }
    };

    // Helper to determine risk visual
    const getRiskColor = (risk: string) => {
        if (!risk) return '#ef4444';
        return risk.toLowerCase().includes('high') ? '#ef4444' : '#22c55e';
    };

    const riskColor = result ? getRiskColor(result.risk_level) : '#ef4444';
    const riskText = result ? result.risk_level.toUpperCase() : 'HIGH RISK';

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Risk Assessment Result</h1>
          <p style={{ color: '#64748b' }}>Analysis generated via VitalGuard-v4.2-RNN model</p>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>Marcus Thompson</div>
          <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Last Assessment: {result ? 'Just now' : '2 mins ago'}</div>
          <button 
            onClick={handleReassess}
            disabled={loading}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
            }}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Analyzing...' : 'Re-run Analysis'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        {/* Left Column: Risk Score */}
        <div className="card" style={{ flex: '0 0 350px', textAlign: 'center', borderColor: riskColor, backgroundColor: result?.risk_level === 'Stable' ? '#f0fdf4' : '#fef2f2' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            border: `8px solid ${riskColor}`, 
            margin: '0 auto 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: riskColor
          }}>
            <ShieldAlert size={40} />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, marginTop: '0.25rem' }}>{riskText}</span>
          </div>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: result?.risk_level === 'Stable' ? '#15803d' : '#991b1b', marginBottom: '1rem' }}>
            {result?.risk_level === 'Stable' ? 'Patient Stable' : 'Critical Warning'}
          </h2>
          <p style={{ color: result?.risk_level === 'Stable' ? '#166534' : '#7f1d1d', marginBottom: '1.5rem' }}>
            {result?.analysis || "Significant deviation in physiological trends detected within the last 120 minutes."}
          </p>

          <div style={{ padding: '0.75rem', backgroundColor: result?.risk_level === 'Stable' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', fontSize: '0.875rem', color: result?.risk_level === 'Stable' ? '#15803d' : '#991b1b' }}>
            <strong>Reliability:</strong> Model confidence {result ? (result.probability * 100).toFixed(1) : '98.4'}%
          </div>
        </div>

        {/* Right Column: Details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Vitals Summary */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Current Vitals Summary</h3>
            <div className="grid grid-cols-4">
              <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Heart Rate</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: vitals.heart_rate > 100 ? '#ef4444' : '#0f172a' }}>{vitals.heart_rate} <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>bpm</span></div>
                <div style={{ fontSize: '0.75rem', color: vitals.heart_rate > 100 ? '#ef4444' : '#22c55e', display: 'flex', alignItems: 'center' }}>
                   {vitals.heart_rate > 100 ? <TrendingDown size={12} style={{ transform: 'rotate(180deg)', marginRight: '0.25rem' }} /> : null} 
                   {vitals.heart_rate > 100 ? '+18%' : 'Normal'}
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SpO2</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: vitals.spo2 < 94 ? '#ef4444' : '#0f172a' }}>{vitals.spo2} <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>%</span></div>
                <div style={{ fontSize: '0.75rem', color: vitals.spo2 < 94 ? '#ef4444' : '#22c55e', display: 'flex', alignItems: 'center' }}>
                  {vitals.spo2 < 94 ? <TrendingDown size={12} style={{ marginRight: '0.25rem' }} /> : null} 
                  {vitals.spo2 < 94 ? '-5%' : 'Normal'}
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>BP</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{vitals.systolic_bp}/80</div>
                <div style={{ fontSize: '0.75rem', color: vitals.systolic_bp > 140 || vitals.systolic_bp < 90 ? '#ef4444' : '#22c55e' }}>
                    {vitals.systolic_bp > 140 || vitals.systolic_bp < 90 ? 'Abnormal' : 'Normal'}
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Resp. Rate</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: vitals.respiratory_rate > 20 ? '#f59e0b' : '#0f172a' }}>{vitals.respiratory_rate} <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>bpm</span></div>
                <div style={{ fontSize: '0.75rem', color: vitals.respiratory_rate > 20 ? '#f59e0b' : '#22c55e' }}>{vitals.respiratory_rate > 20 ? 'Elevated' : 'Normal'}</div>
              </div>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Risk Breakdown & Explanation</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <AlertTriangle size={16} className="text-danger" />
                <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>SpO2 Deceleration Detected</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#475569', paddingLeft: '1.5rem' }}>
                The patient's oxygen saturation has dropped from 96% to 91% over the last 45 minutes, showing an acute trajectory consistent with respiratory distress.
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Activity size={16} className="text-warning" />
                <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Compensatory Tachycardia</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#475569', paddingLeft: '1.5rem' }}>
                Heart rate has increased by 18% in tandem with the SpO2 drop, indicating physiological compensation.
              </p>
            </div>
          </div>

          {/* Protocol Suggestion */}
          <div className="card" style={{ borderColor: '#0ea5e9' }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#0369a1' }}>Protocol Suggestion</h3>
             <ul style={{ listStyle: 'none', padding: 0 }}>
               <li style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                 <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem', fontSize: '0.8rem', fontWeight: 'bold' }}>1</div>
                 Initiate O2 support @ 2L/min
               </li>
               <li style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                 <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem', fontSize: '0.8rem', fontWeight: 'bold' }}>2</div>
                 Perform arterial blood gas
               </li>
               <li style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0' }}>
                 <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem', fontSize: '0.8rem', fontWeight: 'bold' }}>3</div>
                 Consult Intensive Care Outreach
               </li>
             </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
