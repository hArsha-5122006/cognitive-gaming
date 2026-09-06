import { Link } from "react-router-dom";
import { useVoice } from "../context/VoiceAssistantContext";

function Navbar({ user, logout }) {
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
      borderBottom: '1px solid rgba(255,255,255,0.3)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      marginBottom: '0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{
          fontSize: '1.6rem',
          fontWeight: 700,
          color: '#1a2a2a',
          letterSpacing: '-0.5px',
        }}>
          <span style={{ color: 'var(--primary)' }}>Mind</span>Play
        </span>
      </div>

      <div style={{
        display: 'flex',
        gap: '36px',
        fontSize: '0.95rem',
        fontWeight: 500,
        color: '#4a5f5a',
        alignItems: 'center',
      }}>
        <Link to="/" style={{ color: '#4a5f5a', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.color = '#1a2a2a'; e.currentTarget.style.borderBottomColor = 'var(--primary)'; }} onMouseLeave={e => { e.currentTarget.style.color = '#4a5f5a'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Home</Link>
        <Link to="/games" style={{ color: '#4a5f5a', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent', fontWeight: 600 }} onMouseEnter={e => { e.currentTarget.style.color = '#1a2a2a'; e.currentTarget.style.borderBottomColor = 'var(--primary)'; }} onMouseLeave={e => { e.currentTarget.style.color = '#4a5f5a'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Games</Link>
        <Link to="/dashboard" style={{ color: '#4a5f5a', textDecoration: 'none', transition: '0.15s', padding: '4px 0', borderBottom: '2px solid transparent' }} onMouseEnter={e => { e.currentTarget.style.color = '#1a2a2a'; e.currentTarget.style.borderBottomColor = 'var(--primary)'; }} onMouseLeave={e => { e.currentTarget.style.color = '#4a5f5a'; e.currentTarget.style.borderBottomColor = 'transparent'; }}>Dashboard</Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: status === 'listening' ? '#2ecc71' : (status === 'speaking' ? '#f39c12' : '#ccc'),
            boxShadow: status === 'listening' ? '0 0 8px rgba(46,204,113,0.5)' : 'none',
            transition: '0.2s',
          }} />
          <span style={{ fontSize: '0.75rem', color: '#4a5f5a' }}>
            {status === 'listening' ? 'Listening' : status === 'speaking' ? 'Speaking' : 'Idle'}
          </span>
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#1a2a2a', fontWeight: 600 }}>👋 {user.username}</span>
            <button onClick={logout} style={{ background: 'none', border: 'none', color: '#4a5f5a', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500, padding: '4px 12px', borderRadius: '20px', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#eaf0ed'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/login" style={{ color: '#4a5f5a', textDecoration: 'none', padding: '6px 16px', borderRadius: '20px', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#eaf0ed'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Log In</Link>
            <Link to="/register"><button className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem', boxShadow: '0 2px 12px rgba(30,123,94,0.2)' }}>Sign Up</button></Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
