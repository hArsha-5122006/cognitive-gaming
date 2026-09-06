import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      <div className="glass float" style={{
        textAlign: 'center',
        padding: '60px 20px 50px',
        maxWidth: '780px',
        margin: '0 auto',
        borderRadius: '30px',
      }}>
        <h1 style={{
          fontSize: '3.2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '12px',
          letterSpacing: '-1px',
          textShadow: '0 4px 20px rgba(62,39,35,0.06)',
        }}>
          Welcome to <span style={{ color: 'var(--accent)' }}>MindPlay</span>
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: 'var(--text-secondary)',
          marginBottom: '4px',
          fontWeight: 400,
        }}>
          Cognitive games for a sharper mind.
        </p>
        <Link to="/games">
          <button className="btn-accent" style={{ marginTop: '28px', fontSize: '1.1rem', padding: '14px 48px' }}>
            Explore Games
          </button>
        </Link>
      </div>

      <div style={{ padding: '40px 0 20px' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          textAlign: 'center',
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}>
          Why Cognitive Games?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          maxWidth: '960px',
          margin: '0 auto',
        }}>
          <div className="card fade-up" style={{ textAlign: 'center', padding: '24px 16px' }}>
            <span style={{ fontSize: '2.4rem', display: 'block' }}>🧠</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Boost Memory</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Improves memory and recall.</p>
          </div>
          <div className="card fade-up" style={{ textAlign: 'center', padding: '24px 16px' }}>
            <span style={{ fontSize: '2.4rem', display: 'block' }}>🎯</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Improves Focus</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Enhances attention and concentration.</p>
          </div>
          <div className="card fade-up" style={{ textAlign: 'center', padding: '24px 16px' }}>
            <span style={{ fontSize: '2.4rem', display: 'block' }}>💚</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Supports Well-being</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Promotes mental well-being.</p>
          </div>
          <div className="card fade-up" style={{ textAlign: 'center', padding: '24px 16px' }}>
            <span style={{ fontSize: '2.4rem', display: 'block' }}>📊</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Track Progress</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Monitor performance easily.</p>
          </div>
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
          <div className="card"><div className="stat-number">500+</div><div className="stat-label">Active Users</div></div>
          <div className="card"><div className="stat-number">95%</div><div className="stat-label">Satisfaction</div></div>
          <div className="card"><div className="stat-number">100%</div><div className="stat-label">Secure</div></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
