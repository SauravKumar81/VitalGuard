import { useState, useEffect } from 'react';
import { Search, Filter, Plus, X, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getPatients, createPatient, type Patient } from '../services/api';

const PatientList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'M',
    mrn: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Failed to load patients", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createPatient({
        name: newPatient.name,
        age: parseInt(newPatient.age),
        gender: newPatient.gender as 'M' | 'F',
        mrn: newPatient.mrn
      });
      await fetchPatients(); // Reload list
      setShowAddForm(false); // Close form
      setNewPatient({ name: '', age: '', gender: 'M', mrn: '' }); // Reset
    } catch (error) {
      alert("Failed to create patient");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter patients
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toString().includes(searchTerm)
  );

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Patient Records</h1>
          <p style={{ color: '#64748b' }}>Manage and view patient status across all departments.</p>
        </div>
        <button 
            className="btn btn-primary" 
            onClick={() => setShowAddForm(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <UserPlus size={18} />
          Add New Patient
        </button>
      </div>

      {/* Add Patient Modal/Form Overlay */}
      {showAddForm && (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '400px', maxWidth: '90%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Add New Patient</h3>
                    <button onClick={() => setShowAddForm(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>
                </div>
                <form onSubmit={handleCreatePatient}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Full Name</label>
                        <input 
                            type="text" className="input-field" required 
                            value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Age</label>
                            <input 
                                type="number" className="input-field" required 
                                value={newPatient.age} onChange={e => setNewPatient({...newPatient, age: e.target.value})}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Gender</label>
                            <select 
                                className="input-field" 
                                value={newPatient.gender} onChange={e => setNewPatient({...newPatient, gender: e.target.value})}
                            >
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>MRN (Medical Record #)</label>
                        <input 
                            type="text" className="input-field" required 
                            value={newPatient.mrn} onChange={e => setNewPatient({...newPatient, mrn: e.target.value})}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button type="button" className="btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Patient'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by name, MRN, or ID..." 
              className="input-field"
              style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading patients...</div>
        ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Patient Name</th>
                <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>MRN / ID</th>
                <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Gender</th>
                <th style={{ padding: '1rem', color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredPatients.length === 0 ? (
                    <tr>
                        <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No patients found. Click "Add New Patient" to create one.</td>
                    </tr>
                ) : (
                    filteredPatients.map(patient => (
                    <tr key={patient.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 500 }}>{patient.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{patient.age} yrs</div>
                        </td>
                        <td style={{ padding: '1rem', color: '#64748b' }}>
                            <div style={{ fontWeight: 500 }}>{patient.mrn}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: {patient.id}</div>
                        </td>
                        <td style={{ padding: '1rem', color: '#64748b' }}>{patient.gender}</td>
                        <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                                onClick={() => navigate('/history', { state: { patient_id: patient.id } })}
                                className="btn" 
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', border: '1px solid #e2e8f0' }}
                            >
                                History
                            </button>
                            <button 
                                onClick={() => navigate('/assessment', { state: { patient_id: patient.id } })} // We need to handle this in assessment page
                                className="btn" 
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: '#0ea5e9', color: 'white' }}
                            >
                                Assess
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                )}
            </tbody>
            </table>
        )}
      </div>
    </div>
  );
};

export default PatientList;
