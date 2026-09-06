export const getDifficultySettings = (level) => {
  const settings = {
    1: { n: 1, trials: 10, interval: 1500, multiplier: 1.0 },
    2: { n: 2, trials: 15, interval: 1300, multiplier: 1.5 },
    3: { n: 2, trials: 20, interval: 1000, multiplier: 2.0 },
    4: { n: 3, trials: 25, interval: 800, multiplier: 2.8 },
    5: { n: 3, trials: 30, interval: 600, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const generateSequence = (length) => {
  const seq = [];
  for (let i = 0; i < length; i++) {
    seq.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }
  return seq;
};

export const calculateAccuracy = (hits, misses, correctRejections, falseAlarms) => {
  const total = hits + misses + correctRejections + falseAlarms;
  if (total === 0) return 0;
  const correct = hits + correctRejections;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy, avgTime) => {
  const timeBonus = Math.max(0, 1 - (avgTime / 2000));
  const accuracyBonus = accuracy / 100;
  const totalScore = (accuracyBonus * 0.7 + timeBonus * 0.3);
  if (totalScore >= 0.85) return 3;
  if (totalScore >= 0.6) return 2;
  if (totalScore >= 0.35) return 1;
  return 0;
};

export const calculateScore = (accuracy, avgTime, difficultyMultiplier) => {
  const basePoints = accuracy * 2;
  const timeBonus = Math.max(0, 100 - Math.floor(avgTime / 20));
  const difficultyBonus = difficultyMultiplier * 15;
  return Math.max(0, Math.round(basePoints + timeBonus + difficultyBonus));
};
