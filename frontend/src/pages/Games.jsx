import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Games.css";

function Games() {
  const navigate = useNavigate();

  // Simulated realtime data
  const [activePlayers, setActivePlayers] = useState(186);
  const [gamesPlayedToday, setGamesPlayedToday] = useState(12453);
  const [memoryPlayers, setMemoryPlayers] = useState(42);
  const [sequencePlayers, setSequencePlayers] = useState(28);
  const [waitlistCounts, setWaitlistCounts] = useState({
    attention: 127,
    pattern: 154,
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers((prev) => Math.max(100, prev + Math.floor(Math.random() * 7) - 3));
      setGamesPlayedToday((prev) => prev + Math.floor(Math.random() * 3));
      setMemoryPlayers((prev) => Math.max(20, prev + Math.floor(Math.random() * 5) - 2));
      setSequencePlayers((prev) => Math.max(15, prev + Math.floor(Math.random() * 4) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleWaitlist = (gameKey) => {
    setWaitlistCounts((prev) => ({
      ...prev,
      [gameKey]: prev[gameKey] + 1,
    }));
  };

  const games = [
    {
      title: "Memory Match",
      description: "Find matching pairs and test your visual memory.",
      icon: "🃏",
      category: "Visual Memory",
      difficulty: "Easy",
      available: true,
      path: "/games/memory",
      livePlayers: memoryPlayers,
      color: "green",
    },
    {
      title: "Sequence Recall",
      description: "Remember a sequence of symbols and reproduce it in the correct order.",
      icon: "🧠",
      category: "Working Memory",
      difficulty: "Easy – Expert",
      available: true,
      path: "/games/sequence",
      livePlayers: sequencePlayers,
      color: "blue",
    },
    {
      title: "Attention Test",
      description: "Identify target symbols among distracting objects.",
      icon: "🎯",
      category: "Attention",
      difficulty: "Coming Soon",
      available: false,
      color: "orange",
      waitlistKey: "attention",
    },
    {
      title: "Pattern Completion",
      description: "Complete patterns and strengthen reasoning skills.",
      icon: "🧩",
      category: "Reasoning",
      difficulty: "Coming Soon",
      available: false,
      color: "purple",
      waitlistKey: "pattern",
    },
  ];

  return (
    <div className="games-page">
      {/* ================= HERO HEADER ================= */}
      <section className="games-header">
        <div className="games-header-badge">
          <span className="live-dot"></span>
          Cognitive Training
        </div>
        <h1>
          Cognitive <span>Games</span>
        </h1>
        <p>
          Choose an activity and challenge your memory, attention, and reasoning skills.
          Play in real time with others around the world.
        </p>

        {/* Live stats strip */}
        <div className="games-live-stats">
          <div className="live-stat-item">
            <div className="live-stat-value">{activePlayers}</div>
            <div className="live-stat-label">Online Now</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{gamesPlayedToday.toLocaleString()}</div>
            <div className="live-stat-label">Games Played Today</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{memoryPlayers}</div>
            <div className="live-stat-label">Playing Memory</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{sequencePlayers}</div>
            <div className="live-stat-label">Playing Sequence</div>
          </div>
        </div>
      </section>

      {/* ================= GAMES GRID ================= */}
      <section className="games-grid">
        {games.map((game) => (
          <div
            className={`game-card ${!game.available ? "game-card-disabled" : ""} ${game.available ? `active-${game.color}` : ""}`}
            key={game.title}
          >
            <div className="game-card-icon">{game.icon}</div>

            <div className="game-card-content">
              <div className="game-card-top">
                <span className="game-category">{game.category}</span>
                <span className={`game-status ${game.available ? "available" : "coming-soon"}`}>
                  {game.available ? "Available" : "Coming Soon"}
                </span>
              </div>

              <h2>{game.title}</h2>
              <p>{game.description}</p>

              {game.available ? (
                <div className="game-live-indicator">
                  <span className="pulse-dot"></span>
                  {game.livePlayers} players online
                </div>
              ) : null}

              <div className="game-card-footer">
                <span className="game-difficulty">🎚️ {game.difficulty}</span>

                {game.available ? (
                  <button className="play-game-btn" onClick={() => navigate(game.path)}>
                    Play Now →
                  </button>
                ) : (
                  <div className="waitlist-area">
                    <span className="waitlist-count">
                      {waitlistCounts[game.waitlistKey]} waiting
                    </span>
                    <button
                      className="waitlist-btn"
                      onClick={() => handleWaitlist(game.waitlistKey)}
                    >
                      Join Waitlist
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ================= INFO SECTION ================= */}
      <section className="games-info">
        <div className="games-info-icon">💡</div>
        <div>
          <h3>Train at your own pace</h3>
          <p>
            Start with simple exercises and gradually challenge yourself as your skills improve.
            Your performance will be tracked on the dashboard.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Games;