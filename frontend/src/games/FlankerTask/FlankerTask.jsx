import { saveGameResult } from "../../utils/api";
import { useState, useEffect } from "react";
import { getDifficultySettings, generateTrial, calculateAccuracy, calculateStars, calculateScore } from "./flankerLogic";
import "./flanker.css";

function FlankerTask() {
  const [difficulty, setDifficulty] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [trials, setTrials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalTrials, setTotalTrials] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [trialStartTime, setTrialStartTime] = useState(null);
  const [times, setTimes] = useState([]);
  const [activePlayers, setActivePlayers] = useState(35);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentTrial, setCurrentTrial] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => Math.max(20, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { trials: numTrials, congruentRatio, timeLimit, multiplier } = getDifficultySettings(difficulty);
    setTotalTrials(numTrials);
    const generated = [];
    for (let i = 0; i < numTrials; i++) {
      generated.push(generateTrial(congruentRatio));
    }
    setTrials(generated);
    setCurrentIndex(0);
    setCurrentTrial(generated[0]);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCorrectCount(0);
    setAttempts(0);
    setStars(0);
    setTimes([]);
    setAvgTime(0);
    setResponseTime(0);
    setSelectedOption(null);
    setIsProcessing(false);
    setStartTime(Date.now());
    setTrialStartTime(Date.now());
  };

  const handleResponse = (response) => {
    if (isProcessing || gameOver) return;
    if (selectedOption !== null) return;
    const now = Date.now();
    const timeTaken = trialStartTime ? now - trialStartTime : 0;
    setTimes(prev => [...prev, timeTaken]);
    const isCorrect = response === currentTrial.correctResponse;
    setSelectedOption(response);
    setAttempts(prev => prev + 1);
    if (isCorrect) setCorrectCount(prev => prev + 1);
    setIsProcessing(true);
    setTimeout(() => {
      setSelectedOption(null);
      const nextIndex = currentIndex + 1;
      if (nextIndex >= totalTrials) endGame();
      else {
        setCurrentIndex(nextIndex);
        setCurrentTrial(trials[nextIndex]);
        setTrialStartTime(Date.now());
        setIsProcessing(false);
      }
    }, 500);
  };

  const endGame = () => {
    const totalTime = Date.now() - startTime;
    setResponseTime(totalTime);
    const avg = times.length > 0 ? times.reduce((a,b) => a+b, 0) / times.length : 0;
    setAvgTime(avg);
    const accuracy = calculateAccuracy(correctCount, attempts);
    const { multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(accuracy, avg, multiplier);
    setScore(finalScore);
    setStars(calculateStars(accuracy, avg));
    setGameOver(true);
          // TODO: Insert saveGameResult here with actual variables
    setGameStarted(false);
  };
  const accuracy = calculateAccuracy(correctCount, attempts);

  return (
    <div className="game-container flanker-game">
      <section className="flanker-header">
        <div className="flanker-badge"><span className="live-dot"></span>Live Inhibitory Control Training</div>
        <h1>Flanker <span>Task</span></h1>
        <p>Ignore the flanking arrows and respond to the direction of the central arrow.</p>
      </section>
      {gameStarted && !gameOver && (
        <div className="flanker-live-stats">
          <div className="live-stat-item"><div className="live-stat-value">{activePlayers}</div><div className="live-stat-label">Playing Now</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{difficulty}</div><div className="live-stat-label">Difficulty</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{currentIndex}/{totalTrials}</div><div className="live-stat-label">Trials</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{correctCount}</div><div className="live-stat-label">Correct</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{Math.round(accuracy)}%</div><div className="live-stat-label">Accuracy</div></div>
        </div>
      )}
      {!gameStarted && !gameOver && (
        <div className="flanker-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>You see a row of arrows: ← ← → ← ←</p>
            <p>Respond to the direction of the <strong>center</strong> arrow.</p>
            <p>Ignore the flanking arrows on the sides.</p>
          </div>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              <option value={1}>Level 1 — 50% congruent</option>
              <option value={2}>Level 2 — 40% congruent</option>
              <option value={3}>Level 3 — 30% congruent</option>
              <option value={4}>Level 4 — 20% congruent</option>
              <option value={5}>Level 5 — 10% congruent</option>
            </select>
          </div>
          <button className="btn-primary" onClick={startGame}>Start Game 🎯</button>
        </div>
      )}
      {gameStarted && !gameOver && currentTrial && (
        <div className="flanker-container">
          <div className="flanker-stimulus">
            {currentTrial.display.map((arrow, i) => (
              <span key={i}>{arrow}</span>
            ))}
          </div>
          <p style={{ color: '#4d6a6a' }}>Which direction is the center arrow pointing?</p>
          <div className="flanker-buttons">
            <button
              className={`flanker-btn ${selectedOption !== null ? (selectedOption === 'left' ? (currentTrial.correctResponse === 'left' ? 'correct' : 'wrong') : '') : ''}`}
              onClick={() => handleResponse('left')}
              disabled={selectedOption !== null || isProcessing}
            >
              ←
            </button>
            <button
              className={`flanker-btn ${selectedOption !== null ? (selectedOption === 'right' ? (currentTrial.correctResponse === 'right' ? 'correct' : 'wrong') : '') : ''}`}
              onClick={() => handleResponse('right')}
              disabled={selectedOption !== null || isProcessing}
            >
              →
            </button>
          </div>
          {currentTrial.isCongruent && <div style={{ marginTop: '10px', color: '#2ecc71' }}>✅ Congruent</div>}
          {!currentTrial.isCongruent && <div style={{ marginTop: '10px', color: '#e74c3c' }}>⚠️ Incongruent</div>}
        </div>
      )}
      {gameOver && (
        <div className="flanker-result">
          <h2>{accuracy >= 80 ? "🎉 Excellent!" : accuracy >= 60 ? "👏 Good!" : "💪 Keep Practicing!"}</h2>
          <div className="stars-display">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          <div className="final-results">
            <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
            <div><span>Correct</span><strong>{correctCount}/{attempts}</strong></div>
            <div><span>Avg Reaction</span><strong>{(avgTime / 1000).toFixed(2)}s</strong></div>
            <div><span>Score</span><strong>{score}</strong></div>
            <div><span>Total Time</span><strong>{(responseTime / 1000).toFixed(1)}s</strong></div>
          </div>
          <button className="btn-primary" onClick={startGame}>Play Again 🔄</button>
        </div>
      )}
    </div>
  );
}
export default FlankerTask;
