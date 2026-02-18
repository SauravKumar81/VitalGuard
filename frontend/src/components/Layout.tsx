import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
// ... (existing imports)

const Layout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Activity size={28} />
          VitalGuard
        </div>
        
        <nav>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/patients" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Users size={20} />
            Patient Records
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Activity size={20} />
            Assessments
          </NavLink>
          <NavLink to="/alerts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Bell size={20} />
            Alert History
          </NavLink>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <NavLink to="/settings" className="nav-link">
            <Settings size={20} />
            Settings
          </NavLink>
          <NavLink to="/help" className="nav-link">
            <HelpCircle size={20} />
            Help Center
          </NavLink>
          
          <div className="user-profile">
            <div className="user-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{user?.name || 'User'}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{user?.role || 'Clinician'}</div>
            </div>
            <button 
              onClick={logout} 
              style={{ 
                marginLeft: 'auto', 
                background: 'none', 
                border: 'none', 
                color: '#ef4444', 
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                transition: 'background 0.2s'
              }}
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
