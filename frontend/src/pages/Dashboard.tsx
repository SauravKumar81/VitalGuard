// import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { VitalsSection } from '../components/Dashboard/VitalsSection';
import { CareSchedule } from '../components/Dashboard/CareSchedule';
import { BodyMap } from '../components/Dashboard/BodyMap';
import { OnlineConsultation, MedicationList } from '../components/Dashboard/SideWidgets';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
            Hi {user?.name || 'Doctor'}! How are you <br />
            <span style={{ color: '#64748b', fontWeight: 400 }}>feeling today?</span>
          </h1>
        </div>
      </div>

      <VitalsSection />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left Col: Schedule & Consultations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <CareSchedule />
          <OnlineConsultation />
        </div>

        {/* Middle Col: Body Map */}
        <div className="card" style={{ height: '100%', minHeight: '600px', background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BodyMap />
        </div>

        {/* Right Col: Medications & Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <MedicationList />
             
             {/* Additional Widget from reference (Analysis) */}
             <div className="card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Chest X-ray Analysis</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { label: 'Ribs', status: 'Normal', pct: 98 },
                        { label: 'Spine', status: 'Normal', pct: 95 },
                        { label: 'Diaphragm', status: 'Normal', pct: 99 },
                        { label: 'Organs', status: 'Review', pct: 85, color: '#f59e0b' }
                    ].map((item, i) => (
                        <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                <span>{item.label}</span>
                            </div>
                            <div style={{ height: '6px', width: '100%', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${item.pct}%`, background: item.color || '#0ea5e9', borderRadius: '3px' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

