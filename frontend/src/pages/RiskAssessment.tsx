import { ShieldAlert, AlertTriangle, Activity, TrendingDown } from 'lucide-react';

const RiskAssessment = () => {
  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Risk Assessment Result</h1>
          <p style={{ color: '#64748b' }}>Analysis generated via VitalGuard-v4.2-RNN model</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600, fontSize: '1.25rem' }}>Marcus Thompson</div>
          <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Last Assessment: 2 mins ago</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        {/* Left Column: Risk Score */}
        <div className="card" style={{ flex: '0 0 350px', textAlign: 'center', borderColor: '#fca5a5', backgroundColor: '#fef2f2' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            border: '8px solid #ef4444', 
            margin: '0 auto 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444'
          }}>
            <ShieldAlert size={40} />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, marginTop: '0.25rem' }}>HIGH RISK</span>
          </div>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#991b1b', marginBottom: '1rem' }}>Critical Warning</h2>
          <p style={{ color: '#7f1d1d', marginBottom: '1.5rem' }}>
            Significant deviation in physiological trends detected within the last 120 minutes.
          </p>

          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#991b1b' }}>
            <strong>High Reliability State:</strong> Model confidence 98.4%
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
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>118 <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>bpm</span></div>
                <div style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                  <TrendingDown size={12} style={{ transform: 'rotate(180deg)', marginRight: '0.25rem' }} /> +18% 
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SpO2</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>91 <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>%</span></div>
                <div style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                  <TrendingDown size={12} style={{ marginRight: '0.25rem' }} /> -5% 
                </div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>BP</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>120/80</div>
                <div style={{ fontSize: '0.75rem', color: '#22c55e' }}>Normal</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Resp. Rate</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>22 <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>bpm</span></div>
                <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Elevated</div>
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
