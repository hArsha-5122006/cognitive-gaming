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
          fontSize: '3.4rem',
          fontWeight: 700,
          color: '#1a2a2a',
          marginBottom: '12px',
          letterSpacing: '-1px',
        }}>
          Welcome to Our Platform
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: '#4a5f5a',
          marginBottom: '4px',
          fontWeight: 400,
        }}>
          Clean. Efficient. Ready to Use.
        </p>
        <Link to="/games">
          <button className="btn-primary" style={{ marginTop: '28px', fontSize: '1.1rem', padding: '14px 48px' }}>
            Get Started
          </button>
        </Link>
      </div>

      <div id="features" style={{ padding: '40px 0 20px' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          textAlign: 'center',
          color: '#1a2a2a',
          marginBottom: '8px',
        }}>
          Why Cognitive Games?
        </h2>
        <p style={{
          fontSize: '1.05rem',
          textAlign: 'center',
          color: '#4a5f5a',
          marginBottom: '32px',
        }}>
          Fun and interactive games designed to train the brain.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          maxWidth: '960px',
          margin: '0 auto',
        }}>
          <div className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
            <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: '8px' }}>��</span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Boost Memory</h4>
            <p style={{ color: '#4a5f5a', fontSize: '0.95rem', margin: 0 }}>Improves memory and recall.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
            <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: '8px' }}>🎯</span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Improves Focus</h4>
            <p style={{ color: '#4a5f5a', fontSize: '0.95rem', margin: 0 }}>Enhances attention and concentration.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
            <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: '8px' }}>💚</span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Supports Well-being</h4>
            <p style={{ color: '#4a5f5a', fontSize: '0.95rem', margin: 0 }}>Promotes mental well-being and reduces cognitive decline.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
            <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: '8px' }}>📊</span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Track Progress</h4>
            <p style={{ color: '#4a5f5a', fontSize: '0.95rem', margin: 0 }}>Monitor performance and progress easily.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
