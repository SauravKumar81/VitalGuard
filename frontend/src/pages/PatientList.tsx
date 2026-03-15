import { useState, useEffect } from 'react';
import { Search, X, UserPlus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPatients, createPatient, deletePatient, type Patient } from '../services/api';
import { toast } from 'react-hot-toast';

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
      toast.success("Patient created successfully");
    } catch (error) {
      toast.error("Failed to create patient");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePatient = async (id: number) => {
    try {
        await deletePatient(id);
        await fetchPatients();
        toast.success("Patient record deleted");
    } catch (error) {
        toast.error("Failed to delete patient");
    }
  };

  // Filter patients
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toString().includes(searchTerm)
  );


  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Patient Records</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage and view patient status across all departments.</p>
        </div>
        <button 
            className="btn btn-primary" 
            onClick={() => setShowAddForm(true)}
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                backgroundColor: '#0ea5e9',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: '999px', // Pill shape from reference
                boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.2)'
            }}
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
            <div className="card" style={{ width: '400px', maxWidth: '90%', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Add New Patient</h3>
                    <button onClick={() => setShowAddForm(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
                </div>
                <form onSubmit={handleCreatePatient}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Full Name</label>
                        <input 
                            type="text" className="input-field" required 
                            value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})}
                            placeholder="e.g. Sarah Jenkins"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Age</label>
                            <input 
                                type="number" className="input-field" required 
                                value={newPatient.age} onChange={e => setNewPatient({...newPatient, age: e.target.value})}
                                placeholder="45"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Gender</label>
                            <select 
                                className="input-field" 
                                value={newPatient.gender} onChange={e => setNewPatient({...newPatient, gender: e.target.value})}
                            >
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>MRN (Medical Record #)</label>
                        <input 
                            type="text" className="input-field" required 
                            value={newPatient.mrn} onChange={e => setNewPatient({...newPatient, mrn: e.target.value})}
                            placeholder="e.g. VG-1001"
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button type="button" className="btn" onClick={() => setShowAddForm(false)} style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Patient'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        {/* Search Bar Container */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ position: 'relative', width: '100%' }}>
                <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                type="text" 
                placeholder="Search by name, MRN, or ID..." 
                className="input-field"
                style={{ 
                    paddingLeft: '3rem', 
                    marginBottom: 0, 
                    backgroundColor: 'var(--input-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '999px',
                    height: '48px',
                    width: '100%',
                    color: 'var(--text-main)'
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                <div style={{ marginBottom: '1rem' }}>Loading patient records...</div>
            </div>
        ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ textAlign: 'left', backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patient Name</th>
                    <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MRN / ID</th>
                    <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gender</th>
                    <th style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredPatients.length === 0 ? (
                    <tr>
                        <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                            No patients found matching your search.
                        </td>
                    </tr>
                ) : (
                    filteredPatients.map((patient) => (
                    <tr key={patient.id} style={{ borderTop: '1px solid var(--border)', transition: 'background-color 0.2s', backgroundColor: 'var(--surface)' }}>
                        <td style={{ padding: '1.25rem 2rem' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>{patient.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{patient.age} yrs</div>
                        </td>
                        <td style={{ padding: '1.25rem 2rem' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{patient.mrn}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', fontFamily: 'monospace' }}>ID: {patient.id}</div>
                        </td>
                        <td style={{ padding: '1.25rem 2rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                            {patient.gender}
                        </td>
                        <td style={{ padding: '1.25rem 2rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button 
                                    onClick={() => navigate('/app/history', { state: { patient_id: patient.id } })}
                                    className="btn" 
                                    style={{ 
                                        padding: '0.4rem 1rem', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 600,
                                        backgroundColor: 'var(--background)', 
                                        color: 'var(--text-muted)',
                                        borderRadius: '999px',
                                        border: 'none'
                                    }}
                                >
                                    History
                                </button>
                                <button 
                                    onClick={() => navigate('/app/assessment', { state: { patient_id: patient.id } })}
                                    className="btn" 
                                    style={{ 
                                        padding: '0.4rem 1rem', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 600,
                                        backgroundColor: '#0ea5e9', 
                                        color: 'white',
                                        borderRadius: '999px',
                                        border: 'none',
                                        boxShadow: '0 2px 4px rgba(14, 165, 233, 0.2)'
                                    }}
                                >
                                    Assess
                                </button>
                                <button 
                                    onClick={() => handleDeletePatient(patient.id)}
                                    className="btn" 
                                    style={{ 
                                        padding: '0.4rem 0.6rem', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 600,
                                        backgroundColor: '#fee2e2', 
                                        color: '#ef4444',
                                        borderRadius: '999px',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    title="Delete Patient"
                                >
                                    <Trash2 size={16} />
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
