import { saveGameResult } from "../../utils/api";
import { useState, useEffect } from "react";
import {
  getDifficultySettings,
  generatePoints,
  shufflePositions,
  calculateAccuracy,
  calculateStars,
  calculateScore,
} from "./trailMakingLogic";
import "./trailMaking.css";

function TrailMaking() {
  const [difficulty, setDifficulty] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [activePlayers, setActivePlayers] = useState(28);
  const [gridCols, setGridCols] = useState(5);
  const [gridRows, setGridRows] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { points: numPoints, mixed, timeLimit, multiplier } = getDifficultySettings(difficulty);
    // Use a grid that fits the points
    const total = Math.min(numPoints + 2, 25);
    const cols = Math.ceil(Math.sqrt(total));
    const rows = Math.ceil(total / cols);
    setGridCols(cols);
    setGridRows(rows);

    const rawPoints = generatePoints(numPoints, mixed);
    const shuffled = shufflePositions(rawPoints, cols, rows);
    setPoints(shuffled);
    setCurrentIndex(0);
    setErrors(0);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setAccuracy(0);
    setStars(0);
    setResponseTime(0);
    setStartTime(Date.now());
    setTimeRemaining(timeLimit);

    // Timer
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 100) {
          clearInterval(interval);
          endGame();
          return 0;
        }
        return prev - 100;
      });
    }, 100);
  };

  const handlePointClick = (point) => {
    if (gameOver) return;
    if (!gameStarted) return;
    // Check if this is the expected point
    if (point.id === points[currentIndex].id) {
      // Correct
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (nextIndex >= points.length) {
        // All points connected
        endGame();
      }
    } else {
      // Error – clicked wrong point
      setErrors(prev => prev + 1);
    }
  };

  const endGame = () => {
    const endTime = Date.now();
    const timeTaken = startTime ? endTime - startTime : 0;
    setResponseTime(timeTaken);
    setGameOver(true);
          // TODO: Insert saveGameResult here with actual variables
    setGameStarted(false);

    const totalPoints = points.length;
    const acc = calculateAccuracy(errors, totalPoints);
    setAccuracy(acc);
    const { timeLimit, multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(acc, timeTaken, timeLimit, multiplier);
    setScore(finalScore);
    setStars(calculateStars(acc, timeTaken, timeLimit));
  };

  // Helper to get grid style
  const gridStyle = {
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
    maxWidth: `${Math.min(500, gridCols * 70)}px`,
    margin: '0 auto'
  };

  return (
    <div className="game-container trailmaking-game">
      <section className="trailmaking-header">
        <div className="trailmaking-badge"><span className="live-dot"></span>Live Attention Training</div>
        <h1>Trail <span>Making</span></h1>
        <p>Connect the dots in order. Switch between numbers and letters. Speed and accuracy matter.</p>
      </section>

      {gameStarted && !gameOver && (
        <div className="trailmaking-live-stats">
          <div className="live-stat-item"><div className="live-stat-value">{activePlayers}</div><div className="live-stat-label">Playing Now</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{difficulty}</div><div className="live-stat-label">Difficulty</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{currentIndex}/{points.length}</div><div className="live-stat-label">Connections</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{errors}</div><div className="live-stat-label">Errors</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{Math.round(timeRemaining/1000)}s</div><div className="live-stat-label">Time Left</div></div>
        </div>
      )}

      {!gameStarted && !gameOver && (
        <div className="trailmaking-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>Click the points in the correct order.</p>
            <p>For numbers-only: 1 → 2 → 3 → …</p>
            <p>For mixed: 1 → A → 2 → B → 3 → C → …</p>
            <p>Be fast and accurate!</p>
          </div>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              <option value={1}>Level 1 — Numbers only (8)</option>
              <option value={2}>Level 2 — Numbers only (12)</option>
              <option value={3}>Level 3 — Mixed (16)</option>
              <option value={4}>Level 4 — Mixed (20)</option>
              <option value={5}>Level 5 — Mixed (24, fast)</option>
            </select>
          </div>
          <button className="btn-primary" onClick={startGame}>Start Game 🔗</button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="trailmaking-container">
          <h2>Connect the Dots</h2>
          <p style={{ color: '#4d6a6a' }}>Click in order: {points.map((p, i) => p.label + (i < points.length-1 ? ' → ' : ''))}</p>
          <div className="trailmaking-grid" style={gridStyle}>
            {points.map((point) => {
              const index = points.indexOf(point);
              let className = 'trail-point';
              if (index < currentIndex) className += ' visited';
              else if (index === currentIndex) className += ' current';
              return (
                <div
                  key={point.id}
                  className={className}
                  onClick={() => handlePointClick(point)}
                  style={{
                    borderColor: index < currentIndex ? '#2ecc71' : (index === currentIndex ? '#2d7d6a' : '#d0e0dc'),
                    background: index < currentIndex ? '#f0fff4' : (index === currentIndex ? '#e0f0ea' : 'white'),
                  }}
                >
                  {point.label}
                  {point.type === 'letter' && <span className="point-type"> (letter)</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="trailmaking-result">
          <h2>{accuracy >= 80 ? "🎉 Excellent!" : accuracy >= 60 ? "👏 Good!" : "💪 Keep Practicing!"}</h2>
          <div className="stars-display">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          <div className="final-results">
            <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
            <div><span>Errors</span><strong>{errors}</strong></div>
            <div><span>Connections</span><strong>{currentIndex}/{points.length}</strong></div>
            <div><span>Time</span><strong>{(responseTime / 1000).toFixed(1)}s</strong></div>
            <div><span>Score</span><strong>{score}</strong></div>
          </div>
          <button className="btn-primary" onClick={startGame}>Play Again 🔄</button>
        </div>
      )}
    </div>
  );
}

export default TrailMaking;
