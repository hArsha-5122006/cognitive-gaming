import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getActivities } from '../utils/recommender';

function MentorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientActivities, setPatientActivities] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'mentor') { navigate('/home'); return; }
    const stored = localStorage.getItem(`patients_${user.username}`);
    setPatients(stored ? JSON.parse(stored) : []);
  }, [user, navigate, refreshKey]);

  const savePatients = (updated) => {
    setPatients(updated);
    localStorage.setItem(`patients_${user.username}`, JSON.stringify(updated));
  };

  const addPatient = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!newPatientEmail) { setError('Enter an email.'); setLoading(false); return; }
    const emailMap = JSON.parse(localStorage.getItem('emailMap') || '{}');
    const username = emailMap[newPatientEmail];
    if (!username) { setError('No user with that email.'); setLoading(false); return; }
    if (patients.some(p => p.email === newPatientEmail)) { setError('Already added.'); setLoading(false); return; }
    savePatients([...patients, { id: Date.now(), email: newPatientEmail, username, name: username }]);
    setNewPatientEmail('');
    setLoading(false);
    setRefreshKey(prev => prev + 1);
  };

  const removePatient = (id) => {
    savePatients(patients.filter(p => p.id !== id));
    if (selectedPatient && selectedPatient.id === id) { setSelectedPatient(null); setPatientActivities([]); }
  };

  const viewPatientStats = (patient) => {
    setSelectedPatient(patient);
    setPatientActivities(getActivities(patient.username) || []);
  };

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Mentor Dashboard</h1>
        <button className="btn-secondary" onClick={() => setRefreshKey(prev => prev + 1)}>🔄 Refresh</button>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage your patients in real time. <span className="live-dot" /> live</p>

      <div className="glass-card" style={{ marginBottom: '24px', padding: '20px' }}>
        <h3 style={{ marginBottom: '12px' }}>Add New Patient</h3>
        <form onSubmit={addPatient} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input type="email" placeholder="Patient Email" value={newPatientEmail} onChange={(e) => setNewPatientEmail(e.target.value)} required style={{ flex: 2 }} />
          <button type="submit" className="btn-gold" disabled={loading}>{loading ? 'Adding...' : 'Add Patient'}</button>
        </form>
        {error && <div style={{ color: '#ff6b6b', marginTop: '8px' }}>{error}</div>}
      </div>

      <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Your Patients</h2>
      {patients.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No patients added yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {patients.map(p => {
            const acts = getActivities(p.username) || [];
            return (
              <div key={p.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
                <div><strong style={{ color: 'var(--text-primary)' }}>{p.name}</strong> ({p.email}) – {acts.length} activities</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-secondary" onClick={() => viewPatientStats(p)}>View</button>
                  <button className="btn-danger" onClick={() => removePatient(p.id)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedPatient && (
        <div className="glass-card" style={{ marginTop: '24px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Activities for {selectedPatient.name}</h3>
            <button onClick={() => { setSelectedPatient(null); setPatientActivities([]); }} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
          </div>
          {patientActivities.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No activities yet.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Game</th><th>Score</th><th>Accuracy</th><th>Stars</th><th>Date</th></tr></thead>
                <tbody>
                  {patientActivities.slice(0, 10).map((act, idx) => (
                    <tr key={idx}>
                      <td>{act.game}</td>
                      <td>{act.score}</td>
                      <td>{act.accuracy}%</td>
                      <td>{'⭐'.repeat(act.stars)}</td>
                      <td>{new Date(act.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MentorDashboard;
