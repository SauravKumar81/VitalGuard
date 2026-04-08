import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Users, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getPatientHistory, getDashboardStats, getPatients, type AssessmentResponse, type DashboardStats } from '../services/api';
import { VitalsSection } from '../components/Dashboard/VitalsSection';
import { CareSchedule } from '../components/Dashboard/CareSchedule';
import { BodyMap } from '../components/Dashboard/BodyMap';
import { OnlineConsultation, MedicationList } from '../components/Dashboard/SideWidgets';

const Dashboard = () => {
  const { user } = useAuth();
  const [latestAssessment, setLatestAssessment] = useState<AssessmentResponse | null>(null);
  const [recentAssessments, setRecentAssessments] = useState<AssessmentResponse[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [currentPatientName, setCurrentPatientName] = useState<string>("Demo Patient");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch global dashboard stats
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);

        // Fetch patients to get a valid ID instead of hardcoding 1
        const patientsList = await getPatients();
        
        if (patientsList && patientsList.length > 0) {
            const defaultPatient = patientsList[0];
            setCurrentPatientName(defaultPatient.name);
            
            const history = await getPatientHistory(defaultPatient.id);
            if (history && history.length > 0) {
              // Sort by timestamp desc to get the newest
              const sorted = history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
              setLatestAssessment(sorted[0]);
              setRecentAssessments(sorted.slice(0, 5));
            } else {
                setLatestAssessment(null);
                setRecentAssessments([]);
            }
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchData();
  }, []);
  
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
          <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            Hi {user?.name || 'Doctor'}!<br />
            <span style={{ color: 'var(--text-muted)' }}>How are you feeling today?</span>
          </h1>
        </div>
      </div>

      {/* Global Dashboard Stats */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7' }}>
              <Users size={24} />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Patients</p>
              <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.75rem', fontWeight: 800 }}>{stats.total_patients}</h3>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>High Risk</p>
              <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.75rem', fontWeight: 800 }}>{stats.high_risk_patients}</h3>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a' }}>
              <CheckCircle size={24} />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stable</p>
              <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.75rem', fontWeight: 800 }}>{stats.stable_patients}</h3>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#9333ea' }}>
              <Activity size={24} />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Accuracy</p>
              <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.75rem', fontWeight: 800 }}>{stats.ai_accuracy}%</h3>
            </div>
          </div>
        </div>
      )}

      {/* Patient Specific Latest Assessment */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Patient Spotlight: {currentPatientName}</h2>
      
      {latestAssessment && (
        <div className="card" style={{ 
          marginBottom: '2rem', 
          backgroundColor: latestAssessment.risk_level === 'High Risk' ? 'rgba(254, 226, 226, 0.3)' : 'rgba(220, 252, 231, 0.3)', // Semi-transparent for dark mode compat
          borderColor: latestAssessment.risk_level === 'High Risk' ? '#fecaca' : '#bbf7d0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                    padding: '0.75rem', 
                    borderRadius: '50%', 
                    backgroundColor: latestAssessment.risk_level === 'High Risk' ? '#fee2e2' : '#dcfce7',
                    color: latestAssessment.risk_level === 'High Risk' ? '#991b1b' : '#166534'
                }}>
                    {latestAssessment.risk_level === 'High Risk' ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: latestAssessment.risk_level === 'High Risk' ? '#ef4444' : '#22c55e' }}>
                        Latest Analysis: {latestAssessment.risk_level}
                    </h3>
                    <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>
                        {latestAssessment.analysis_text || "Assessment complete."}
                    </p>
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {new Date(latestAssessment.timestamp).toLocaleString()}
                </div>
                <Link to="/app/risk-assessment" state={{ result: latestAssessment, vitals: latestAssessment }} style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '0.875rem' }}>
                    View Full Report →
                </Link>
            </div>
        </div>
      )}

      <VitalsSection history={recentAssessments} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left Col: Schedule & Consultations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <CareSchedule assessments={recentAssessments} />
          <OnlineConsultation />
        </div>

        {/* Right Col: Medications & Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <MedicationList />
             

             <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Quick Actions</h3>
                </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link to="/app/assessment" className="btn btn-primary" style={{ fontSize: '0.875rem', justifyContent: 'center' }}>New Assessment</Link>
                    <Link to="/app/patients" className="btn" style={{ fontSize: '0.875rem', justifyContent: 'center', background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>View All Patients</Link>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

