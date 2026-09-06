// stroopLogic.js

export const colors = [
  { name: 'Red', hex: '#e74c3c' },
  { name: 'Green', hex: '#2ecc71' },
  { name: 'Blue', hex: '#3498db' },
  { name: 'Yellow', hex: '#f1c40f' },
];

export const getDifficultySettings = (level) => {
  const settings = {
    1: { trials: 5, congruentRatio: 0.8, timeLimit: 5000, multiplier: 1.0 },
    2: { trials: 8, congruentRatio: 0.5, timeLimit: 4000, multiplier: 1.5 },
    3: { trials: 12, congruentRatio: 0.3, timeLimit: 3500, multiplier: 2.0 },
    4: { trials: 15, congruentRatio: 0.1, timeLimit: 3000, multiplier: 2.8 },
    5: { trials: 20, congruentRatio: 0.0, timeLimit: 2500, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

export const generateTrial = (difficulty) => {
  const { congruentRatio } = getDifficultySettings(difficulty);
  const isCongruent = Math.random() < congruentRatio;
  
  const wordIndex = Math.floor(Math.random() * colors.length);
  let inkIndex = wordIndex;
  if (!isCongruent) {
    do {
      inkIndex = Math.floor(Math.random() * colors.length);
    } while (inkIndex === wordIndex);
  }
  
  // Shuffle options so positions don't give clues
  const options = colors.map((c, i) => ({ ...c, index: i }));
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  
  return {
    word: colors[wordIndex].name.toUpperCase(),
    inkColor: colors[inkIndex].hex,
    correctAnswer: inkIndex,
    options: shuffledOptions,
    isCongruent: isCongruent,
  };
};

export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy, avgTime, difficulty) => {
  const timePerTrial = avgTime / 1000;
  const speedBonus = Math.max(0, 1 - (timePerTrial / 3));
  const accuracyBonus = accuracy / 100;
  const totalScore = (accuracyBonus * 0.6 + speedBonus * 0.4);
  
  if (totalScore >= 0.85) return 3;
  if (totalScore >= 0.6) return 2;
  if (totalScore >= 0.35) return 1;
  return 0;
};

export const calculateScore = (correct, total, avgTime, difficultyMultiplier) => {
  const accuracy = calculateAccuracy(correct, total);
  const basePoints = correct * 15;
  const timeBonus = Math.max(0, 100 - Math.floor(avgTime / 30));
  const difficultyBonus = difficultyMultiplier * 10;
  const accuracyBonus = accuracy * 0.5;
  
  return Math.max(0, Math.round(basePoints + timeBonus + difficultyBonus + accuracyBonus));
};
