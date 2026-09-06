import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useVoice } from "../context/VoiceAssistantContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { status } = useVoice();

  return (
    <nav className="glass" style={{
      padding: '0 32px',
      height: '72px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      boxShadow: '0 4px 24px rgba(62,39,35,0.06)',
      marginBottom: '0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontSize: '1.6rem',
          fontWeight: 700,
          color: 'var(--primary)',
          letterSpacing: '-0.5px',
          textShadow: '0 2px 8px rgba(62,39,35,0.06)',
        }}>
          Mind<span style={{ color: 'var(--accent)' }}>Play</span>
        </span>
        <span className="live-badge">● LIVE</span>
      </div>

      <div style={{
        display: 'flex',
        gap: '28px',
        fontSize: '0.95rem',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        alignItems: 'center',
      }}>
        <Link to="/home" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderBottomColor = 'var(--accent)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Home</Link>
        <Link to="/games" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent', fontWeight: 600 }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderBottomColor = 'var(--accent)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Games</Link>
        {user?.role === 'mentor' ? (
          <Link to="/mentor-dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderBottomColor = 'var(--accent)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Mentor</Link>
        ) : (
          <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderBottomColor = 'var(--accent)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Dashboard</Link>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: status === 'listening' ? '#2e7d32' : (status === 'speaking' ? '#f9a825' : '#ccc'),
            boxShadow: status === 'listening' ? '0 0 8px rgba(46,125,50,0.3)' : 'none',
            transition: '0.2s',
          }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {status === 'listening' ? 'Listening' : status === 'speaking' ? 'Speaking' : 'Idle'}
          </span>
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{user.username}</span>
            <button onClick={logout} className="btn-secondary" style={{ padding: '4px 16px', fontSize: '0.85rem' }}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="btn-secondary" style={{ padding: '6px 20px', fontSize: '0.85rem' }}>Log In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
