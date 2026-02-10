import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/');
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#0f172a',
      color: 'white'
    }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
          <Activity size={32} color="#0ea5e9" />
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>VitalGuard</h1>
        </div>
        
        <div className="card" style={{ backgroundColor: '#1e293b', borderColor: '#334155', color: 'white' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Pro Portal Access</h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '2rem' }}>
            AI-Driven Patient Risk Monitoring
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                style={{ backgroundColor: '#0f172a', color: 'white', borderColor: '#334155' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dr.smith@hospital.com"
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem' }}>Password</label>
                <a href="#" style={{ fontSize: '0.875rem', color: '#0ea5e9' }}>Forgot Password?</a>
              </div>
              <input 
                type="password" 
                className="input-field" 
                style={{ backgroundColor: '#0f172a', color: 'white', borderColor: '#334155' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
              <Lock size={18} style={{ marginRight: '0.5rem' }} />
              Secure Login
            </button>
          </form>
        </div>
        
        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
          VitalGuard uses advanced AI to monitor patient vitals in real-time. Unauthorized access is strictly prohibited and logged for HIPAA compliance audits.
        </p>
      </div>
    </div>
  );
};

export default Login;
