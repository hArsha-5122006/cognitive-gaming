import { saveActivity } from "../../utils/recommender";
import { useState, useEffect } from "react";
import { getDifficultySettings, generateTrial, calculateAccuracy, calculateStars, calculateScore } from "./mentalRotationLogic";
import "./mentalRotation.css";

function MentalRotation() {
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
  const [activePlayers, setActivePlayers] = useState(25);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentTrial, setCurrentTrial] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { targets, angleDelta, timeLimit, multiplier } = getDifficultySettings(difficulty);
    setTotalTrials(targets);
    const generated = [];
    for (let i = 0; i < targets; i++) {
      generated.push(generateTrial(angleDelta));
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

  const handleOptionClick = (option) => {
    if (isProcessing || gameOver) return;
    if (selectedOption !== null) return;
    const now = Date.now();
    const timeTaken = trialStartTime ? now - trialStartTime : 0;
    setTimes(prev => [...prev, timeTaken]);
    const isCorrect = option === currentTrial.targetRotation;
    setSelectedOption(option);
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
      const username = localStorage.getItem("username");
      if (username) {
        saveActivity(username, "Mental Rotation", score || 0, accuracy || 0, stars || 0, difficulty || 1, responseTime || 0);
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
  const accuracy = calculateAccuracy(correctCount, attempts);

  return (
    <div className="game-container mentalrotation-game">
      <section className="mentalrotation-header">
        <div className="mentalrotation-badge"><span className="live-dot"></span>Live Spatial Training</div>
        <h1>Mental <span>Rotation</span></h1>
        <p>Identify the rotated version of the shape. Train your spatial reasoning.</p>
      </section>
      {gameStarted && !gameOver && (
        <div className="mentalrotation-live-stats">
          <div className="live-stat-item"><div className="live-stat-value">{activePlayers}</div><div className="live-stat-label">Playing Now</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{difficulty}</div><div className="live-stat-label">Difficulty</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{currentIndex}/{totalTrials}</div><div className="live-stat-label">Trials</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{correctCount}</div><div className="live-stat-label">Correct</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{Math.round(accuracy)}%</div><div className="live-stat-label">Accuracy</div></div>
        </div>
      )}
      {!gameStarted && !gameOver && (
        <div className="mentalrotation-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>You see a shape in a specific orientation.</p>
            <p>Choose the matching rotated version.</p>
            <p>Mental rotation is key for spatial intelligence.</p>
          </div>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              <option value={1}>Level 1 — 45° difference</option>
              <option value={2}>Level 2 — 60°</option>
              <option value={3}>Level 3 — 90°</option>
              <option value={4}>Level 4 — 135°</option>
              <option value={5}>Level 5 — 180°</option>
            </select>
          </div>
          <button className="btn-primary" onClick={startGame}>Start Game 🔄</button>
        </div>
      )}
      {gameStarted && !gameOver && currentTrial && (
        <div className="mentalrotation-container">
          <div style={{ marginBottom: '10px', color: '#3d5a5a' }}>Which one matches the rotation?</div>
          <div className="rotation-display" style={{ transform: `rotate(${currentTrial.rotation}deg)` }}>
            {currentTrial.shape}
          </div>
          <div className="rotation-options">
            {currentTrial.options.map((angle) => (
              <button
                key={angle}
                className={`rotation-btn ${selectedOption !== null ? (angle === currentTrial.targetRotation ? 'correct' : (selectedOption === angle ? 'wrong' : '')) : ''}`}
                onClick={() => handleOptionClick(angle)}
                disabled={selectedOption !== null || isProcessing}
              >
                <span style={{ display: 'inline-block', transform: `rotate(${angle}deg)` }}>{currentTrial.shape}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {gameOver && (
        <div className="mentalrotation-result">
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
export default MentalRotation;
