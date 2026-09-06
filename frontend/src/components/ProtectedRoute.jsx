import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ textAlign: 'center', padding: '80px' }}>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard (mentor goes to dashboard, patient also to dashboard)
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
