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
      background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
      color: '#0f172a'
    }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
          <div style={{ background: '#0ea5e9', padding: '6px', borderRadius: '10px' }}>
             <Activity size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.5px' }}>VitalGuard</h1>
        </div>
        
        <div className="card" style={{ 
            backgroundColor: 'white', 
            borderColor: '#e2e8f0', 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)' 
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontWeight: 700 }}>Welcome Back</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem', fontSize: '0.875rem' }}>
            Enter your credentials to access the workspace
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                style={{ backgroundColor: 'white', color: '#0f172a', borderColor: '#e2e8f0' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dr.smith@hospital.com"
              />
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
                <a href="#" style={{ fontSize: '0.875rem', color: '#0ea5e9', fontWeight: 500 }}>Forgot Password?</a>
              </div>
              <input 
                type="password" 
                className="input-field" 
                style={{ backgroundColor: 'white', color: '#0f172a', borderColor: '#e2e8f0' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && (
                <div style={{ padding: '0.75rem', marginBottom: '1.5rem', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '0.5rem', color: '#ef4444', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600 }}>Error:</span> {error}
                </div>
            )}

            <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ 
                    width: '100%', 
                    padding: '0.875rem', 
                    fontSize: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.2)'
                }}
                disabled={isLoading}
            >
              <Lock size={18} style={{ marginRight: '0.5rem' }} />
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
        
        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#94a3b8' }}>
          Protected by VitalGuard AI Security
        </p>
      </div>
    </div>
  );
};

export default Login;
