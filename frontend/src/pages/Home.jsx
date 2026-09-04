import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">

      <section className="hero">

        <div className="hero-content">

          <div className="brain-icon">
            🧠
          </div>

          <h1>
            Cognitive Gaming
          </h1>

          <h2>
            Train Your Mind Through Interactive Games
          </h2>

          <p>
            Play simple cognitive games designed to
            exercise memory, attention, reaction speed,
            and problem-solving skills.
          </p>

          <Link to="/games">
            <button className="primary-btn">
              Start Playing 🎮
            </button>
          </Link>

        </div>

      </section>

      <section className="features">

        <div className="feature-card">
          <div className="feature-icon">
            🃏
          </div>

          <h3>Memory</h3>

          <p>
            Test your visual memory by finding
            matching pairs.
          </p>
        </div>


        <div className="feature-card">
          <div className="feature-icon">
            🎯
          </div>

          <h3>Attention</h3>

          <p>
            Test your attention and response speed.
          </p>
        </div>


        <div className="feature-card">
          <div className="feature-icon">
            🧩
          </div>

          <h3>Reasoning</h3>

          <p>
            Solve patterns and cognitive challenges.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;