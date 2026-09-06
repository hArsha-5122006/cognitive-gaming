import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      <div className="glass float" style={{
        textAlign: 'center',
        padding: '60px 20px 50px',
        maxWidth: '780px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontSize: '3.2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '12px',
          letterSpacing: '-1px',
        }}>
          Welcome to <span style={{ color: 'var(--accent)' }}>MindPlay</span>
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: 'var(--text-secondary)',
          marginBottom: '4px',
          fontWeight: 400,
        }}>
          Train your brain with cognitive games.
        </p>
        <Link to="/games">
          <button className="btn-accent glow-pulse" style={{ marginTop: '28px', fontSize: '1.1rem', padding: '14px 48px' }}>
            Explore Games →
          </button>
        </Link>
      </div>

      <div style={{ padding: '40px 0 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {['🧠', '🎯', '🧩', '💪'].map((icon, i) => (
            <div key={i} className="card fade-up" style={{ textAlign: 'center', padding: '24px 16px' }}>
              <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: '8px' }}>{icon}</span>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {['Boost Memory', 'Improve Focus', 'Enhance Skills', 'Build Confidence'][i]}
              </h4>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '40px 0 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <div className="card"><div className="stat-number">10+</div><div className="stat-label">Games</div></div>
          <div className="card"><div className="stat-number">500+</div><div className="stat-label">Users</div></div>
          <div className="card"><div className="stat-number">95%</div><div className="stat-label">Satisfaction</div></div>
          <div className="card"><div className="stat-number">100%</div><div className="stat-label">Secure</div></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
