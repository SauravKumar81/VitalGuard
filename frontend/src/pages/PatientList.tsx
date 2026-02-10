import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    { id: 'VG-9982', name: 'Sarah Jenkins', age: 42, room: 'ICU-2', status: 'Warning', lastVitals: '15m ago', risk: 'Medium' },
    { id: 'VG-9983', name: 'Marcus Thompson', age: 58, room: 'Ward 4', status: 'Critical', lastVitals: '2m ago', risk: 'High' },
    { id: 'VG-9984', name: 'Eleanor Rigby', age: 76, room: 'Ward 1B', status: 'Stable', lastVitals: '1h ago', risk: 'Low' },
    { id: 'VG-9985', name: 'John Doe', age: 34, room: 'Ward 2', status: 'Stable', lastVitals: '45m ago', risk: 'Low' },
    { id: 'VG-9986', name: 'Jane Smith', age: 29, room: 'Ward 3', status: 'Warning', lastVitals: '30m ago', risk: 'Medium' },
  ];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Patient Records</h1>
          <p style={{ color: '#64748b' }}>Manage and view patient status across all departments.</p>
        </div>
        <Link to="/assessment" className="btn btn-primary">
          + New Assessment
        </Link>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by name, MRN, or room..." 
              className="input-field"
              style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn" style={{ border: '1px solid #e2e8f0', gap: '0.5rem' }}>
            <Filter size={18} />
            Filter
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Patient Name</th>
              <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>MRN</th>
              <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Room</th>
              <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Status</th>
              <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Last Vitals</th>
              <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 500 }}>{patient.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{patient.age} yrs</div>
                </td>
                <td style={{ padding: '1rem', color: '#64748b' }}>{patient.id}</td>
                <td style={{ padding: '1rem', color: '#64748b' }}>{patient.room}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    backgroundColor: 
                      patient.status === 'Critical' ? '#fef2f2' : 
                      patient.status === 'Warning' ? '#fffbeb' : '#f0fdf4',
                    color: 
                      patient.status === 'Critical' ? '#ef4444' : 
                      patient.status === 'Warning' ? '#f59e0b' : '#16a34a'
                  }}>
                    {patient.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>{patient.lastVitals}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to="/history" className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: '1px solid #e2e8f0' }}>History</Link>
                    <Link to="/risk-assessment" className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: '#0ea5e9', color: 'white' }}>Assess</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
