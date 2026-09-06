import { saveActivity } from "../../utils/recommender";
import { useState, useEffect } from "react";
import {
  getDifficultySettings,
  generateGrid,
  calculateAccuracy,
  calculateStars,
  calculateScore,
} from "./visualSearchLogic";
import "./visualSearch.css";

function VisualSearch() {
  const [difficulty, setDifficulty] = useState(1);
  const [grid, setGrid] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [targetsFound, setTargetsFound] = useState(0);
  const [totalTargets, setTotalTargets] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [activePlayers, setActivePlayers] = useState(35);
  const [clickedItems, setClickedItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => Math.max(20, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { gridSize, targetCount, distractorRatio, timeLimit, multiplier } = getDifficultySettings(difficulty);
    const newGrid = generateGrid(gridSize, targetCount, distractorRatio);
    setGrid(newGrid);
    setTotalTargets(targetCount);
    setTargetsFound(0);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setStars(0);
    setClickedItems([]);
    setStartTime(Date.now());
    setTimeRemaining(timeLimit);

    // Countdown timer
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

  const endGame = () => {
    const endTime = Date.now();
    const timeTaken = startTime ? endTime - startTime : 0;
    setResponseTime(timeTaken);
    setGameOver(true);
      const username = localStorage.getItem("username");
      if (username) {
        saveActivity(username, "Visual Search", score || 0, accuracy || 0, stars || 0, difficulty || 1, responseTime || 0);
      }if (username) {
      }
      if (username) {
      }
      if (username) {
      }
      if (username) {
      }
      if (username) {
      }
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
      }
          // TODO: Insert saveGameResult here with actual variables
    setGameStarted(false);

    const accuracy = calculateAccuracy(targetsFound, totalTargets);
    const { timeLimit, multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(targetsFound, totalTargets, timeTaken, timeLimit, multiplier);
    setScore(finalScore);
    setStars(calculateStars(accuracy, timeTaken, timeLimit));
  };

  const handleGridClick = (item) => {
    if (gameOver) return;
    if (clickedItems.includes(item.id)) return;

    setClickedItems([...clickedItems, item.id]);

    if (item.isTarget) {
      setTargetsFound(prev => prev + 1);
      // Check if all targets found
      if (targetsFound + 1 === totalTargets) {
        endGame();
      }
    } else {
      // wrong click – just record but no penalty for now
    }
  };

  const accuracy = calculateAccuracy(targetsFound, totalTargets);
  const gridSize = Math.sqrt(grid.length);

  return (
    <div className="game-container visualsearch-game">
      <section className="visualsearch-header">
        <div className="visualsearch-badge"><span className="live-dot"></span>Live Visual Search</div>
        <h1>Visual <span>Search</span></h1>
        <p>Find the target symbols among distractors as quickly as possible.</p>
      </section>

      {gameStarted && !gameOver && (
        <div className="visualsearch-live-stats">
          <div className="live-stat-item"><div className="live-stat-value">{activePlayers}</div><div className="live-stat-label">Playing Now</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{difficulty}</div><div className="live-stat-label">Difficulty</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{targetsFound}/{totalTargets}</div><div className="live-stat-label">Targets Found</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{Math.round(timeRemaining/1000)}s</div><div className="live-stat-label">Time Left</div></div>
        </div>
      )}

      {!gameStarted && !gameOver && (
        <div className="visualsearch-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>A grid of symbols appears.</p>
            <p>Find and click all the <strong>target</strong> symbols.</p>
            <p>Targets are the same symbol; distractors are different.</p>
            <p>Work quickly – time is limited!</p>
          </div>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              <option value={1}>Level 1 — Easy</option>
              <option value={2}>Level 2 — Medium</option>
              <option value={3}>Level 3 — Hard</option>
              <option value={4}>Level 4 — Very Hard</option>
              <option value={5}>Level 5 — Expert</option>
            </select>
          </div>
          <button className="btn-primary" onClick={startGame}>Start Game 🔍</button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="visualsearch-container">
          <h2>Find All Targets</h2>
          <p style={{ color: '#4d6a6a' }}>Click on the target symbols (the ones that match each other)</p>
          <div 
            className="visualsearch-grid" 
            style={{ 
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              maxWidth: `${Math.min(500, gridSize * 70)}px`
            }}
          >
            {grid.map((item) => (
              <div
                key={item.id}
                className="grid-item"
                onClick={() => handleGridClick(item)}
                style={{
                  opacity: clickedItems.includes(item.id) ? 0.7 : 1,
                  borderColor: clickedItems.includes(item.id) ? (item.isTarget ? '#2ecc71' : '#e74c3c') : '#d0e0dc',
                  background: clickedItems.includes(item.id) ? (item.isTarget ? '#f0fff4' : '#fff0f0') : 'white',
                }}
                disabled={gameOver || clickedItems.includes(item.id)}
              >
                {item.symbol}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="visualsearch-result">
          <h2>{accuracy >= 100 ? "🎉 Perfect!" : accuracy >= 70 ? "👏 Great Job!" : "💪 Keep Practicing!"}</h2>
          <div className="stars-display">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          <div className="final-results">
            <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
            <div><span>Targets Found</span><strong>{targetsFound}/{totalTargets}</strong></div>
            <div><span>Response Time</span><strong>{(responseTime / 1000).toFixed(1)}s</strong></div>
            <div><span>Score</span><strong>{score}</strong></div>
          </div>
          <button className="btn-primary" onClick={startGame}>Play Again 🔄</button>
        </div>
      )}
    </div>
  );
}

export default VisualSearch;
