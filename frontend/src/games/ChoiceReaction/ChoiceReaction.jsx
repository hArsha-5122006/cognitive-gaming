import { saveActivity } from "../../utils/recommender";
import { useState, useEffect } from "react";
import {
  getDifficultySettings,
  generateTrial,
  calculateAccuracy,
  calculateStars,
  calculateScore,
} from "./choiceReactionLogic";
import "./choiceReaction.css";

function ChoiceReaction() {
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
  const [activePlayers, setActivePlayers] = useState(42);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentStimulus, setCurrentStimulus] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => Math.max(20, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { stimuli, trials: numTrials, interval, multiplier } = getDifficultySettings(difficulty);
    setTotalTrials(numTrials);
    const generatedTrials = [];
    for (let i = 0; i < numTrials; i++) {
      generatedTrials.push(generateTrial(difficulty));
    }
    setTrials(generatedTrials);
    setCurrentIndex(0);
    setCurrentStimulus(generatedTrials[0]);
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

    const isCorrect = option === currentStimulus;
    setSelectedOption(option);
    setAttempts(prev => prev + 1);
    if (isCorrect) setCorrectCount(prev => prev + 1);

    setIsProcessing(true);

    setTimeout(() => {
      setSelectedOption(null);
      const nextIndex = currentIndex + 1;
      if (nextIndex >= totalTrials) {
        endGame();
      } else {
        setCurrentIndex(nextIndex);
        setCurrentStimulus(trials[nextIndex]);
        setTrialStartTime(Date.now());
        setIsProcessing(false);
      }
    }, 500);
  };

  const endGame = () => {
    const totalTime = Date.now() - startTime;
    setResponseTime(totalTime);
    const avg = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
    setAvgTime(avg);

    const accuracy = calculateAccuracy(correctCount, attempts);
    const { multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(accuracy, avg, multiplier);
    setScore(finalScore);
    setStars(calculateStars(accuracy, avg));

    setGameOver(true);
      const username = localStorage.getItem("username");
      if (username) {
        saveActivity(username, "Choice Reaction", score || 0, accuracy || 0, stars || 0, difficulty || 1, responseTime || 0);
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
  const availableOptions = getDifficultySettings(difficulty).stimuli;

  return (
    <div className="game-container choicereaction-game">
      <section className="choicereaction-header">
        <div className="choicereaction-badge"><span className="live-dot"></span>Live Processing Speed Training</div>
        <h1>Choice <span>Reaction</span></h1>
        <p>React quickly and accurately to the displayed stimulus. Test your speed and decision-making.</p>
      </section>

      {gameStarted && !gameOver && (
        <div className="choicereaction-live-stats">
          <div className="live-stat-item"><div className="live-stat-value">{activePlayers}</div><div className="live-stat-label">Playing Now</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{difficulty}</div><div className="live-stat-label">Difficulty</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{currentIndex}/{totalTrials}</div><div className="live-stat-label">Trials</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{correctCount}</div><div className="live-stat-label">Correct</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{Math.round(accuracy)}%</div><div className="live-stat-label">Accuracy</div></div>
        </div>
      )}

      {!gameStarted && !gameOver && (
        <div className="choicereaction-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>You will see a stimulus (arrow, symbol, etc.).</p>
            <p>Select the matching option as quickly as possible.</p>
            <p>Faster reactions and higher accuracy give more points.</p>
          </div>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              <option value={1}>Level 1 — 2 options</option>
              <option value={2}>Level 2 — 4 options</option>
              <option value={3}>Level 3 — 4 options (faster)</option>
              <option value={4}>Level 4 — 6 options</option>
              <option value={5}>Level 5 — 8 options (fast)</option>
            </select>
          </div>
          <button className="btn-primary" onClick={startGame}>Start Game ⏱️</button>
        </div>
      )}

      {gameStarted && !gameOver && currentStimulus && (
        <div className="choicereaction-container">
          <div className="choicereaction-progress">Trial {currentIndex + 1} of {totalTrials}</div>
          <div className="choicereaction-stimulus">{currentStimulus}</div>
          <p style={{ color: '#4d6a6a', fontSize: '14px' }}>Click the matching option</p>
          <div className="choicereaction-options">
            {availableOptions.map((opt) => {
              let btnClass = 'choicereaction-option-btn';
              if (selectedOption !== null) {
                if (opt === currentStimulus) btnClass += ' correct';
                else if (selectedOption === opt) btnClass += ' wrong';
              }
              return (
                <button
                  key={opt}
                  className={btnClass}
                  onClick={() => handleOptionClick(opt)}
                  disabled={selectedOption !== null || isProcessing}
                  style={{
                    borderColor: selectedOption !== null ? (opt === currentStimulus ? '#2ecc71' : (selectedOption === opt ? '#e74c3c' : '#d0e0dc')) : '#d0e0dc'
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="choicereaction-result">
          <h2>{accuracy >= 90 ? "🎉 Excellent!" : accuracy >= 70 ? "👏 Great!" : "💪 Keep Practicing!"}</h2>
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

export default ChoiceReaction;
