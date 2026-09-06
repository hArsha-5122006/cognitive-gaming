import { Link } from "react-router-dom";

function Games() {
  const games = [
    { to: '/games/memory', emoji: '🧩', name: 'Memory Match', desc: 'Match pairs' },
    { to: '/games/sequence', emoji: '🧠', name: 'Sequence Recall', desc: 'Remember order' },
    { to: '/games/attention', emoji: '🎯', name: 'Target Attention', desc: 'Find odd symbol' },
    { to: '/games/stroop', emoji: '🎨', name: 'Stroop Effect', desc: 'Name ink color' },
    { to: '/games/nback', emoji: '🔢', name: 'N‑Back', desc: 'Working memory' },
    { to: '/games/visualsearch', emoji: '🔍', name: 'Visual Search', desc: 'Find targets' },
    { to: '/games/choicereaction', emoji: '⏱️', name: 'Choice Reaction', desc: 'Processing speed' },
    { to: '/games/cardsorting', emoji: '🃏', name: 'Card Sorting', desc: 'Flexible sorting' },
    { to: '/games/trailmaking', emoji: '🔗', name: 'Trail Making', desc: 'Connect in order' },
    { to: '/games/mentalrotation', emoji: '🔄', name: 'Mental Rotation', desc: 'Spatial reasoning' },
    { to: '/games/digitspan', emoji: '🔢', name: 'Digit Span', desc: 'Verbal working memory' },
    { to: '/games/flanker', emoji: '🎯', name: 'Flanker Task', desc: 'Inhibitory control' },
    { to: '/games/patternmemory', emoji: '💡', name: 'Pattern Memory', desc: 'Simon Says' },
  ];

  return (
    <div className="container" style={{ padding: '20px 0 30px' }}>
      {/* Decorative rope (thin) */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #8B7A5A, #D4C4A8, #8B7A5A)',
        borderRadius: '2px',
        margin: '0 auto 20px',
        width: '80%',
        maxWidth: '600px',
        opacity: 0.6,
      }} />

      <div style={{ textAlign: 'center', padding: '10px 0 16px' }}>
        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 700,
          color: '#1a2a2a',
          letterSpacing: '-0.5px',
          marginBottom: '4px',
        }}>
          Our Games
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#4a5f5a',
          fontWeight: 400,
        }}>
          Choose a game to start training
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '16px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {games.map(game => (
          <Link
            key={game.to}
            to={game.to}
            className="card"
            style={{
              textDecoration: 'none',
              color: '#1a2a2a',
              textAlign: 'center',
              padding: '16px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '130px',
              transform: 'translateY(0)',
              transition: 'all 0.25s ease',
              borderRadius: '16px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
            }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '4px' }}>{game.emoji}</div>
            <h3 style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              margin: '4px 0 2px',
              color: '#1a2a2a',
            }}>
              {game.name}
            </h3>
            <p style={{
              fontSize: '0.75rem',
              color: '#4a5f5a',
              margin: 0,
              lineHeight: 1.2,
            }}>
              {game.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Games;
