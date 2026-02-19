import { ArrowRight } from 'lucide-react';

const doctors = [
    { name: 'Dr. Daniel Lewis', role: 'Oncologist', exp: '6 yrs' },
    { name: 'Dr. Grace Walker', role: 'Cardiologist', exp: '5 yrs' },
    { name: 'Dr. Sarah Smith', role: 'Neurologist', exp: '8 yrs' },
];

const meds = [
    { name: 'CoQ10', dose: '50 mg', type: 'softgels', time: '8:00 AM' },
    { name: 'Plavix', dose: '75 mg', type: 'tablet', time: '10:00 AM' },
];

export const OnlineConsultation = () => (
    <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Online Consultation</h3>
            <span style={{ fontSize: '0.875rem', color: '#64748b', cursor: 'pointer' }}>View All</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {doctors.map((doc, i) => (
                <div key={i} className="card" style={{ minWidth: '180px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e2e8f0', marginBottom: '0.75rem', overflow: 'hidden' }}>
                      <img src={`https://i.pravatar.cc/150?u=${doc.name}`} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{doc.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.role}</span>
                    <div style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>Exp: {doc.exp}</span>
                         <button style={{ border: '1px solid #cbd5e1', background: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <ArrowRight size={12} />
                         </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const MedicationList = () => (
    <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Your Medications</h3>
             <span style={{ fontSize: '0.875rem', background: '#0ea5e9', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>Today: 8</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
             {meds.map((med, i) => (
                 <div key={i} style={{ flex: 1, background: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                     <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Take at {med.time}</div>
                     <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', background: i === 0 ? '#ffedd5' : '#dbeafe', borderRadius: '8px' }}></div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{med.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{med.dose}</div>
                        </div>
                     </div>
                 </div>
             ))}
        </div>
    </div>
);
