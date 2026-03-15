import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Activity, Clock, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { getPatientHistory, getPatients, type AssessmentResponse, type Patient } from '../services/api';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-hot-toast';

const PatientHistory = () => {
  const location = useLocation();
  const [assessments, setAssessments] = useState<AssessmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize with location state or default to 1, but make it stateful
  const [selectedPatientId, setSelectedPatientId] = useState<number>(location.state?.patient_id || 1);
  const [patients, setPatients] = useState<Patient[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // 1. Fetch all patients on mount to populate dropdown
  useEffect(() => {
    const fetchPatients = async () => {
        try {
            const list = await getPatients();
            setPatients(list);
        } catch (err) {
            console.error("Failed to load patient list", err);
        }
    };
    fetchPatients();
  }, []);

  // 2. Fetch history whenever selectedPatientId changes
  useEffect(() => {
    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await getPatientHistory(selectedPatientId);
            // Sort by timestamp desc
            const sorted = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setAssessments(sorted);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to load history");
            setAssessments([]);
        } finally {
            setLoading(false);
        }
    };

    if (selectedPatientId) {
        fetchHistory();
    }
  }, [selectedPatientId]);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
        const canvas = await html2canvas(reportRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        const patientName = patients.find(p => p.id === selectedPatientId)?.name || 'Patient';
        
        pdf.setFontSize(16);
        pdf.text(`Medical History Report - ${patientName}`, 10, 15);
        pdf.setFontSize(10);
        pdf.text(`Generated on: ${new Date().toLocaleString()}`, 10, 22);
        
        // Add image slightly below title
        pdf.addImage(imgData, 'PNG', 0, 30, pdfWidth, pdfHeight);
        pdf.save(`${patientName.replace(/\s+/g, '_')}_History.pdf`);
        toast.success("PDF generated successfully");
    } catch (err) {
        console.error("PDF generation failed", err);
        toast.error("Failed to generate PDF");
    } finally {
        setDownloading(false);
    }
  };

  if (loading) return <div>Loading history...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error} (Is the backend running?)</div>;

  return (
    <div>
      <div className="page-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
            <h1 className="page-title">Patient History</h1>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', color: '#64748b', fontSize: '0.9rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <strong style={{ color: 'var(--text-main)' }}>Select Patient:</strong>
             <div style={{ position: 'relative' }}>
                <select 
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(Number(e.target.value))}
                    className="input-field"
                    style={{ 
                        padding: '0.5rem 2.5rem 0.5rem 1rem', 
                        fontSize: '0.9rem',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--text-main)',
                        borderColor: 'var(--border)',
                        cursor: 'pointer',
                        width: 'auto',
                        marginBottom: 0,
                        minWidth: '200px'
                    }}
                >
                    {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (ID: {p.id})</option>
                    ))}
                    {/* Fallback if patients not loaded yet or ID not in list */}
                    {!patients.find(p => p.id === selectedPatientId) && (
                        <option value={selectedPatientId}>Patient {selectedPatientId}</option>
                    )}
                </select>
             </div>
          </div>
          <span><strong style={{ color: 'var(--text-main)' }}>Total Assessments:</strong> {assessments.length}</span>
          </div>
        </div>
        <button 
           onClick={handleDownloadPDF} 
           disabled={downloading || assessments.length === 0}
           className="btn btn-primary"
           style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
            <Download size={18} />
            {downloading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      <div ref={reportRef} style={{ display: 'flex', gap: '2rem', marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--background)' }}>
        <div style={{ flex: '0 0 300px' }}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <Activity size={18} style={{ marginRight: '0.5rem', color: '#0ea5e9' }} />
              Latest Vitals
            </h3>
            {assessments.length > 0 ? (
                <>
                    <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Heart Rate</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{assessments[0].heart_rate} bpm</div>
                    </div>
                    <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>O2 Saturation</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{assessments[0].spo2} %</div>
                    </div>
                </>
            ) : (
                <p>No data recorded.</p>
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
           <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
             <Clock size={24} style={{ marginRight: '0.75rem' }} />
             Assessment Timeline
           </h3>

           <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid #e2e8f0' }}>
             
             {assessments.map((assessment) => {
                 const isRisk = assessment.risk_level === 'High Risk';
                 const color = isRisk ? '#ef4444' : '#22c55e';
                 const date = new Date(assessment.timestamp);
                 
                 return (
                    <div key={assessment.id} style={{ marginBottom: '2rem', position: 'relative' }}>
                        <div style={{ 
                            position: 'absolute', 
                            left: '-2.6rem', 
                            top: '0.25rem', 
                            width: '16px', 
                            height: '16px', 
                            borderRadius: '50%', 
                            backgroundColor: color, 
                            border: '4px solid var(--background)',
                            boxShadow: `0 0 0 1px ${color}`
                        }}></div>
                        <div className="card" style={{ borderColor: isRisk ? '#fecaca' : 'var(--border)', backgroundColor: isRisk ? '#fef2f2' : 'var(--surface)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontWeight: 600, color: isRisk ? '#991b1b' : '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {isRisk ? <AlertTriangle size={16}/> : <CheckCircle size={16}/>}
                                    {isRisk ? 'Risk Alert' : 'Stable Assessment'}
                                </h4>
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                                </span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '0.5rem' }}>
                                <strong>Vitals:</strong> HR: {assessment.heart_rate} | BP: {assessment.systolic_bp} | SpO2: {assessment.spo2}% | Temp: {assessment.temperature}°C
                            </p>
                            {assessment.analysis_text && (
                                <p style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                                    Note: {assessment.analysis_text}
                                </p>
                            )}
                        </div>
                    </div>
                 );
             })}
             
             {assessments.length === 0 && (
                 <p>No history found for this patient.</p>
             )}

           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
