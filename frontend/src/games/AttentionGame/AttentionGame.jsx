import { saveGameResult } from "../../utils/api";
import { useState, useEffect } from "react";
import {
  getDifficultySettings,
  generateGrid,
  calculateAccuracy,
  calculateStars,
  calculateScore,
} from "./attentionLogic";
import "./attention.css";

function AttentionGame() {
  const [difficulty, setDifficulty] = useState(1);
  const [grid, setGrid] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [totalTargets, setTotalTargets] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [activePlayers, setActivePlayers] = useState(45);
  const [clickedItems, setClickedItems] = useState([]);

  // Live players simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers((prev) =>
        Math.max(25, prev + Math.floor(Math.random() * 6) - 3)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { gridSize, displayTime, targetCount } = getDifficultySettings(difficulty);
    const newGrid = generateGrid(gridSize, targetCount);
    setGrid(newGrid);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCorrectClicks(0);
    setWrongClicks(0);
    setTotalTargets(targetCount);
    setStars(0);
    setResponseTime(0);
    setClickedItems([]);
    setTimeRemaining(displayTime);
    setStartTime(Date.now());

    // Countdown timer
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 100) {
          clearInterval(interval);
          endGame();
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  };

  const endGame = () => {
    const endTime = Date.now();
    const timeTaken = startTime ? (endTime - startTime) : 0;
    setResponseTime(timeTaken);
    setGameOver(true);
          // TODO: Insert saveGameResult here with actual variables

    const accuracy = calculateAccuracy(correctClicks, totalTargets);
    const { multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(correctClicks, totalTargets, timeTaken, multiplier);
    setScore(finalScore);
    setStars(calculateStars(accuracy, timeTaken, 5000));
  };

  const handleGridClick = (item) => {
    if (gameOver) return;
    if (clickedItems.includes(item.id)) return;

    setClickedItems([...clickedItems, item.id]);

    if (item.isTarget) {
      setCorrectClicks(prev => prev + 1);
      
      // Check if all targets are found
      const totalFound = correctClicks + 1;
      if (totalFound === totalTargets) {
        endGame();
      }
    } else {
      setWrongClicks(prev => prev + 1);
    }
  };

  const accuracy = calculateAccuracy(correctClicks, totalTargets);
  const gridSize = getDifficultySettings(difficulty).gridSize;

  return (
    <div className="game-container attention-game">
      {/* ===== HEADER ===== */}
      <section className="attention-header">
        <div className="attention-badge">
          <span className="live-dot"></span>
          Live Attention Training
        </div>
        <h1>
          Target <span>Attention</span>
        </h1>
        <p>
          Find and click the odd symbols as quickly as possible.
          Test your attention and reaction time.
        </p>
      </section>

      {/* ===== LIVE STATS BAR ===== */}
      {gameStarted && !gameOver && (
        <div className="attention-live-stats">
          <div className="live-stat-item">
            <div className="live-stat-value">{activePlayers}</div>
            <div className="live-stat-label">Playing Now</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{difficulty}</div>
            <div className="live-stat-label">Difficulty</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{timeRemaining}ms</div>
            <div className="live-stat-label">Time Left</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{correctClicks}/{totalTargets}</div>
            <div className="live-stat-label">Targets Found</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{wrongClicks}</div>
            <div className="live-stat-label">Mistakes</div>
          </div>
        </div>
      )}

      {/* ===== START SCREEN ===== */}
      {!gameStarted && !gameOver && (
        <div className="attention-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>Find the odd symbol in the grid.</p>
            <p>Click on the different symbol as fast as you can.</p>
            <p>More targets appear on higher difficulties.</p>
          </div>

          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select
              id="difficulty-select"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
            >
              <option value={1}>Level 1 — Easy</option>
              <option value={2}>Level 2 — Medium</option>
              <option value={3}>Level 3 — Hard</option>
              <option value={4}>Level 4 — Very Hard</option>
              <option value={5}>Level 5 — Expert</option>
            </select>
          </div>

          <button className="btn-primary" onClick={startGame}>
            Start Game 🎯
          </button>
        </div>
      )}

      {/* ===== GAME PLAY ===== */}
      {gameStarted && !gameOver && (
        <div className="attention-grid-container">
          <h2>Find the Target{totalTargets > 1 ? 's' : ''}! 🎯</h2>
          <p>{totalTargets} target{totalTargets > 1 ? 's' : ''} hidden in the grid</p>

          <div 
            className="grid" 
            style={{ 
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              maxWidth: `${Math.min(500, gridSize * 70)}px`
            }}
          >
            {grid.map((item) => (
              <div
                key={item.id}
                className={`grid-item ${clickedItems.includes(item.id) ? (item.isTarget ? 'clicked-target' : 'clicked-wrong') : (item.isTarget ? 'target' : '')}`}
                onClick={() => handleGridClick(item)}
                style={{
                  background: clickedItems.includes(item.id) 
                    ? (item.isTarget ? '#f0fff4' : '#fff0f0')
                    : 'white',
                  borderColor: clickedItems.includes(item.id)
                    ? (item.isTarget ? '#2ecc71' : '#e74c3c')
                    : '#d0e0dc'
                }}
              >
                {item.color}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== GAME OVER ===== */}
      {gameOver && (
        <div className="attention-result">
          <h2>{accuracy >= 100 ? "🎉 Perfect!" : accuracy >= 70 ? "👏 Great Job!" : "💪 Keep Practicing!"}</h2>
          <div className="stars-display">
            {"⭐".repeat(stars)}
            {"☆".repeat(3 - stars)}
          </div>

          <div className="final-results">
            <div>
              <span>Accuracy</span>
              <strong>{accuracy}%</strong>
            </div>
            <div>
              <span>Targets Found</span>
              <strong>{correctClicks}/{totalTargets}</strong>
            </div>
            <div>
              <span>Mistakes</span>
              <strong>{wrongClicks}</strong>
            </div>
            <div>
              <span>Score</span>
              <strong>{score}</strong>
            </div>
            <div>
              <span>Response Time</span>
              <strong>{(responseTime / 1000).toFixed(1)}s</strong>
            </div>
          </div>

          <button className="btn-primary" onClick={startGame}>
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}

export default AttentionGame;
