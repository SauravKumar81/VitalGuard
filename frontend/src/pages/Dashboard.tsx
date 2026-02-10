import { 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p style={{ color: '#64748b' }}>Good morning, Dr. Smith. Here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
        <StatCard 
          title="Total Patients" 
          value="1,240" 
          icon={Users} 
          color="#0ea5e9" 
        />
        <StatCard 
          title="High Risk Patients" 
          value="12" 
          icon={AlertTriangle} 
          color="#ef4444" 
        />
        <StatCard 
          title="Stable Patients" 
          value="1,180" 
          icon={CheckCircle} 
          color="#22c55e" 
        />
        <StatCard 
          title="AI Accuracy" 
          value="99.2%" 
          icon={Activity} 
          color="#8b5cf6" 
          trend="+0.4% this week"
        />
      </div>

      <div className="grid grid-cols-2">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Alerts</h2>
            <Link to="/alerts" style={{ color: '#0ea5e9', fontSize: '0.875rem', fontWeight: 500 }}>View All</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { id: 1, patient: 'Marcus Thompson', room: 'Ward 4', issue: 'Irregular Pulse detected', time: '2m ago', level: 'critical' },
              { id: 2, patient: 'Sarah Jenkins', room: 'ICU-2', issue: 'SpO2 drops below 92%', time: '15m ago', level: 'warning' },
              { id: 3, patient: 'James Wilson', room: 'Ward 1B', issue: 'Elevated BP readings', time: '1h ago', level: 'warning' },
            ].map(alert => (
              <div key={alert.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '1rem', 
                backgroundColor: alert.level === 'critical' ? '#fef2f2' : '#fffbeb',
                borderLeft: `4px solid ${alert.level === 'critical' ? '#ef4444' : '#f59e0b'}`,
                borderRadius: '0.25rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{alert.patient} <span style={{ fontWeight: 400, color: '#64748b', fontSize: '0.875rem' }}>• {alert.room}</span></div>
                  <div style={{ fontSize: '0.875rem', color: '#475569' }}>{alert.issue}</div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{alert.time}</div>
                <Link to="/risk-assessment" className="btn" style={{ padding: '0.25rem 0.5rem', marginLeft: '1rem', backgroundColor: 'white', border: '1px solid #e2e8f0' }}>
                  Review
                </Link>
              </div>
            ))}
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
                <h3 style={{ fontWeight: 600, color: '#0369a1', marginBottom: '0.5rem' }}>Pattern Detected: Ward 4</h3>
                <p style={{ color: '#334155', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  VitalGuard has identified a trend of Irregular Pulse in Ward 4 appearing in 3 patients over the last 4 hours. This correlates with the recent medication round.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" style={{ fontSize: '0.875rem' }}>Schedule Review</button>
                  <button className="btn" style={{ fontSize: '0.875rem', backgroundColor: 'white', border: '1px solid #cbd5e1' }}>Dismiss</button>
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Shift Status</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ color: '#64748b' }}>On Duty Staff</span>
            <span style={{ fontWeight: 500 }}>14 Nurses, 3 Doctors</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ color: '#64748b' }}>Bed Occupancy</span>
            <span style={{ fontWeight: 500 }}>87% (4 beds avail)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
