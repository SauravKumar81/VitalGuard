import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Shield, Heart, Zap } from 'lucide-react';
import MedicalScene from '../components/ThreeD/MedicalScene';

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden'
    }}>
      {/* Navigation */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.5rem 5%',
        maxWidth: '1440px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', 
            padding: '8px', 
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>
            <Activity size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
            VitalGuard
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#features" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 500 }}>Features</a>
          <a href="#about" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 500 }}>About</a>
          <Link to="/login" style={{ 
            textDecoration: 'none', 
            background: '#0f172a', 
            color: 'white', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '50px', 
            fontWeight: 600,
            transition: 'transform 0.2s',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
          }}>
            Clinician Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        minHeight: 'calc(100vh - 80px)', 
        padding: '0 5%',
        maxWidth: '1440px',
        margin: '0 auto',
        alignItems: 'center'
      }}>
        {/* Left Content */}
        <div style={{ paddingRight: '2rem', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: '#e0f2fe', 
              color: '#0284c7', 
              padding: '0.5rem 1rem', 
              borderRadius: '50px', 
              fontWeight: 600, 
              fontSize: '0.875rem', 
              marginBottom: '1.5rem' 
            }}>
              <Zap size={16} fill="#0284c7" />
              <span>AI-Powered Diagnostics v2.0</span>
            </div>
            
            <h1 style={{ 
              fontSize: '4.5rem', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: '#0f172a', 
              marginBottom: '1.5rem',
              letterSpacing: '-1.5px'
            }}>
              Precision Care <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>Reimagined.</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#64748b', 
              maxWidth: '500px', 
              lineHeight: 1.6, 
              marginBottom: '2.5rem' 
            }}>
              Monitor patient vitals in real-time with our advanced AI prediction engine. 
              Reduce risk and improve outcomes with data-driven insights.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none', 
                background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', 
                color: 'white', 
                padding: '1rem 2rem', 
                borderRadius: '12px', 
                fontWeight: 600,
                fontSize: '1.125rem',
                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
              }}>
                Get Started <ArrowRight size={20} />
              </Link>
              
              <button style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'white', 
                border: '1px solid #e2e8f0', 
                color: '#475569', 
                padding: '1rem 2rem', 
                borderRadius: '12px', 
                fontWeight: 600,
                fontSize: '1.125rem',
                cursor: 'pointer'
              }}>
                View Demo
              </button>
            </div>

            <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>98%</h3>
                <p style={{ color: '#64748b' }}>Prediction Accuracy</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>24/7</h3>
                <p style={{ color: '#64748b' }}>Real-time Monitoring</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Content - 3D Scene */}
        <div style={{ height: '100%', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '600px', 
            height: '600px', 
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, rgba(255,255,255,0) 70%)',
            zIndex: -1,
            pointerEvents: 'none'
          }} />
          <MedicalScene />
          
          {/* Floating Feature Cards */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ 
              position: 'absolute', 
              top: '20%', 
              right: '10%', 
              background: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(12px)',
              padding: '1rem', 
              borderRadius: '16px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '240px'
            }}
          >
            <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '12px' }}>
              <Heart size={24} color="#0ea5e9" />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Heart Rate</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>72 BPM</div>
            </div>
            <div style={{ color: '#22c55e', fontSize: '0.75rem', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>+2%</div>
          </motion.div>

          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ 
              position: 'absolute', 
              bottom: '25%', 
              left: '5%', 
              background: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(12px)',
              padding: '1rem', 
              borderRadius: '16px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '240px'
            }}
          >
            <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '12px' }}>
              <Shield size={24} color="#ef4444" />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Risk Level</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Low Risk</div>
            </div>
            <div style={{ color: '#0ea5e9', fontSize: '1.25rem', fontWeight: 800 }}>A+</div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
