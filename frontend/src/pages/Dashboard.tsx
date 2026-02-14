import { useState, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDashboardStats, type DashboardStats } from '../services/api';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="card">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div>
        <h3 style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>{title}</h3>
        <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>{value}</div>
      </div>
      <div style={{ 
        backgroundColor: `${color}20`, 
        padding: '0.75rem', 
        borderRadius: '0.5rem',
        color: color 
      }}>
        <Icon size={24} />
      </div>
    </div>
    {trend && (
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#22c55e' }}>
        <TrendingUp size={16} style={{ marginRight: '0.25rem' }} />
        {trend}
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_patients: 0,
    high_risk_patients: 0,
    stable_patients: 0,
    ai_accuracy: 98.5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p style={{ color: '#64748b' }}>Good morning. Here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
        <StatCard 
          title="Total Patients" 
          value={loading ? '-' : stats.total_patients} 
          icon={Users} 
          color="#0ea5e9" 
        />
        <StatCard 
          title="High Risk Patients" 
          value={loading ? '-' : stats.high_risk_patients} 
          icon={AlertTriangle} 
          color="#ef4444" 
        />
        <StatCard 
          title="Stable Patients" 
          value={loading ? '-' : stats.stable_patients} 
          icon={CheckCircle} 
          color="#22c55e" 
        />
        <StatCard 
          title="AI Accuracy" 
          value={loading ? '-' : `${stats.ai_accuracy}%`} 
          icon={Activity} 
          color="#8b5cf6" 
          trend="+0.4% this week"
        />
      </div>

      <div className="grid grid-cols-2">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Alerts</h2>
            <Link to="/patients" style={{ color: '#0ea5e9', fontSize: '0.875rem', fontWeight: 500 }}>View All</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             {/* We could fetch real alerts here later, keeping mock for UI structure for now or map from high risk patients if we exposed them in stats */}
            {stats.high_risk_patients > 0 ? (
                 <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '1rem', 
                    backgroundColor: '#fef2f2',
                    borderLeft: `4px solid #ef4444`,
                    borderRadius: '0.25rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>High Risk Patients Detected</div>
                      <div style={{ fontSize: '0.875rem', color: '#475569' }}>{stats.high_risk_patients} patients require immediate attention.</div>
                    </div>
                    <Link to="/patients" className="btn" style={{ padding: '0.25rem 0.5rem', marginLeft: '1rem', backgroundColor: 'white', border: '1px solid #e2e8f0' }}>
                      View List
                    </Link>
                  </div>
            ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No active alerts.</div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>AI Quick Action</h2>
          <div style={{ padding: '1.5rem', backgroundColor: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #bae6fd', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ backgroundColor: '#0ea5e9', padding: '0.5rem', borderRadius: '50%', height: 'fit-content' }}>
                <Activity color="white" size={20} />
              </div>
              <div>
                <h3 style={{ fontWeight: 600, color: '#0369a1', marginBottom: '0.5rem' }}>System Status</h3>
                <p style={{ color: '#334155', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  VitalGuard AI is active and monitoring {stats.total_patients} patients in real-time.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/assessment" className="btn btn-primary" style={{ fontSize: '0.875rem' }}>New Assessment</Link>
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Shift Status</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ color: '#64748b' }}>On Duty Staff</span>
            <span style={{ fontWeight: 500 }}>Active</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ color: '#64748b' }}>System Load</span>
            <span style={{ fontWeight: 500 }}>Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
