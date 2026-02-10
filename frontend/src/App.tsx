import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import PatientAssessment from './pages/PatientAssessment.tsx';
import RiskAssessment from './pages/RiskAssessment.tsx';
import PatientHistory from './pages/PatientHistory.tsx';
import PatientList from './pages/PatientList.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="assessment" element={<PatientAssessment />} />
          <Route path="risk-assessment" element={<RiskAssessment />} />
          <Route path="history" element={<PatientHistory />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
