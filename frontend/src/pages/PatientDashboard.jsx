import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function PatientDashboard() {
  const { user, token } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch('/api/game/history', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, token]);

  const totalGames = history.length;
  const avgScore = totalGames ? Math.round(history.reduce((s, g) => s + g.score, 0) / totalGames) : 0;
  const bestScore = totalGames ? Math.max(...history.map(g => g.score)) : 0;
  const avgAccuracy = totalGames ? Math.round(history.reduce((s, g) => s + g.accuracy, 0) / totalGames) : 0;

  if (loading) return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Patient Dashboard</h1>
      <p style={{ color: '#4a5f5a', marginBottom: '24px' }}>Your performance overview</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="stat-number">{totalGames}</div>
          <div className="stat-label">Games Played</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="stat-number">{avgScore}</div>
          <div className="stat-label">Avg Score</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="stat-number">{bestScore}</div>
          <div className="stat-label">Best Score</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="stat-number">{avgAccuracy}%</div>
          <div className="stat-label">Avg Accuracy</div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Recent Games</h2>
      {history.length === 0 ? (
        <p style={{ color: '#4a5f5a' }}>No games played yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <thead style={{ background: '#eaf5f1' }}>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Game</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Score</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Accuracy</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Stars</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Difficulty</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 20).map((g, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eef2f0' }}>
                  <td style={{ padding: '12px 16px' }}>{g.game_name}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>{g.score}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>{g.accuracy}%</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>{'⭐'.repeat(g.stars)}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>{g.difficulty}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#4a5f5a' }}>{new Date(g.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
