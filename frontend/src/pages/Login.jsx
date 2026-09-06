import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Submitting login with:', { email, password });
    try {
      const result = await login(email, password);
      console.log('Login result:', result);
      // Force navigation
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '440px', paddingTop: '60px' }}>
      <div className="card" style={{ padding: '36px 32px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Log In</h2>
        {error && <div style={{ color: '#e74c3c', background: '#fde8e8', padding: '8px 16px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0dcd8' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0dcd8' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#4a5f5a' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
