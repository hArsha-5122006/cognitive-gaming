import { Link } from "react-router-dom";

function Games() {
  const games = [
    { to: '/games/memory', emoji: '��', name: 'Memory Match', desc: 'Match pairs of cards' },
    { to: '/games/sequence', emoji: '🧠', name: 'Sequence Recall', desc: 'Remember the order' },
    { to: '/games/attention', emoji: '🎯', name: 'Target Attention', desc: 'Find the odd symbol' },
    { to: '/games/stroop', emoji: '🎨', name: 'Stroop Effect', desc: 'Name the ink color' },
    { to: '/games/nback', emoji: '🔢', name: 'N‑Back', desc: 'Working memory test' },
    { to: '/games/visualsearch', emoji: '🔍', name: 'Visual Search', desc: 'Find target symbols' },
    { to: '/games/choicereaction', emoji: '⏱️', name: 'Choice Reaction', desc: 'Test processing speed' },
    { to: '/games/cardsorting', emoji: '🃏', name: 'Card Sorting', desc: 'Flexible rule sorting' },
    { to: '/games/trailmaking', emoji: '🔗', name: 'Trail Making', desc: 'Connect in order' },
    { to: '/games/mentalrotation', emoji: '🔄', name: 'Mental Rotation', desc: 'Spatial reasoning' },
    { to: '/games/digitspan', emoji: '🔢', name: 'Digit Span', desc: 'Verbal working memory' },
    { to: '/games/flanker', emoji: '🎯', name: 'Flanker Task', desc: 'Inhibitory control' },
    { to: '/games/patternmemory', emoji: '💡', name: 'Pattern Memory', desc: 'Simon Says' },
  ];

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <div style={{ textAlign: 'center', padding: '10px 0 30px' }}>
        <h1 style={{
          fontSize: '2.6rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.5px',
          marginBottom: '8px',
        }}>
          Game Zone
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          fontWeight: 400,
        }}>
          Choose a game and keep your mind active!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '24px',
        maxWidth: '1020px',
        margin: '0 auto',
      }}>
        {games.map(game => (
          <Link
            key={game.to}
            to={game.to}
            className="card"
            style={{
              textDecoration: 'none',
              color: 'var(--text-primary)',
              textAlign: 'center',
              padding: '28px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '180px',
              transform: 'translateY(0) perspective(800px) rotateX(0)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02) perspective(800px) rotateX(2deg)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1) perspective(800px) rotateX(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)';
            }}
          >
            <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>{game.emoji}</div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              margin: '6px 0 4px',
              color: 'var(--text-primary)',
            }}>
              {game.name}
            </h3>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              margin: 0,
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
