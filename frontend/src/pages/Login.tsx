import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
        if (!email || !password) {
            throw new Error('Please enter both email and password');
        }
        // Minimal fake validation
        if (password.length < 4) {
             throw new Error('Password must be at least 4 characters');
        }
        
        await login(email, password);
        navigate('/');
    } catch (err: any) {
        setError(err.message || 'Failed to login');
    } finally {
        setIsLoading(false);
    }
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

            {error && (
                <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.5rem', color: '#ef4444', fontSize: '0.875rem' }}>
                    {error}
                </div>
            )}

            <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.75rem', opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                disabled={isLoading}
            >
              <Lock size={18} style={{ marginRight: '0.5rem' }} />
              {isLoading ? 'Authenticating...' : 'Secure Login'}
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
