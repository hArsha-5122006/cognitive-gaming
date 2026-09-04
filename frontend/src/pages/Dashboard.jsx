function Dashboard() {
  return (
    <div className="page">

      <h1>
        📊 Cognitive Dashboard
      </h1>

      <p className="subtitle">
        Track your cognitive game performance.
      </p>


      <div className="stats-grid">

        <div className="stat-card">

          <h3>
            Average Score
          </h3>

          <p>
            820
          </p>

        </div>


        <div className="stat-card">

          <h3>
            Accuracy
          </h3>

          <p>
            85%
          </p>

        </div>


        <div className="stat-card">

          <h3>
            Mistakes
          </h3>

          <p>
            3
          </p>

        </div>


        <div className="stat-card">

          <h3>
            Best Time
          </h3>

          <p>
            42s
          </p>

        </div>

      </div>


      <div className="recommendation">

        <h2>
          🤖 AI Recommendation
        </h2>

        <p>
          Your memory game performance is improving.
        </p>

        <strong>
          Recommended next level: Level 2
        </strong>

      </div>

    </div>
  );
}

export default Dashboard;