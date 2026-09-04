import { Link } from "react-router-dom";

function Games() {
  return (
    <div className="page">

      <h1>🎮 Cognitive Games</h1>

      <p className="subtitle">
        Choose a game and start your cognitive training session.
      </p>


      <div className="games-grid">

        {/* Memory Game */}

        <div className="game-card">

          <div className="game-icon">
            🃏
          </div>

          <h2>
            Memory Match
          </h2>

          <p>
            Find matching pairs of cards and
            test your visual memory.
          </p>

          <div className="game-info">
            <strong>
              Cognitive Area:
            </strong>

            <span>
              Memory
            </span>
          </div>

          <Link to="/games/memory">

            <button className="primary-btn">
              Play Game
            </button>

          </Link>

        </div>


        {/* Sequence Game */}

        <div className="game-card coming-soon">

          <div className="game-icon">
            🔢
          </div>

          <h2>
            Sequence Recall
          </h2>

          <p>
            Remember and reproduce a sequence
            of objects.
          </p>

          <button
            className="secondary-btn"
            disabled
          >
            Coming Soon
          </button>

        </div>


        {/* Attention Game */}

        <div className="game-card coming-soon">

          <div className="game-icon">
            🎯
          </div>

          <h2>
            Attention Test
          </h2>

          <p>
            Identify targets quickly and
            accurately.
          </p>

          <button
            className="secondary-btn"
            disabled
          >
            Coming Soon
          </button>

        </div>

      </div>

    </div>
  );
}

export default Games;