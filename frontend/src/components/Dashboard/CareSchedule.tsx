import { ChevronRight, Video, Activity } from 'lucide-react';

const scheduleItems = [
  { time: '12:00', title: 'Blood Pressure Check', subtitle: 'Measure BP at rest. If >140/90 mmHg, take Lisinopril 10 mg.', icon: 'bp', active: true },
  { time: '16:00', title: 'Dr. John Smith Consultation', subtitle: 'Video Call | Prepare last 3 BP readings', icon: 'video', active: false },
  { time: '20:00', title: 'Symptom Log', subtitle: 'Pain in the right hypochondrium.', icon: 'log', active: false },
];

export const CareSchedule = () => {
  return (
    <div className="card" style={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Care Schedule</h3>
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: '0.25rem 0.75rem', 
          background: '#f1f5f9', 
          borderRadius: '20px', 
          fontSize: '0.75rem', 
          fontWeight: 500, 
          border: 'none',
          cursor: 'pointer'
        }}>
          September 2025 <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', padding: '0 1rem' }}>
        {[15, 16, 17, 18, 19, 20, 21].map((day) => (
          <div key={day} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Mon</span>
             <div style={{ 
               width: '32px', 
               height: '32px', 
               borderRadius: '50%', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               fontWeight: 600,
               backgroundColor: day === 18 ? '#0ea5e9' : 'transparent',
               color: day === 18 ? 'white' : '#64748b',
               boxShadow: day === 18 ? '0 4px 6px -1px rgba(14, 165, 233, 0.3)' : 'none'
             }}>
               {day}
             </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', paddingLeft: '1rem' }}>
        {/* Timeline Line */}
        <div style={{ 
          position: 'absolute', 
          left: '74px', 
          top: '0', 
          bottom: '0', 
          width: '2px', 
          backgroundColor: '#e2e8f0', // dashed border simulated 
          borderLeft: '2px dashed #e2e8f0', 
        }}></div>

        {scheduleItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', position: 'relative' }}>
            <span style={{ width: '50px', fontSize: '0.875rem', color: '#94a3b8', paddingTop: '0.25rem' }}>{item.time}</span>
            
            <div style={{ 
              flex: 1, 
              padding: '1rem', 
              backgroundColor: item.active ? 'white' : '#f8fafc',
              borderRadius: '16px',
              border: item.active ? '1px solid #e2e8f0' : 'none',
              boxShadow: item.active ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>{item.subtitle}</p>
                </div>
                {item.icon === 'video' && <Video size={16} color="#0ea5e9" />}
                {item.icon === 'bp' && <Activity size={16} color="#ef4444" />}
              </div>
            </div>

            {/* Timeline Dot */}
            <div style={{ 
               position: 'absolute', 
               left: '60px', 
               top: '16px', 
               width: '10px', 
               height: '10px', 
               borderRadius: '50%', 
               backgroundColor: item.active ? '#0ea5e9' : 'white',
               border: `2px solid ${item.active ? '#0ea5e9' : '#cbd5e1'}`,
               zIndex: 2
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};
