import { useState, useEffect } from "react";
import {
  generateSequence,
  countCorrectPositions,
  calculateAccuracy,
  calculateScore,
  getDifficultySettings,
  calculateStars,
  symbolCategories,
} from "./sequenceLogic";
import "./sequence.css";

function SequenceRecall() {
  const [difficulty, setDifficulty] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSequence, setShowSequence] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctPositions, setCorrectPositions] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [startRecallTime, setStartRecallTime] = useState(null);
  const [activePlayers, setActivePlayers] = useState(37);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers((prev) =>
        Math.max(20, prev + Math.floor(Math.random() * 5) - 2)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameStarted && !showSequence && !gameOver) {
      setStartRecallTime(Date.now());
    }
  }, [gameStarted, showSequence, gameOver]);

  const startGame = () => {
    const { length, displayTime } = getDifficultySettings(difficulty);
    const newSequence = generateSequence(length);
    setSequence(newSequence);
    setUserSequence([]);
    setCorrectPositions(0);
    setMistakes(0);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setShowSequence(true);
    setResponseTime(0);
    setStars(0);

    setTimeout(() => {
      setShowSequence(false);
    }, displayTime);
  };

  const handleSymbolClick = (symbol) => {
    if (showSequence || gameOver) return;
    if (userSequence.length >= sequence.length) return;

    const newUserSequence = [...userSequence, symbol];
    setUserSequence(newUserSequence);

    if (newUserSequence.length === sequence.length) {
      const endTime = Date.now();
      const timeTaken = startRecallTime ? endTime - startRecallTime : 0;
      setResponseTime(timeTaken);

      const correct = countCorrectPositions(sequence, newUserSequence);
      const wrong = sequence.length - correct;
      const { displayTime, multiplier } = getDifficultySettings(difficulty);

      const newScore = calculateScore(correct, sequence.length, wrong, {
        displayTime,
        responseTime: timeTaken,
        streak,
        difficultyMultiplier: multiplier,
      });

      setCorrectPositions(correct);
      setMistakes(wrong);
      setScore(newScore);

      const acc = calculateAccuracy(correct, sequence.length);
      setStars(calculateStars(acc));

      if (correct === sequence.length) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(0);
      }

      setGameOver(true);
    }
  };

  const accuracy = calculateAccuracy(correctPositions, sequence.length);

  return (
    <div className="sequence-game">
      <section className="sequence-header">
        <div className="sequence-badge">
          <span className="live-dot"></span>
          Live Sequence Training
        </div>
        <h1>
          Sequence <span>Recall</span>
        </h1>
        <p>
          Remember the exact order of symbols and reproduce the sequence.
          Improve your working memory and concentration.
        </p>
      </section>

      {gameStarted && !gameOver && (
        <div className="sequence-live-stats">
          <div className="live-stat-item">
            <div className="live-stat-value">{activePlayers}</div>
            <div className="live-stat-label">Playing Now</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{difficulty}</div>
            <div className="live-stat-label">Difficulty</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{sequence.length}</div>
            <div className="live-stat-label">Sequence Length</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{streak}</div>
            <div className="live-stat-label">Streak</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{score}</div>
            <div className="live-stat-label">Current Score</div>
          </div>
        </div>
      )}

      {!gameStarted && !gameOver && (
        <div className="sequence-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>A sequence of symbols will appear.</p>
            <p>Remember the exact order.</p>
            <p>After it disappears, click the symbols in the same order.</p>
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

          <button className="primary-btn" onClick={startGame}>
            Start Game 🎮
          </button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="sequence-content">
          {showSequence ? (
            <div className="sequence-display">
              <h2>Remember This Sequence</h2>
              <div className="sequence-symbols">
                {sequence.map((symbol, index) => (
                  <div className="sequence-symbol" key={index}>
                    {symbol}
                  </div>
                ))}
              </div>
              <p>Memorize the order!</p>
            </div>
          ) : (
            <div className="recall-section">
              <h2>Recreate the Sequence</h2>
              <p>Click the symbols in the correct order.</p>

              <div className="user-sequence">
                {userSequence.length === 0 ? (
                  <span className="sequence-placeholder">
                    Your sequence will appear here
                  </span>
                ) : (
                  userSequence.map((symbol, index) => (
                    <div className="selected-symbol" key={index}>
                      {symbol}
                    </div>
                  ))
                )}
              </div>

              <div className="symbol-grid">
                {symbolCategories.fruits.map((symbol) => (
                  <button
                    key={symbol}
                    className="symbol-button"
                    onClick={() => handleSymbolClick(symbol)}
                    disabled={userSequence.length >= sequence.length}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {gameOver && (
        <div className="sequence-result">
          <h2>{accuracy === 100 ? "🎉 Perfect!" : "👏 Good Try!"}</h2>
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
              <span>Correct Positions</span>
              <strong>{correctPositions}</strong>
            </div>
            <div>
              <span>Mistakes</span>
              <strong>{mistakes}</strong>
            </div>
            <div>
              <span>Score</span>
              <strong>{score}</strong>
            </div>
            <div>
              <span>Response Time</span>
              <strong>{(responseTime / 1000).toFixed(1)}s</strong>
            </div>
            <div>
              <span>Streak</span>
              <strong>{streak}</strong>
            </div>
          </div>

          <button className="primary-btn" onClick={startGame}>
            Play Again 🔄
          </button>
        </div>
      )}

      <section className="recent-winners">
        <h2>🏆 Recent High Scores</h2>
        <div className="winners-feed">
          <div className="winner-row">
            <span className="winner-avatar">A</span>
            <span className="winner-info">
              <strong>Alex</strong> scored 1250 on Level 4
            </span>
            <span className="winner-time">2 min ago</span>
          </div>
          <div className="winner-row">
            <span className="winner-avatar">S</span>
            <span className="winner-info">
              <strong>Sam</strong> scored 980 on Level 3
            </span>
            <span className="winner-time">5 min ago</span>
          </div>
          <div className="winner-row">
            <span className="winner-avatar">J</span>
            <span className="winner-info">
              <strong>Jordan</strong> scored 1120 on Level 4
            </span>
            <span className="winner-time">12 min ago</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SequenceRecall;
