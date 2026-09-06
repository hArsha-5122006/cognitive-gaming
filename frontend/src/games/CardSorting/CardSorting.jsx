import { saveGameResult } from "../../utils/api";
import { useState, useEffect } from "react";
import {
  getDifficultySettings,
  generateCards,
  generateRule,
  calculateAccuracy,
  calculateStars,
  calculateScore,
} from "./cardSortingLogic";
import "./cardSorting.css";

function CardSorting() {
  const [difficulty, setDifficulty] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentRule, setCurrentRule] = useState(null);
  const [round, setRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [roundStartTime, setRoundStartTime] = useState(null);
  const [times, setTimes] = useState([]);
  const [activePlayers, setActivePlayers] = useState(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [cardsPerRound, setCardsPerRound] = useState(0);
  const [switchAfter, setSwitchAfter] = useState(0);
  const [correctInRound, setCorrectInRound] = useState(0);
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { dimensions: dims, cardsPerRound: cpr, switchAfter: sa, multiplier } = getDifficultySettings(difficulty);
    setDimensions(dims);
    setCardsPerRound(cpr);
    setSwitchAfter(sa);
    setTotalRounds(dims.length * 3); // approximate
    setRound(0);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCorrectCount(0);
    setAttempts(0);
    setStars(0);
    setTimes([]);
    setAvgTime(0);
    setResponseTime(0);
    setFeedback([]);
    setCorrectInRound(0);
    setIsProcessing(false);
    setStartTime(Date.now());
    startNewRound(dims, cpr, sa, 0);
  };

  const startNewRound = (dims, cpr, sa, roundIndex) => {
    const newCards = generateCards(cpr);
    setCards(newCards);
    const dimension = dims[Math.floor(roundIndex % dims.length)];
    const rule = generateRule(dimension);
    setCurrentRule(rule);
    setRound(roundIndex + 1);
    setRoundStartTime(Date.now());
    setCorrectInRound(0);
    setFeedback([]);
    setIsProcessing(false);
  };

  const handleCardClick = (card) => {
    if (isProcessing || gameOver) return;
    if (!currentRule) return;

    const isCorrect = card[currentRule.dimension] === currentRule.value;
    setAttempts(prev => prev + 1);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setCorrectInRound(prev => prev + 1);
      setFeedback(prev => [...prev, { cardId: card.id, correct: true }]);
    } else {
      setFeedback(prev => [...prev, { cardId: card.id, correct: false }]);
    }

    // Disable card after click (simple)
    // Actually we'll just mark it done by removing it? Instead, we'll just allow one click per card.
    // For simplicity, we'll disable all cards after a click for a moment.
    setIsProcessing(true);
    setTimeout(() => {
      // Check if round should end (if all correct or switchAfter reached)
      const totalCorrect = correctInRound + (isCorrect ? 1 : 0);
      if (totalCorrect >= switchAfter || attempts >= cardsPerRound) {
        // Move to next round or end game
        const nextRound = round;
        if (nextRound >= dimensions.length * 3) {
          endGame();
        } else {
          startNewRound(dimensions, cardsPerRound, switchAfter, nextRound);
        }
      } else {
        // Continue with same round – we need to remove clicked cards or just allow more clicks?
        // We'll remove the card from the deck to avoid re-click.
        setCards(prevCards => prevCards.filter(c => c.id !== card.id));
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
          // TODO: Insert saveGameResult here with actual variables
    setGameStarted(false);
  };

  const accuracy = calculateAccuracy(correctCount, attempts);
  const progress = totalRounds > 0 ? Math.round((round / totalRounds) * 100) : 0;

  return (
    <div className="game-container cardsorting-game">
      <section className="cardsorting-header">
        <div className="cardsorting-badge"><span className="live-dot"></span>Live Cognitive Flexibility Training</div>
        <h1>Card <span>Sorting</span></h1>
        <p>Sort cards by a rule. The rule changes – stay flexible!</p>
      </section>

      {gameStarted && !gameOver && (
        <div className="cardsorting-live-stats">
          <div className="live-stat-item"><div className="live-stat-value">{activePlayers}</div><div className="live-stat-label">Playing Now</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{difficulty}</div><div className="live-stat-label">Difficulty</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{round}/{totalRounds}</div><div className="live-stat-label">Round</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{correctCount}</div><div className="live-stat-label">Correct</div></div>
          <div className="live-stat-item"><div className="live-stat-value">{Math.round(accuracy)}%</div><div className="live-stat-label">Accuracy</div></div>
        </div>
      )}

      {!gameStarted && !gameOver && (
        <div className="cardsorting-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>Cards appear with different colors, shapes, and numbers.</p>
            <p>A sorting rule will be shown (e.g., "Sort by color: Red").</p>
            <p>Click all cards that match the rule.</p>
            <p>After a few correct sorts, the rule changes – adapt!</p>
          </div>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select id="difficulty-select" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              <option value={1}>Level 1 — 1 rule (color)</option>
              <option value={2}>Level 2 — 2 rules (color, shape)</option>
              <option value={3}>Level 3 — 2 rules (faster switching)</option>
              <option value={4}>Level 4 — 3 rules (color, shape, number)</option>
              <option value={5}>Level 5 — 3 rules (fast switching)</option>
            </select>
          </div>
          <button className="btn-primary" onClick={startGame}>Start Game 🃏</button>
        </div>
      )}

      {gameStarted && !gameOver && currentRule && cards.length > 0 && (
        <div className="cardsorting-container">
          <div className="cardsorting-rule">
            <h3>Rule: {currentRule.description}</h3>
          </div>
          <p style={{ color: '#4d6a6a' }}>Click the cards that match the rule</p>
          <div className="cardsorting-cards">
            {cards.map((card) => {
              const isCorrect = card[currentRule.dimension] === currentRule.value;
              const feedbackItem = feedback.find(f => f.cardId === card.id);
              let className = 'card-item';
              if (feedbackItem) {
                className += feedbackItem.correct ? ' correct' : ' wrong';
              }
              return (
                <div
                  key={card.id}
                  className={className}
                  onClick={() => handleCardClick(card)}
                  disabled={isProcessing || feedbackItem}
                >
                  <div className="card-symbol">
                    {card.shape === 'Circle' && '●'}
                    {card.shape === 'Square' && '■'}
                    {card.shape === 'Triangle' && '▲'}
                  </div>
                  <div className="card-detail">
                    {card.color} {card.number}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {gameOver && (
        <div className="cardsorting-result">
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

export default CardSorting;
