import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPerformanceSummary, getActivities } from '../utils/recommender';
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [activities, setActivities] = useState([]);

  const loadData = () => {
    if (user) {
      const acts = getActivities(user.username);
      setActivities(acts);
      setSummary(getPerformanceSummary(user.username));
    }
  };

  useEffect(() => {
    loadData();
    const handleSave = () => {
      loadData();
      toast.success('Updated', { icon: '✨' });
    };
    window.addEventListener('gameResultSaved', handleSave);
    const interval = setInterval(() => {
      loadData();
      toast('Refreshed', { icon: '🔄' });
    }, 15000);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadData();
        toast('Refreshed', { icon: '🔄' });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('gameResultSaved', handleSave);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [user]);

  if (!user) return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Please log in.</div>;

  const totalGames = summary?.totalGames || 0;
  const skillAverages = summary?.skillAverages || {};

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <Toaster position="top-right" toastOptions={{ className: 'toast-success' }} />
      <h1 style={{ fontSize: '2rem', marginBottom: '4px', color: 'var(--text-primary)' }}>
        Good Morning, {user.username}
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        <span className="live-dot" /> live
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="stat-number">{totalGames}</div>
          <div className="stat-label">Total Games</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="stat-number">{summary?.weakest || '—'}</div>
          <div className="stat-label">Weakest Skill</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="stat-number">{summary?.strongest || '—'}</div>
          <div className="stat-label">Strongest Skill</div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Skill Performance</h2>
      <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
        {Object.keys(skillAverages).length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No data yet – play some games!</p>
        ) : (
          Object.entries(skillAverages).map(([skill, avg]) => (
            <div key={skill} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 500 }}>{skill}</span>
                <span>{avg}</span>
              </div>
              <div className="skill-bar"><div className="fill" style={{ width: `${Math.min(avg, 100)}%` }} /></div>
            </div>
          ))
        )}
      </div>

      <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Recent Activities</h2>
      {activities.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No activities yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Game</th><th>Score</th><th>Accuracy</th><th>Stars</th><th>Date</th></tr></thead>
            <tbody>
              {activities.slice(0, 10).map((act, idx) => (
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
  );
}

export default Dashboard;
