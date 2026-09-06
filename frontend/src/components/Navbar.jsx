import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useVoice } from "../context/VoiceAssistantContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { status } = useVoice();

  return (
    <nav style={{
      background: 'var(--primary)',
      padding: '0 32px',
      height: '72px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{
          fontSize: '1.6rem',
          fontWeight: 700,
          color: 'white',
          letterSpacing: '-0.5px',
        }}>
          <span style={{ color: 'var(--accent)' }}>Mind</span>Play
        </span>
      </div>

      <div style={{
        display: 'flex',
        gap: '28px',
        fontSize: '0.95rem',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.85)',
        alignItems: 'center',
      }}>
        <Link to="/home" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderBottomColor = 'var(--accent)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Home</Link>
        <Link to="/games" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent', fontWeight: 600 }} onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderBottomColor = 'var(--accent)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Games</Link>
        {user?.role === 'mentor' ? (
          <Link to="/mentor-dashboard" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderBottomColor = 'var(--accent)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Mentor</Link>
        ) : (
          <Link to="/dashboard" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderBottomColor = 'var(--accent)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Dashboard</Link>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: status === 'listening' ? '#2ecc71' : (status === 'speaking' ? '#f39c12' : '#888'),
            boxShadow: status === 'listening' ? '0 0 8px rgba(46,204,113,0.5)' : 'none',
            transition: '0.2s',
          }} />
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
            {status === 'listening' ? 'Listening' : status === 'speaking' ? 'Speaking' : 'Idle'}
          </span>
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'white', fontWeight: 600 }}>👋 {user.username}</span>
            <button onClick={logout} className="btn-secondary" style={{ padding: '4px 16px', fontSize: '0.85rem', borderColor: 'white', color: 'white' }} onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--primary)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="btn-secondary" style={{ padding: '6px 20px', fontSize: '0.85rem', borderColor: 'white', color: 'white' }} onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--primary)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}>Log In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
