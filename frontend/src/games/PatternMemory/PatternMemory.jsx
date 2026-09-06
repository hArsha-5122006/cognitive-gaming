import { saveActivity } from "../../utils/recommender";
import { useState, useEffect } from "react";
import { getDifficultySettings, generateSequence, calculateAccuracy, calculateStars, calculateScore } from "./patternMemoryLogic";
import "./patternMemory.css";

function PatternMemory() {
  const [difficulty, setDifficulty] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [maxLevel, setMaxLevel] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [activePlayers, setActivePlayers] = useState(32);
  const [sequence, setSequence] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [phase, setPhase] = useState('display'); // display | recall | result
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashIndex, setFlashIndex] = useState(-1);
  const [gameMessage, setGameMessage] = useState('');
  const [colors] = useState(['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22']);
  const colorSymbols = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { initialLength, maxLength, interval, multiplier } = getDifficultySettings(difficulty);
    setCurrentLevel(initialLength);
    setSequence([]);
    setUserIndex(0);
    setPhase('display');
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCorrectCount(0);
    setTotalAttempts(0);
    setStars(0);
    setMaxLevel(0);
    setStartTime(Date.now());
    setGameMessage('');
    // Generate first sequence
    const newSeq = generateSequence(initialLength);
    setSequence(newSeq);
    // Start flashing
    playSequence(newSeq, 0);
  };

  const playSequence = (seq, idx) => {
    if (idx >= seq.length) {
      setPhase('recall');
      setUserIndex(0);
      setGameMessage('Your turn!');
      return;
    }
    setFlashIndex(seq[idx]);
    setIsFlashing(true);
    setTimeout(() => {
      setFlashIndex(-1);
      setIsFlashing(false);
      setTimeout(() => {
        playSequence(seq, idx + 1);
      }, 300);
    }, 500);
  };

  const handleColorClick = (colorIndex) => {
    if (phase !== 'recall') return;
    if (userIndex >= sequence.length) return;
    // Check if correct
    if (colorIndex === sequence[userIndex]) {
      const newUserIndex = userIndex + 1;
      setUserIndex(newUserIndex);
      if (newUserIndex === sequence.length) {
        // Correctly recalled entire sequence
        setCorrectCount(prev => prev + 1);
        setTotalAttempts(prev => prev + 1);
        setMaxLevel(prev => Math.max(prev, currentLevel));
        // Move to next level
        const nextLevel = currentLevel + 1;
        const { maxLength, interval, multiplier } = getDifficultySettings(difficulty);
        if (nextLevel > maxLength) {
          // Max level reached
          setGameMessage('🎉 You reached the max level!');
          endGame();
        } else {
          setCurrentLevel(nextLevel);
          const newSeq = generateSequence(nextLevel);
          setSequence(newSeq);
          setPhase('display');
          setUserIndex(0);
          setGameMessage(`Level ${nextLevel}!`);
          playSequence(newSeq, 0);
        }
      } else {
        // Still more to recall
        setGameMessage(`Recalled ${newUserIndex}/${sequence.length}`);
      }
    } else {
      // Wrong color clicked
      setTotalAttempts(prev => prev + 1);
      setGameMessage('❌ Wrong!');
      endGame();
    }
  };

  const endGame = () => {
    const totalTime = Date.now() - startTime;
    setResponseTime(totalTime);
    const accuracy = calculateAccuracy(correctCount, totalAttempts);
    const { multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(accuracy, maxLevel, multiplier);
    setScore(finalScore);
    setStars(calculateStars(accuracy, maxLevel));
    setGameOver(true);
      const username = localStorage.getItem("username");
      if (username) {
        saveActivity(username, "Pattern Memory", score || 0, accuracy || 0, stars || 0, difficulty || 1, responseTime || 0);
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
  };

  const accuracy = calculateAccuracy(correctCount, totalAttempts);

  return (
    <div className="game-container patternmemory-game">
      <section className="patternmemory-header">
        <div className="patternmemory-badge"><span className="live-dot"></span>Live Visual Memory Training</div>
        <h1>Pattern <span>Memory</span></h1>
        <p>Watch the flashing pattern and repeat it. Each correct round adds one more step.</p>
      </section>
      {gameStarted && !gameOver && (
        <div className="patternmemory-live-stats">
          <div className="live-stat-item"><div className="live-stat-value">{activePlayers}</div><div className="live-stat-label">Playing Now</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{difficulty}</div><div className="live-stat-label">Difficulty</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{sequence.length}</div><div className="live-stat-label">Sequence Length</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{correctCount}</div><div className="live-stat-label">Correct</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{Math.round(accuracy)}%</div><div className="live-stat-label">Accuracy</div></div>
        </div>
      )}
      {!gameStarted && !gameOver && (
        <div className="patternmemory-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>Watch the pattern of colors flash.</p>
            <p>After it stops, repeat the pattern by clicking the colors in the same order.</p>
            <p>Each correct round adds one more step to the pattern.</p>
          </div>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              <option value={1}>Level 1 — Start with 3, max 8</option>
              <option value={2}>Level 2 — Start with 4, max 10</option>
              <option value={3}>Level 3 — Start with 5, max 12</option>
              <option value={4}>Level 4 — Start with 6, max 14</option>
              <option value={5}>Level 5 — Start with 7, max 16</option>
            </select>
          </div>
          <button className="btn-primary" onClick={startGame}>Start Game 💡</button>
        </div>
      )}
      {gameStarted && !gameOver && (
        <div className="patternmemory-container">
          <div style={{ marginBottom: '10px', fontWeight: '600', color: '#1a5c4e' }}>{gameMessage}</div>
          <div className="patternmemory-grid">
            {colors.map((color, idx) => (
              <button
                key={idx}
                style={{
                  background: flashIndex === idx ? '#fff' : color,
                  borderColor: flashIndex === idx ? '#2d7d6a' : '#d0e0dc',
                  opacity: flashIndex === idx ? 1 : 0.8,
                }}
                onClick={() => handleColorClick(idx)}
                disabled={phase !== 'recall' || flashIndex !== -1}
              >
                {colorSymbols[idx]}
              </button>
            ))}
          </div>
        </div>
      )}
      {gameOver && (
        <div className="patternmemory-result">
          <h2>{accuracy >= 80 ? "🎉 Excellent!" : accuracy >= 60 ? "👏 Good!" : "💪 Keep Practicing!"}</h2>
          <div className="stars-display">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          <div className="final-results">
            <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
            <div><span>Correct Sequences</span><strong>{correctCount}/{totalAttempts}</strong></div>
            <div><span>Max Length</span><strong>{maxLevel}</strong></div>
            <div><span>Score</span><strong>{score}</strong></div>
            <div><span>Total Time</span><strong>{(responseTime / 1000).toFixed(1)}s</strong></div>
          </div>
          <button className="btn-primary" onClick={startGame}>Play Again 🔄</button>
        </div>
      )}
    </div>
  );
}
export default PatternMemory;
