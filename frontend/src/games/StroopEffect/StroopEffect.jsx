import { saveGameResult } from "../../utils/api";
import { useState, useEffect } from "react";
import {
  colors,
  getDifficultySettings,
  generateTrial,
  calculateAccuracy,
  calculateStars,
  calculateScore,
} from "./stroopLogic";
import "./stroop.css";

function StroopEffect() {
  const [difficulty, setDifficulty] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [trialIndex, setTrialIndex] = useState(0);
  const [totalTrials, setTotalTrials] = useState(0);
  const [currentTrial, setCurrentTrial] = useState(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [trialStartTime, setTrialStartTime] = useState(null);
  const [times, setTimes] = useState([]);
  const [activePlayers, setActivePlayers] = useState(38);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers((prev) =>
        Math.max(20, prev + Math.floor(Math.random() * 5) - 2)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { trials } = getDifficultySettings(difficulty);
    setTotalTrials(trials);
    setTrialIndex(0);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCorrectCount(0);
    setAttempts(0);
    setStars(0);
    setResponseTime(0);
    setAvgTime(0);
    setTimes([]);
    setSelectedOption(null);
    setIsProcessing(false);
    setStartTime(Date.now());
    setTrialStartTime(Date.now());
    setCurrentTrial(generateTrial(difficulty));
  };

  const handleOptionClick = (optionIndex) => {
    if (isProcessing) return;
    if (!gameStarted || gameOver) return;
    if (selectedOption !== null) return;

    const now = Date.now();
    const timeTaken = trialStartTime ? now - trialStartTime : 0;
    setTimes(prev => [...prev, timeTaken]);

    const isCorrect = optionIndex === currentTrial.correctAnswer;
    setSelectedOption(optionIndex);
    setAttempts(prev => prev + 1);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    setIsProcessing(true);

    setTimeout(() => {
      setSelectedOption(null);
      const nextIndex = trialIndex + 1;
      if (nextIndex >= totalTrials) {
        endGame();
      } else {
        setTrialIndex(nextIndex);
        setTrialStartTime(Date.now());
        setCurrentTrial(generateTrial(difficulty));
        setIsProcessing(false);
      }
    }, 600);
  };

  const endGame = () => {
    const totalTime = Date.now() - startTime;
    setResponseTime(totalTime);
    const avg = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
    setAvgTime(avg);

    const accuracy = calculateAccuracy(correctCount, attempts);
    const { multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(correctCount, attempts, avg, multiplier);
    setScore(finalScore);
    setStars(calculateStars(accuracy, avg, difficulty));

    setGameOver(true);
          // TODO: Insert saveGameResult here with actual variables
    setGameStarted(false);
  };

  const accuracy = calculateAccuracy(correctCount, attempts);
  const progress = totalTrials > 0 ? Math.round((trialIndex / totalTrials) * 100) : 0;

  return (
    <div className="game-container stroop-game">
      <section className="stroop-header">
        <div className="stroop-badge">
          <span className="live-dot"></span>
          Live Attention Training
        </div>
        <h1>
          Stroop <span>Effect</span>
        </h1>
        <p>
          Name the ink color, not the word. Test your impulse control and focus.
        </p>
      </section>

      {gameStarted && !gameOver && (
        <div className="stroop-live-stats">
          <div className="live-stat-item">
            <div className="live-stat-value">{activePlayers}</div>
            <div className="live-stat-label">Playing Now</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{difficulty}</div>
            <div className="live-stat-label">Difficulty</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{trialIndex}/{totalTrials}</div>
            <div className="live-stat-label">Trials</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{correctCount}</div>
            <div className="live-stat-label">Correct</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{Math.round(accuracy)}%</div>
            <div className="live-stat-label">Accuracy</div>
          </div>
        </div>
      )}

      {!gameStarted && !gameOver && (
        <div className="stroop-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>You'll see a color word (e.g., <strong>RED</strong>).</p>
            <p>It will be printed in a specific ink color.</p>
            <p>Click the <strong>ink color</strong>, not the word!</p>
            <p>React quickly and accurately.</p>
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
            Start Game 🧠
          </button>
        </div>
      )}

      {gameStarted && !gameOver && currentTrial && (
        <div className="stroop-container">
          <div className="stroop-progress">
            Trial {trialIndex + 1} of {totalTrials}
          </div>
          <div
            className={`stroop-congruent-badge ${currentTrial.isCongruent ? 'congruent' : 'incongruent'}`}
          >
            {currentTrial.isCongruent ? '✅ Congruent' : '⚠️ Incongruent'}
          </div>
          <div
            className="stroop-word"
            style={{ color: currentTrial.inkColor }}
          >
            {currentTrial.word}
          </div>
          <p style={{ color: '#4d6a6a', fontSize: '14px', marginBottom: '10px' }}>
            Click the <strong>ink color</strong>, not the word!
          </p>
          <div className="stroop-options">
            {currentTrial.options.map((option) => {
              let btnClass = 'stroop-option-btn';
              if (selectedOption !== null) {
                if (option.index === currentTrial.correctAnswer) {
                  btnClass += ' correct';
                } else if (selectedOption === option.index) {
                  btnClass += ' wrong';
                }
              }
              return (
                <button
                  key={option.index}
                  className={btnClass}
                  onClick={() => handleOptionClick(option.index)}
                  disabled={selectedOption !== null || isProcessing}
                  style={{
                    borderColor: selectedOption !== null
                      ? (option.index === currentTrial.correctAnswer ? '#2ecc71' : (selectedOption === option.index ? '#e74c3c' : '#d0e0dc'))
                      : '#d0e0dc'
                  }}
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="stroop-result">
          <h2>{accuracy >= 90 ? "🎉 Excellent!" : accuracy >= 70 ? "�� Great Job!" : "💪 Keep Practicing!"}</h2>
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
              <span>Correct</span>
              <strong>{correctCount}/{attempts}</strong>
            </div>
            <div>
              <span>Avg Reaction</span>
              <strong>{(avgTime / 1000).toFixed(2)}s</strong>
            </div>
            <div>
              <span>Score</span>
              <strong>{score}</strong>
            </div>
            <div>
              <span>Total Time</span>
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

export default StroopEffect;
