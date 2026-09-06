import { saveActivity } from "../../utils/recommender";
import { useState, useEffect } from "react";
import {
  getDifficultySettings,
  generateSequence,
  calculateAccuracy,
  calculateStars,
  calculateScore,
} from "./nbackLogic";
import "./nback.css";

function NBack() {
  const [difficulty, setDifficulty] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [n, setN] = useState(1);
  const [totalTrials, setTotalTrials] = useState(0);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [correctRejections, setCorrectRejections] = useState(0);
  const [falseAlarms, setFalseAlarms] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [times, setTimes] = useState([]);
  const [activePlayers, setActivePlayers] = useState(40);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => Math.max(20, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { n, trials, interval, multiplier } = getDifficultySettings(difficulty);
    setN(n);
    setTotalTrials(trials);
    const seq = generateSequence(trials + n); // extra for n-back buffer
    setSequence(seq);
    setCurrentIndex(n); // start at index n
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setHits(0);
    setMisses(0);
    setCorrectRejections(0);
    setFalseAlarms(0);
    setStars(0);
    setTimes([]);
    setAvgTime(0);
    setResponseTime(0);
    setFeedback(null);
    setIsProcessing(false);
    // start timer
    const startTime = Date.now();
    // we'll use a timer to progress trials
    if (intervalId) clearInterval(intervalId);
    const id = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + 1;
        if (next >= seq.length) {
          clearInterval(id);
          endGame();
          return prev;
        }
        return next;
      });
    }, interval);
    setIntervalId(id);
  };

  const handleResponse = (match) => {
    if (isProcessing || gameOver) return;
    if (currentIndex < n) return; // not enough history

    const currentSymbol = sequence[currentIndex];
    const prevSymbol = sequence[currentIndex - n];
    const isMatch = currentSymbol === prevSymbol;
    const correct = (match && isMatch) || (!match && !isMatch);

    const now = Date.now();
    // time since last response? We'll just record per trial
    // For simplicity, we'll compute average later
    setTimes(prev => [...prev, 100]); // placeholder

    if (match && isMatch) setHits(prev => prev + 1);
    else if (match && !isMatch) setFalseAlarms(prev => prev + 1);
    else if (!match && !isMatch) setCorrectRejections(prev => prev + 1);
    else if (!match && isMatch) setMisses(prev => prev + 1);

    setFeedback(correct ? '✅ Correct' : '❌ Wrong');
    setIsProcessing(true);
    setTimeout(() => {
      setFeedback(null);
      setIsProcessing(false);
    }, 400);
  };

  const endGame = () => {
    setGameOver(true);
      const username = localStorage.getItem("username");
      if (username) {
        saveActivity(username, "N‑Back", score || 0, accuracy || 0, stars || 0, difficulty || 1, responseTime || 0);
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
    if (intervalId) clearInterval(intervalId);
    const accuracy = calculateAccuracy(hits, misses, correctRejections, falseAlarms);
    const avg = times.length > 0 ? times.reduce((a,b) => a+b, 0) / times.length : 0;
    setAvgTime(avg);
    const { multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(accuracy, avg, multiplier);
    setScore(finalScore);
    setStars(calculateStars(accuracy, avg));
  };

  const accuracy = calculateAccuracy(hits, misses, correctRejections, falseAlarms);
  const currentSymbol = sequence[currentIndex] || '';
  const isMatch = (currentIndex >= n) && (sequence[currentIndex] === sequence[currentIndex - n]);

  return (
    <div className="game-container nback-game">
      <section className="nback-header">
        <div className="nback-badge"><span className="live-dot"></span>Live Working Memory Training</div>
        <h1>N-<span>Back</span></h1>
        <p>Does the current symbol match the one from {n} steps ago? React quickly and accurately.</p>
      </section>

      {gameStarted && !gameOver && (
        <div className="nback-live-stats">
          <div className="live-stat-item"><div className="live-stat-value">{activePlayers}</div><div className="live-stat-label">Playing Now</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{difficulty}</div><div className="live-stat-label">Difficulty</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{currentIndex - n + 1}/{totalTrials}</div><div className="live-stat-label">Trials</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{hits + correctRejections}</div><div className="live-stat-label">Correct</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{Math.round(accuracy)}%</div><div className="live-stat-label">Accuracy</div></div>
        </div>
      )}

      {!gameStarted && !gameOver && (
        <div className="nback-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>A sequence of letters appears one by one.</p>
            <p>Press <strong>"Match"</strong> if the current letter matches the one from <strong>{n}</strong> steps ago.</p>
            <p>Press <strong>"No Match"</strong> if it does not.</p>
          </div>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              <option value={1}>Level 1 — 1‑back</option>
              <option value={2}>Level 2 — 2‑back</option>
              <option value={3}>Level 3 — 2‑back (faster)</option>
              <option value={4}>Level 4 — 3‑back</option>
              <option value={5}>Level 5 — 3‑back (fast)</option>
            </select>
          </div>
          <button className="btn-primary" onClick={startGame}>Start Game 🧠</button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="nback-container">
          <div className="nback-progress">Trial {currentIndex - n + 1} of {totalTrials}</div>
          <div className="nback-stimulus">{currentSymbol}</div>
          {feedback && <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{feedback}</div>}
          <div className="nback-action-buttons">
            <button className="nback-action-btn" onClick={() => handleResponse(true)} disabled={isProcessing}>Match</button>
            <button className="nback-action-btn" onClick={() => handleResponse(false)} disabled={isProcessing}>No Match</button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="nback-result">
          <h2>{accuracy >= 80 ? "🎉 Excellent!" : accuracy >= 60 ? "👏 Good!" : "💪 Keep Practicing!"}</h2>
          <div className="stars-display">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          <div className="final-results">
            <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
            <div><span>Hits</span><strong>{hits}</strong></div>
            <div><span>Misses</span><strong>{misses}</strong></div>
            <div><span>Correct Rejections</span><strong>{correctRejections}</strong></div>
            <div><span>False Alarms</span><strong>{falseAlarms}</strong></div>
            <div><span>Score</span><strong>{score}</strong></div>
          </div>
          <button className="btn-primary" onClick={startGame}>Play Again 🔄</button>
        </div>
      )}
    </div>
  );
}

export default NBack;
