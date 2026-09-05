// sequenceLogic.js
export const symbolCategories = {
  fruits: ["🍎", "🍌", "🍇", "🍊", "🍉", "🍓", "🍑", "🥝"],
  // You can add more categories later (e.g., shapes, numbers)
};

export const getDifficultySettings = (level) => {
  const settings = {
    1: { length: 3, displayTime: 3000, multiplier: 1.0 },   // Easy
    2: { length: 4, displayTime: 2800, multiplier: 1.5 },   // Medium
    3: { length: 5, displayTime: 2500, multiplier: 2.0 },   // Hard
    4: { length: 6, displayTime: 2000, multiplier: 2.8 },   // Very Hard
    5: { length: 7, displayTime: 1500, multiplier: 3.5 },   // Expert
  };
  return settings[level] || settings[1];
};

export const generateSequence = (length) => {
  const { fruits } = symbolCategories;
  const sequence = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * fruits.length);
    sequence.push(fruits[randomIndex]);
  }
  return sequence;
};

export const countCorrectPositions = (original, user) => {
  let correct = 0;
  for (let i = 0; i < Math.min(original.length, user.length); i++) {
    if (original[i] === user[i]) correct++;
  }
  return correct;
};

export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy) => {
  if (accuracy === 100) return 3;
  if (accuracy >= 70) return 2;
  if (accuracy >= 40) return 1;
  return 0;
};

export const calculateScore = (correct, total, mistakes, metrics) => {
  const { displayTime, responseTime, streak, difficultyMultiplier } = metrics;

  // Base points: 10 per correct position
  const basePoints = correct * 10;

  // Time bonus: faster recall = more points
  const timeBonus = Math.max(0, 100 - Math.floor(responseTime / 50));

  // Streak bonus: consecutive perfect rounds
  const streakBonus = streak * 5;

  // Difficulty multiplier
  const difficultyBonus = difficultyMultiplier * 5;

  // Penalty for mistakes
  const mistakePenalty = mistakes * 8;

  let totalScore = basePoints + timeBonus + streakBonus + difficultyBonus - mistakePenalty;

  // Ensure score is never negative
  return Math.max(0, totalScore);
};