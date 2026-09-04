import { useEffect, useState } from "react";

import MemoryCard from "./MemoryCard";

import {
  generateCards,
  checkMatch,
  calculateScore,
  calculateAccuracy
} from "./memoryLogic";

import "./memory.css";


function MemoryGame() {

  const [cards, setCards] = useState([]);

  const [flippedCards, setFlippedCards] = useState([]);

  const [matchedCards, setMatchedCards] = useState([]);

  const [matches, setMatches] = useState(0);

  const [mistakes, setMistakes] = useState(0);

  const [score, setScore] = useState(0);

  const [time, setTime] = useState(0);

  const [gameStarted, setGameStarted] = useState(false);

  const [gameOver, setGameOver] = useState(false);


  // Start a new game
  const startGame = () => {

    setCards(generateCards());

    setFlippedCards([]);

    setMatchedCards([]);

    setMatches(0);

    setMistakes(0);

    setScore(0);

    setTime(0);

    setGameStarted(true);

    setGameOver(false);
  };


  // Timer
  useEffect(() => {

    if (!gameStarted || gameOver) {
      return;
    }

    const timer = setInterval(() => {

      setTime((previousTime) => previousTime + 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [gameStarted, gameOver]);


  // Handle card click
  const handleCardClick = (card) => {

    // Don't allow more than two cards
    if (flippedCards.length === 2) {
      return;
    }

    // Don't allow clicking the same card
    if (flippedCards.includes(card.id)) {
      return;
    }

    // Don't allow clicking an already matched card
    if (matchedCards.includes(card.id)) {
      return;
    }

    const newFlippedCards = [
      ...flippedCards,
      card.id
    ];

    setFlippedCards(newFlippedCards);


    // First card
    if (newFlippedCards.length === 1) {
      return;
    }


    // Second card
    const firstCard = cards.find(
      (item) => item.id === newFlippedCards[0]
    );

    const secondCard = card;


    // Check whether cards match
    if (checkMatch(firstCard, secondCard)) {

      const newMatchedCards = [
        ...matchedCards,
        firstCard.id,
        secondCard.id
      ];

      const newMatches = matches + 1;

      setMatchedCards(newMatchedCards);

      setMatches(newMatches);

      setScore(
        calculateScore(
          newMatches,
          mistakes
        )
      );

      setFlippedCards([]);


      // Check game completion
      if (newMatchedCards.length === cards.length) {

        setGameOver(true);

      }

    } else {

      // Incorrect match
      const newMistakes = mistakes + 1;

      setMistakes(newMistakes);

      setScore(
        calculateScore(
          matches,
          newMistakes
        )
      );


      // Hide cards after a short delay
      setTimeout(() => {

        setFlippedCards([]);

      }, 800);

    }
  };


  const accuracy = calculateAccuracy(
    matches,
    mistakes
  );


  return (
    <div className="memory-game">

      <div className="memory-header">

        <h1>🃏 Memory Match</h1>

        <p>
          Find all matching pairs and test your visual memory.
        </p>

      </div>


      {!gameStarted && (

        <div className="start-screen">

          <div className="game-instructions">

            <h2>How to Play</h2>

            <p>
              Find all 6 matching pairs.
            </p>

            <p>
              Try to remember the position of each card.
            </p>

            <p>
              Complete the game with as few mistakes as possible.
            </p>

          </div>

          <button
            className="primary-btn"
            onClick={startGame}
          >
            Start Game 🎮
          </button>

        </div>

      )}


      {gameStarted && (

        <>

          <div className="memory-stats">

            <div className="memory-stat">
              <span>⏱️ Time</span>
              <strong>{time}s</strong>
            </div>

            <div className="memory-stat">
              <span>🎯 Matches</span>
              <strong>{matches}</strong>
            </div>

            <div className="memory-stat">
              <span>❌ Mistakes</span>
              <strong>{mistakes}</strong>
            </div>

            <div className="memory-stat">
              <span>⭐ Score</span>
              <strong>{score}</strong>
            </div>

            <div className="memory-stat">
              <span>📊 Accuracy</span>
              <strong>{accuracy}%</strong>
            </div>

          </div>


          <div className="memory-board">

            {cards.map((card) => (

              <MemoryCard
                key={card.id}
                card={card}
                isFlipped={
                  flippedCards.includes(card.id)
                }
                isMatched={
                  matchedCards.includes(card.id)
                }
                onClick={() =>
                  handleCardClick(card)
                }
              />

            ))}

          </div>


          {gameOver && (

            <div className="game-over">

              <h2>🎉 Congratulations!</h2>

              <p>
                You found all the matching pairs.
              </p>

              <div className="final-results">

                <p>
                  <strong>Score:</strong> {score}
                </p>

                <p>
                  <strong>Accuracy:</strong> {accuracy}%
                </p>

                <p>
                  <strong>Mistakes:</strong> {mistakes}
                </p>

                <p>
                  <strong>Completion Time:</strong> {time}s
                </p>

              </div>

              <button
                className="primary-btn"
                onClick={startGame}
              >
                Play Again 🔄
              </button>

            </div>

          )}

        </>

      )}

    </div>
  );
}


export default MemoryGame;