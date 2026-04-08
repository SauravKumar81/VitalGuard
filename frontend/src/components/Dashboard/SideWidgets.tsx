import { useState } from 'react';
import { ArrowRight, X, Calendar, Video, MessageSquare } from 'lucide-react';

const doctors = [
    { name: 'Dr. Daniel Lewis', role: 'Oncologist', exp: '6 yrs' },
    { name: 'Dr. Grace Walker', role: 'Cardiologist', exp: '5 yrs' },
    { name: 'Dr. Sarah Smith', role: 'Neurologist', exp: '8 yrs' },
    { name: 'Dr. Ethan Hunt', role: 'Pediatrician', exp: '10 yrs' },
    { name: 'Dr. Amelia Pond', role: 'Dermatologist', exp: '4 yrs' },
    { name: 'Dr. Robert Chase', role: 'Surgeon', exp: '12 yrs' },
];

const meds = [
    { name: 'CoQ10', dose: '50 mg', type: 'softgels', time: '8:00 AM' },
    { name: 'Plavix', dose: '75 mg', type: 'tablet', time: '10:00 AM' },
];

export const OnlineConsultation = () => {
    const [selectedDoctor, setSelectedDoctor] = useState<{ name: string; role: string; exp: string; } | null>(null);

    return (
        <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Online Consultation</h3>
            </div>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {doctors.map((doc, i) => (
                    <div 
                        key={i} 
                        className="card" 
                        onClick={() => setSelectedDoctor(doc)}
                        style={{ cursor: 'pointer', minWidth: '180px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                    >
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e2e8f0', marginBottom: '0.75rem', overflow: 'hidden' }}>
                          <img src={`https://i.pravatar.cc/150?u=${doc.name}`} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{doc.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.role}</span>
                        <div style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <span style={{ fontSize: '0.7rem', background: 'var(--background)', color: 'var(--text-main)', padding: '2px 6px', borderRadius: '4px' }}>Exp: {doc.exp}</span>
                             <button style={{ border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>
                                <ArrowRight size={12} />
                             </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedDoctor && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} onClick={() => setSelectedDoctor(null)}>
                    <div style={{
                        background: 'var(--surface)', padding: '2rem', borderRadius: '16px',
                        width: '90%', maxWidth: '400px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }} onClick={e => e.stopPropagation()}>
                        <button 
                            onClick={() => setSelectedDoctor(null)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                        >
                            <X size={20} />
                        </button>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#e2e8f0', marginBottom: '1rem', overflow: 'hidden', border: '4px solid var(--background)' }}>
                              <img src={`https://i.pravatar.cc/150?u=${selectedDoctor.name}`} alt={selectedDoctor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{selectedDoctor.name}</h2>
                            <p style={{ color: '#0ea5e9', fontWeight: 500, fontSize: '0.875rem', margin: '0 0 1rem 0' }}>{selectedDoctor.role} • {selectedDoctor.exp} Experience</p>
                            
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                                Specialist in providing advanced {selectedDoctor.role.toLowerCase()} care and consultation. Highly experienced in handling delicate conditions with precision.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1.5rem' }}>
                                <button className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                    <Video size={16} /> Video Call
                                </button>
                                <button className="btn" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)', fontSize: '0.875rem' }}>
                                    <MessageSquare size={16} /> Message
                                </button>
                            </div>

                            <div style={{ width: '100%', textAlign: 'left' }}>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Next Available</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', background: 'var(--background)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <Calendar size={16} color="#0ea5e9" />
                                    <span>Tomorrow, 10:30 AM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const MedicationList = () => (
    <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Your Medications</h3>
             <span style={{ fontSize: '0.875rem', background: '#0ea5e9', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>Today: 8</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
             {meds.map((med, i) => (
                 <div key={i} style={{ flex: 1, background: 'var(--background)', color: 'var(--text-main)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                     <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Take at {med.time}</div>
                     <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', background: i === 0 ? '#ffedd5' : '#dbeafe', borderRadius: '8px', overflow: 'hidden' }}>
                            <img src={`https://loremflickr.com/100/100/pill,capsule?lock=${i + 1}`} alt={med.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
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
