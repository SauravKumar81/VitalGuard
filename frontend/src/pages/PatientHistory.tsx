import { Activity, Clock } from 'lucide-react';

const PatientHistory = () => {
  return (
    <div>
      <div className="page-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem' }}>
        <h1 className="page-title">Patient History: Sarah Jenkins</h1>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
          <span><strong style={{ color: '#0f172a' }}>MRN:</strong> VG-9982</span>
          <span><strong style={{ color: '#0f172a' }}>Age:</strong> 42</span>
          <span><strong style={{ color: '#0f172a' }}>Last Admission:</strong> Oct 12, 2023</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: '0 0 300px' }}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <Activity size={18} style={{ marginRight: '0.5rem', color: '#0ea5e9' }} />
              Longitudinal Vitals Trend
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Heart Rate (avg)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>92 bpm</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>O2 Saturation (avg)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>97.2 %</div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
           <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
             <Clock size={24} style={{ marginRight: '0.75rem' }} />
             Clinical Event Timeline
           </h3>

           <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid #e2e8f0' }}>
             
             {/* Event 1 */}
             <div style={{ marginBottom: '2rem', position: 'relative' }}>
               <div style={{ 
                 position: 'absolute', 
                 left: '-2.6rem', 
                 top: '0.25rem', 
                 width: '16px', 
                 height: '16px', 
                 borderRadius: '50%', 
                 backgroundColor: '#ef4444', 
                 border: '4px solid white',
                 boxShadow: '0 0 0 1px #ef4444'
               }}></div>
               <div className="card">
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                   <h4 style={{ fontWeight: 600, color: '#ef4444' }}>Severe Hypertensive Episode</h4>
                   <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Oct 14, 14:30</span>
                 </div>
                 <p style={{ fontSize: '0.875rem', color: '#475569' }}>
                   Vitals: 145/92 mmHg, HR 108. Alert triggered automatically by VitalGuard system.
                 </p>
               </div>
             </div>

             {/* Event 2 */}
             <div style={{ marginBottom: '2rem', position: 'relative' }}>
               <div style={{ 
                 position: 'absolute', 
                 left: '-2.6rem', 
                 top: '0.25rem', 
                 width: '16px', 
                 height: '16px', 
                 borderRadius: '50%', 
                 backgroundColor: '#0ea5e9', 
                 border: '4px solid white',
                 boxShadow: '0 0 0 1px #0ea5e9'
               }}></div>
               <div className="card">
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                   <h4 style={{ fontWeight: 600 }}>Medication Adjustment</h4>
                   <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Oct 14, 16:00</span>
                 </div>
                 <p style={{ fontSize: '0.875rem', color: '#475569' }}>
                   Lisinopril increased to 20mg daily by Dr. Aris following alert review.
                 </p>
               </div>
             </div>

             {/* Event 3 */}
             <div style={{ marginBottom: '2rem', position: 'relative' }}>
               <div style={{ 
                 position: 'absolute', 
                 left: '-2.6rem', 
                 top: '0.25rem', 
                 width: '16px', 
                 height: '16px', 
                 borderRadius: '50%', 
                 backgroundColor: '#22c55e', 
                 border: '4px solid white',
                 boxShadow: '0 0 0 1px #22c55e'
               }}></div>
               <div className="card">
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                   <h4 style={{ fontWeight: 600 }}>Baseline Vitals Stabilized</h4>
                   <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Oct 15, 08:00</span>
                 </div>
                 <p style={{ fontSize: '0.875rem', color: '#475569' }}>
                   Normal sinus rhythm observed for 24 continuous hours. BP stabilized at 120/80.
                 </p>
               </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
