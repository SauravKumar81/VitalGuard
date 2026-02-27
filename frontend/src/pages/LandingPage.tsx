import { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Shield, Heart, Zap, CheckCircle, Moon, Sun } from 'lucide-react';
import MedicalScene from '../components/ThreeD/MedicalScene';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const isDarkMode = theme === 'dark';
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    let xPosition = clientX - left;
    let yPosition = clientY - top;
    
    mouseX.set(xPosition / width);
    mouseY.set(yPosition / height);
  }

  const themeStyles = {
    '--bg-gradient': isDarkMode ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
    '--bg-secondary': isDarkMode ? '#0f172a' : '#ffffff',
    '--bg-card': isDarkMode ? '#1e293b' : '#f8fafc',
    '--text-primary': isDarkMode ? '#f8fafc' : '#0f172a',
    '--text-secondary': isDarkMode ? '#94a3b8' : '#64748b',
    '--border-color': isDarkMode ? '#334155' : '#e2e8f0',
    '--nav-bg': isDarkMode ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
  } as React.CSSProperties;

  return (
    <div 
      className="landing-page" 
      onMouseMove={handleMouseMove}
      style={{ 
        ...themeStyles,
        minHeight: '100vh', 
        background: 'var(--bg-gradient)',
        color: 'var(--text-primary)',
        fontFamily: "'Inter', sans-serif",
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Gradient Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: isDarkMode ? [0.1, 0.3, 0.1] : [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(0,0,0,0) 70%)' }} 
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 50, 0], opacity: isDarkMode ? [0.1, 0.2, 0.1] : [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(0,0,0,0) 70%)' }} 
        />
      </div>

      {/* Navigation */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.5rem 5%',
        maxWidth: '1440px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 50
      }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{ 
            background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', 
            padding: '8px', 
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>
            <Activity size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            VitalGuard
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
        >
          <a href="#features" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500, transition: 'color 0.2s' }}>Features</a>
          <a href="#about" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500, transition: 'color 0.2s' }}>About</a>
          
          <button 
            onClick={toggleTheme}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--text-primary)'
            }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                textDecoration: 'none', 
                background: '#0f172a', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '50px', 
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
              }}
            >
              Clinician Login
            </motion.button>
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        minHeight: 'calc(100vh - 80px)', 
        padding: '0 5%',
        maxWidth: '1440px',
        margin: '0 auto',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Left Content */}
        <div style={{ paddingRight: '2rem', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                background: isDarkMode ? 'rgba(56, 189, 248, 0.15)' : 'rgba(224, 242, 254, 0.8)', 
                backdropFilter: 'blur(4px)',
                color: '#0ea5e9', 
                padding: '0.5rem 1rem', 
                borderRadius: '50px', 
                fontWeight: 600, 
                fontSize: '0.875rem', 
                marginBottom: '1.5rem',
                border: isDarkMode ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid #bae6fd',
                cursor: 'default'
              }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Zap size={16} fill="#0ea5e9" />
              </motion.div>
              <span>AI-Powered Diagnostics v2.0</span>
            </motion.div>
            
            <h1 style={{ 
              fontSize: '4.5rem', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: 'var(--text-primary)', 
              marginBottom: '1.5rem',
              letterSpacing: '-1.5px'
            }}>
              Precision Care <br />
              <motion.span 
                initial={{ backgroundSize: '0% 100%' }}
                animate={{ backgroundSize: '100% 100%' }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ 
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  backgroundRepeat: 'no-repeat',
                  display: 'inline-block'
                }}
              >
                Reimagined.
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{ 
                fontSize: '1.25rem', 
                color: 'var(--text-secondary)', 
                maxWidth: '550px', 
                lineHeight: 1.6, 
                marginBottom: '2.5rem' 
              }}
            >
              Monitor patient vitals in real-time with our advanced AI prediction engine. 
              Reduce risk and improve outcomes with data-driven insights.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              <Link to="/login">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 15px 30px -5px rgba(59, 130, 246, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', 
                    color: 'white', 
                    padding: '1rem 2rem', 
                    borderRadius: '12px', 
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  Get Started <ArrowRight size={20} />
                </motion.button>
              </Link>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc' }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255,255,255,0.8)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-secondary)', 
                  padding: '1rem 2rem', 
                  borderRadius: '12px', 
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)'
                }}
              >
                View Demo
              </motion.button>
            </motion.div>

            <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem' }}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>98%</h3>
                  <CheckCircle size={20} color="#22c55e" />
                </div>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Prediction Accuracy</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4 }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>24/7</h3>
                  <motion.div 
                     animate={{ opacity: [1, 0.4, 1] }} 
                     transition={{ duration: 2, repeat: Infinity }}
                  >
                     <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                  </motion.div>
                </div>
                <p style={{ color: '#64748b', fontWeight: 500 }}>Real-time Monitoring</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Content - 3D Scene */}
        <div style={{ height: '100%', position: 'relative', perspective: '1000px' }}>
          <MedicalScene />
          
          {/* Floating Feature Cards with Parallax Effect */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ 
              position: 'absolute', 
              top: '20%', 
              right: '10%', 
              background: 'rgba(255, 255, 255, 0.9)', 
              backdropFilter: 'blur(12px)',
              padding: '1.25rem', 
              borderRadius: '20px',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '260px',
              border: '1px solid rgba(255,255,255,0.5)'
            }}
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.2)' }}
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ background: '#e0f2fe', padding: '12px', borderRadius: '16px' }}
            >
              <Heart size={28} color="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} />
            </motion.div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>Heart Rate</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>72 <span style={{fontSize: '0.875rem', fontWeight: 600, color:'#94a3b8'}}>BPM</span></div>
            </div>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#22c55e', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', boxShadow: '0 4px 6px rgba(34, 197, 94, 0.3)' }}>
              <CheckCircle size={14} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ 
              position: 'absolute', 
              bottom: '25%', 
              left: '5%', 
              background: 'rgba(255, 255, 255, 0.9)', 
              backdropFilter: 'blur(12px)',
              padding: '1.25rem', 
              borderRadius: '20px',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '260px',
              border: '1px solid rgba(255,255,255,0.5)'
            }}
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.2)' }}
          >
            <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '16px' }}>
              <Shield size={28} color="#ef4444" />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>Risk Level</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a' }}>Low Risk</div>
            </div>
            <div style={{ marginLeft: 'auto', color: '#0ea5e9', fontSize: '1.5rem', fontWeight: 900 }}>A+</div>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" style={{ padding: '6rem 5%', background: 'var(--bg-secondary)', position: 'relative', zIndex: 10, transition: 'background-color 0.3s' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '5rem' }}
          >
            <span style={{ 
              color: '#0ea5e9', 
              fontWeight: 700, 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              fontSize: '0.875rem',
              display: 'block',
              marginBottom: '1rem' 
            }}>
              Advanced Capabilities
            </span>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 800, 
              color: 'var(--text-primary)', 
              marginBottom: '1rem',
              letterSpacing: '-1px'
            }}>
              The Future of Patient Monitoring
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
              Integrated AI diagnostics and real-time data tracking for superior healthcare outcomes.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {[
              { 
                icon: <Zap size={32} color="white" />, 
                color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                title: 'AI Diagnostics', 
                desc: 'Predictive algorithms analyze vital signs in real-time to identify potential risks before they become critical.' 
              },
              { 
                icon: <Activity size={32} color="white" />, 
                color: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                title: 'Live Vitals', 
                desc: 'Continuous monitoring of heart rate, blood pressure, and oxygen levels with millisecond precision.' 
              },
              { 
                icon: <Shield size={32} color="white" />, 
                color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                title: 'Secure Records', 
                desc: 'HIPAA-compliant data encryption ensures patient history and personal information remain private and secure.' 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
                style={{ 
                  background: 'var(--bg-card)', 
                  borderRadius: '24px', 
                  padding: '3rem 2rem', 
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '16px', 
                    background: feature.color, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)'
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '6rem 5%', background: '#0f172a', color: 'white', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
           <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
           >
              <span style={{ 
                color: '#38bdf8', 
                fontWeight: 700, 
                letterSpacing: '1px', 
                textTransform: 'uppercase', 
                fontSize: '0.875rem', 
                display: 'block',
                marginBottom: '1rem'
              }}>
                Our Mission
              </span>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.1 }}>
                Empowering Clinicians with <span style={{ color: '#38bdf8' }}>Intelligent Tools</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                At VitalGuard, we believe that technology should amplify human expertise, not replace it. Our platform bridges the gap between raw medical data and actionable clinical insights.
              </p>
              <p style={{ color: '#94a3b8', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '3rem' }}>
                Founded by a team of medical professionals and data scientists, we are dedicated to reducing hospital readmission rates and improving patient quality of life through proactive monitoring.
              </p>
              <div style={{ display: 'flex', gap: '3rem' }}>
                 <div>
                    <h4 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>500+</h4>
                    <span style={{ color: '#64748b' }}>Hospitals</span>
                 </div>
                 <div>
                    <h4 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>1M+</h4>
                    <span style={{ color: '#64748b' }}>Patients</span>
                 </div>
              </div>
           </motion.div>
           
           <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
           >
              <div style={{ 
                background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', 
                borderRadius: '32px', 
                padding: '4px',
                boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.25)'
              }}>
                <div style={{ 
                    background: '#1e293b', 
                    borderRadius: '28px', 
                    padding: '3rem', 
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <Activity size={80} color="#38bdf8" style={{ opacity: 0.5, marginBottom: '2rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, textAlign: 'center', marginBottom: '1rem' }}>"VitalGuard has transformed how we manage critical care patients."</h3>
                    <p style={{ color: '#94a3b8' }}>— Dr. Sarah Chen, Chief of Medicine</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                 style={{ 
                    position: 'absolute', 
                    top: '-20px', 
                    right: '-20px', 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 10px 20px rgba(225, 29, 72, 0.4)'
                 }}
              >
                  <Heart size={32} color="white" fill="white" />
              </motion.div>
           </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#020617', color: '#475569', padding: '3rem 5%', textAlign: 'center', borderTop: '1px solid #1e293b' }}>
        <p>© 2026 VitalGuard Medical Systems. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
