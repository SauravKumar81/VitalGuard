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

const Layout = () => {
  const location = useLocation();
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
            <div className="user-avatar">DS</div>
            <div>
              <div style={{ fontWeight: 600 }}>Dr. Sarah Smith</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Chief Cardiologist</div>
            </div>
            <LogOut size={16} style={{ marginLeft: 'auto', cursor: 'pointer' }} />
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
