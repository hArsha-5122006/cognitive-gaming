// memoryLogic.js

export const getDifficultySettings = (level) => {
  const settings = {
    1: { pairs: 4, cols: 4, rows: 2, multiplier: 1.0 },   // Easy
    2: { pairs: 6, cols: 4, rows: 3, multiplier: 1.5 },   // Medium
    3: { pairs: 8, cols: 4, rows: 4, multiplier: 2.0 },   // Hard
    4: { pairs: 12, cols: 6, rows: 4, multiplier: 2.8 },  // Very Hard
    5: { pairs: 18, cols: 6, rows: 6, multiplier: 3.5 },  // Expert
  };
  return settings[level] || settings[1];
};

const emojis = [
  '🍎', '🍌', '🍇', '🍊', '🍉', '🍓', '🍑', '🥝',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
  '⭐', '🌙', '☀️', '🌈', '⚡', '❄️', '🔥', '💧',
  '🎯', '🏆', '🎮', '🎲', '🎯', '🏀', '⚽', '🎾'
];

export const generateCardDeck = (pairs) => {
  // Select random emojis from the pool
  const shuffledEmojis = [...emojis].sort(() => Math.random() - 0.5);
  const selectedEmojis = shuffledEmojis.slice(0, pairs);
  
  // Create pairs
  const deck = [];
  selectedEmojis.forEach((emoji, index) => {
    deck.push({ id: index * 2, emoji, matched: false });
    deck.push({ id: index * 2 + 1, emoji, matched: false });
  });
  
  // Shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  // Add cardIndex for grid positioning
  return deck.map((card, index) => ({ ...card, cardIndex: index }));
};

export const calculateAccuracy = (matches, attempts) => {
  if (attempts === 0) return 0;
  return Math.round((matches / attempts) * 100);
};

export const calculateStars = (accuracy, timeTaken, pairs) => {
  const timePerPair = timeTaken / pairs;
  const speedBonus = Math.max(0, 1 - (timePerPair / 3000));
  const accuracyBonus = accuracy / 100;
  const totalScore = (accuracyBonus * 0.6 + speedBonus * 0.4);
  
  if (totalScore >= 0.85) return 3;
  if (totalScore >= 0.6) return 2;
  if (totalScore >= 0.35) return 1;
  return 0;
};

export const calculateScore = (matches, attempts, timeTaken, difficultyMultiplier) => {
  const accuracy = calculateAccuracy(matches, attempts);
  const basePoints = matches * 10;
  const timeBonus = Math.max(0, 100 - Math.floor(timeTaken / 100));
  const difficultyBonus = difficultyMultiplier * 10;
  const accuracyBonus = accuracy * 0.5;
  
  return Math.max(0, Math.round(basePoints + timeBonus + difficultyBonus + accuracyBonus));
};
