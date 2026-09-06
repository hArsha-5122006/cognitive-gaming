import { saveGameResult } from "../../utils/api";
import { useState, useEffect } from "react";
import { getDifficultySettings, generateSequence, calculateAccuracy, calculateStars, calculateScore } from "./digitSpanLogic";
import "./digitSpan.css";

function DigitSpan() {
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
  const [avgLength, setAvgLength] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [currentSequence, setCurrentSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [showSequence, setShowSequence] = useState(false);
  const [phase, setPhase] = useState('display'); // display | recall | result
  const [activePlayers, setActivePlayers] = useState(30);
  const [inputDisabled, setInputDisabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { minLength, maxLength, trialsPerLength, multiplier } = getDifficultySettings(difficulty);
    const generatedTrials = [];
    let total = 0;
    for (let len = minLength; len <= maxLength; len++) {
      for (let i = 0; i < trialsPerLength; i++) {
        generatedTrials.push(generateSequence(len));
        total++;
      }
    }
    setTrials(generatedTrials);
    setTotalTrials(total);
    setCurrentIndex(0);
    setCurrentSequence(generatedTrials[0]);
    setUserInput([]);
    setShowSequence(true);
    setPhase('display');
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCorrectCount(0);
    setAttempts(0);
    setStars(0);
    setAvgLength(0);
    setStartTime(Date.now());
    setInputDisabled(false);
    // Auto-hide sequence after 1.5 sec per digit
    const displayTime = generatedTrials[0].length * 600 + 1000;
    setTimeout(() => {
      setShowSequence(false);
      setPhase('recall');
    }, displayTime);
  };

  const handleDigitInput = (digit) => {
    if (phase !== 'recall' || inputDisabled) return;
    if (userInput.length >= currentSequence.length) return;
    setUserInput(prev => [...prev, digit]);
  };

  const handleSubmit = () => {
    if (userInput.length !== currentSequence.length) return;
    setInputDisabled(true);
    const isCorrect = userInput.every((d, i) => d === currentSequence[i]);
    setAttempts(prev => prev + 1);
    if (isCorrect) setCorrectCount(prev => prev + 1);
    // Show feedback briefly
    setPhase('result');
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= totalTrials) {
        endGame();
      } else {
        setCurrentIndex(nextIndex);
        const nextSeq = trials[nextIndex];
        setCurrentSequence(nextSeq);
        setUserInput([]);
        setShowSequence(true);
        setPhase('display');
        setInputDisabled(false);
        const displayTime = nextSeq.length * 600 + 1000;
        setTimeout(() => {
          setShowSequence(false);
          setPhase('recall');
        }, displayTime);
      }
    }, 1000);
  };

  const endGame = () => {
    const totalTime = Date.now() - startTime;
    setResponseTime(totalTime);
    const avgLen = trials.reduce((sum, seq) => sum + seq.length, 0) / trials.length;
    setAvgLength(avgLen);
    const accuracy = calculateAccuracy(correctCount, attempts);
    const { multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(accuracy, avgLen, multiplier);
    setScore(finalScore);
    setStars(calculateStars(accuracy, avgLen));
    setGameOver(true);
          // TODO: Insert saveGameResult here with actual variables
    setGameStarted(false);
  };
  const accuracy = calculateAccuracy(correctCount, attempts);

  return (
    <div className="game-container digitspan-game">
      <section className="digitspan-header">
        <div className="digitspan-badge"><span className="live-dot"></span>Live Working Memory Training</div>
        <h1>Digit <span>Span</span></h1>
        <p>Memorize and recall sequences of digits. Classic measure of verbal working memory.</p>
      </section>
      {gameStarted && !gameOver && (
        <div className="digitspan-live-stats">
          <div className="live-stat-item"><div className="live-stat-value">{activePlayers}</div><div className="live-stat-label">Playing Now</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{difficulty}</div><div className="live-stat-label">Difficulty</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{currentIndex}/{totalTrials}</div><div className="live-stat-label">Trials</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{correctCount}</div><div className="live-stat-label">Correct</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{Math.round(accuracy)}%</div><div className="live-stat-label">Accuracy</div></div>
        </div>
      )}
      {!gameStarted && !gameOver && (
        <div className="digitspan-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>You'll see a sequence of digits for a short time.</p>
            <p>After it disappears, recall the sequence in order.</p>
            <p>Tap the digits in the correct order.</p>
          </div>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              <option value={1}>Level 1 — 3‑5 digits</option>
              <option value={2}>Level 2 — 4‑6 digits</option>
              <option value={3}>Level 3 — 5‑7 digits</option>
              <option value={4}>Level 4 — 6‑8 digits</option>
              <option value={5}>Level 5 — 7‑9 digits</option>
            </select>
          </div>
          <button className="btn-primary" onClick={startGame}>Start Game 🔢</button>
        </div>
      )}
      {gameStarted && !gameOver && (
        <div className="digitspan-container">
          {showSequence && (
            <div className="digit-sequence">
              {currentSequence.map((d, i) => <span key={i}>{d}</span>)}
            </div>
          )}
          {!showSequence && phase === 'recall' && (
            <div>
              <p>Recall the sequence:</p>
              <div className="digit-input-area">
                <div style={{ fontSize: '24px', minHeight: '40px', letterSpacing: '4px' }}>
                  {userInput.map((d, i) => <span key={i}>{d}</span>)}
                  {Array.from({ length: currentSequence.length - userInput.length }).map((_, i) => <span key={`fill-${i}`} style={{ opacity: 0.3 }}>_</span>)}
                </div>
                <div className="digit-input-row">
                  {[1,2,3,4,5,6,7,8,9].map(d => (
                    <button key={d} className="digit-btn" onClick={() => handleDigitInput(d)} disabled={phase !== 'recall' || inputDisabled || userInput.length >= currentSequence.length}>
                      {d}
                    </button>
                  ))}
                </div>
                <button className="btn-primary" style={{ padding: '10px 30px', fontSize: '16px' }} onClick={handleSubmit} disabled={userInput.length !== currentSequence.length || phase !== 'recall' || inputDisabled}>
                  Submit
                </button>
              </div>
            </div>
          )}
          {phase === 'result' && (
            <div>
              <p style={{ fontSize: '24px' }}>{userInput.every((d,i) => d === currentSequence[i]) ? '✅ Correct!' : '❌ Wrong'}</p>
            </div>
          )}
        </div>
      )}
      {gameOver && (
        <div className="digitspan-result">
          <h2>{accuracy >= 80 ? "🎉 Excellent!" : accuracy >= 60 ? "👏 Good!" : "💪 Keep Practicing!"}</h2>
          <div className="stars-display">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          <div className="final-results">
            <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
            <div><span>Correct</span><strong>{correctCount}/{attempts}</strong></div>
            <div><span>Avg Length</span><strong>{avgLength.toFixed(1)}</strong></div>
            <div><span>Score</span><strong>{score}</strong></div>
            <div><span>Total Time</span><strong>{(responseTime / 1000).toFixed(1)}s</strong></div>
          </div>
          <button className="btn-primary" onClick={startGame}>Play Again 🔄</button>
        </div>
      )}
    </div>
  );
}
export default DigitSpan;
