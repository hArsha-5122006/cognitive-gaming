import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'mentor' ? '/mentor-dashboard' : '/home');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '440px', paddingTop: '80px' }}>
      <div className="card" style={{ padding: '40px 32px', background: 'var(--card-bg)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: 'var(--text-primary)' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '24px' }}>Log in to your account</p>
        {error && <div style={{ color: '#c62828', background: '#fce4e4', padding: '8px 16px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Login as</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>
          <button type="submit" className="btn-accent" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
