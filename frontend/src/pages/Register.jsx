import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(username, email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '440px', paddingTop: '60px' }}>
      <div className="card" style={{ padding: '36px 32px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Create Account</h2>
        {error && <div style={{ color: '#e74c3c', background: '#fde8e8', padding: '8px 16px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0dcd8' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0dcd8' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Password (min 6 chars)</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0dcd8' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#4a5f5a' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
