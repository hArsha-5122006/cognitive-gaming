import { saveGameResult } from "../../utils/api";
import { useState, useEffect } from "react";
import {
  getDifficultySettings,
  generateCardDeck,
  calculateAccuracy,
  calculateStars,
  calculateScore,
} from "./memoryLogic";
import "./memory.css";

function MemoryGame() {
  const [difficulty, setDifficulty] = useState(1);
  const [deck, setDeck] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [stars, setStars] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [activePlayers, setActivePlayers] = useState(42);
  const [isProcessing, setIsProcessing] = useState(false);

  // Live players simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers((prev) =>
        Math.max(25, prev + Math.floor(Math.random() * 5) - 2)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    const { pairs, cols, rows, multiplier } = getDifficultySettings(difficulty);
    const newDeck = generateCardDeck(pairs);
    setDeck(newDeck);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setMatches(0);
    setAttempts(0);
    setStars(0);
    setResponseTime(0);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setTotalPairs(pairs);
    setStartTime(Date.now());
    setIsProcessing(false);
    // Reset matched flag
    setDeck(newDeck.map(card => ({ ...card, matched: false })));
  };

  const handleCardClick = (index) => {
    if (isProcessing) return;
    if (gameOver) return;
    if (flippedIndices.length === 2) return;
    if (deck[index].matched) return;
    if (flippedIndices.includes(index)) return;

    // Flip the card
    setFlippedIndices([...flippedIndices, index]);

    // If two cards are flipped, check for match
    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const secondIndex = index;
      const firstCard = deck[firstIndex];
      const secondCard = deck[secondIndex];

      setAttempts(prev => prev + 1);

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        setMatches(prev => prev + 1);
        setMatchedPairs(prev => prev + 1);
        setDeck(prevDeck =>
          prevDeck.map((card, i) =>
            i === firstIndex || i === secondIndex
              ? { ...card, matched: true }
              : card
          )
        );
        setFlippedIndices([]);

        // Check if all pairs matched
        if (matchedPairs + 1 === totalPairs) {
          endGame();
        }
      } else {
        // No match - flip back after delay
        setIsProcessing(true);
        setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 800);
      }
    }
  };

  const endGame = () => {
    const endTime = Date.now();
    const timeTaken = startTime ? (endTime - startTime) : 0;
    setResponseTime(timeTaken);
    setGameOver(true);
          // TODO: Insert saveGameResult here with actual variables

    const accuracy = calculateAccuracy(matches, attempts);
    const { multiplier } = getDifficultySettings(difficulty);
    const finalScore = calculateScore(matches, attempts, timeTaken, multiplier);
    setScore(finalScore);
    setStars(calculateStars(accuracy, timeTaken, totalPairs));
  };

  const accuracy = calculateAccuracy(matches, attempts);
  const { cols, rows } = getDifficultySettings(difficulty);

  return (
    <div className="game-container memory-game">
      {/* ===== HEADER ===== */}
      <section className="memory-header">
        <div className="memory-badge">
          <span className="live-dot"></span>
          Live Memory Training
        </div>
        <h1>
          Memory <span>Match</span>
        </h1>
        <p>
          Find matching pairs of symbols. Test your memory and concentration.
        </p>
      </section>

      {/* ===== LIVE STATS BAR ===== */}
      {gameStarted && !gameOver && (
        <div className="memory-live-stats">
          <div className="live-stat-item">
            <div className="live-stat-value">{activePlayers}</div>
            <div className="live-stat-label">Playing Now</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{difficulty}</div>
            <div className="live-stat-label">Difficulty</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{matches}/{totalPairs}</div>
            <div className="live-stat-label">Pairs Found</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{attempts}</div>
            <div className="live-stat-label">Attempts</div>
          </div>
          <div className="live-stat-item">
            <div className="live-stat-value">{Math.round(accuracy)}%</div>
            <div className="live-stat-label">Accuracy</div>
          </div>
        </div>
      )}

      {/* ===== START SCREEN ===== */}
      {!gameStarted && !gameOver && (
        <div className="memory-start">
          <h2>How to Play</h2>
          <div className="instructions">
            <p>Flip two cards to find matching pairs.</p>
            <p>Remember the positions of symbols.</p>
            <p>Match all pairs with the fewest attempts.</p>
          </div>

          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty</label>
            <select
              id="difficulty-select"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
            >
              <option value={1}>Level 1 — Easy (4 pairs)</option>
              <option value={2}>Level 2 — Medium (6 pairs)</option>
              <option value={3}>Level 3 — Hard (8 pairs)</option>
              <option value={4}>Level 4 — Very Hard (12 pairs)</option>
              <option value={5}>Level 5 — Expert (18 pairs)</option>
            </select>
          </div>

          <button className="btn-primary" onClick={startGame}>
            Start Game 🃏
          </button>
        </div>
      )}

      {/* ===== GAME PLAY ===== */}
      {gameStarted && !gameOver && (
        <div className="memory-grid-container">
          <h2>Find Pairs</h2>
          <p>{totalPairs} pairs to match</p>

          <div
            className="memory-grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              maxWidth: `${Math.min(600, cols * 80)}px`
            }}
          >
            {deck.map((card, index) => (
              <div
                key={card.cardIndex}
                className={`memory-card ${card.matched ? 'matched' : ''} ${flippedIndices.includes(index) ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
                style={{
                  background: card.matched ? '#f0fff4' : (flippedIndices.includes(index) ? 'white' : '#e8f3ef'),
                  borderColor: card.matched ? '#2ecc71' : (flippedIndices.includes(index) ? '#2d7d6a' : '#d0e0dc'),
                  cursor: card.matched ? 'default' : 'pointer'
                }}
                disabled={card.matched || flippedIndices.includes(index) || isProcessing}
              >
                {(flippedIndices.includes(index) || card.matched) ? card.emoji : '❓'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== GAME OVER ===== */}
      {gameOver && (
        <div className="memory-result">
          <h2>{accuracy >= 100 ? "🎉 Perfect!" : accuracy >= 70 ? "👏 Great Job!" : "💪 Keep Practicing!"}</h2>
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
              <span>Pairs Matched</span>
              <strong>{matches}/{totalPairs}</strong>
            </div>
            <div>
              <span>Attempts</span>
              <strong>{attempts}</strong>
            </div>
            <div>
              <span>Score</span>
              <strong>{score}</strong>
            </div>
            <div>
              <span>Response Time</span>
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

export default MemoryGame;
