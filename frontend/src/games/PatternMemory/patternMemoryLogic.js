export const getDifficultySettings = (level) => {
  const settings = {
    1: { initialLength: 3, maxLength: 8, interval: 800, multiplier: 1.0 },
    2: { initialLength: 4, maxLength: 10, interval: 700, multiplier: 1.5 },
    3: { initialLength: 5, maxLength: 12, interval: 600, multiplier: 2.0 },
    4: { initialLength: 6, maxLength: 14, interval: 500, multiplier: 2.8 },
    5: { initialLength: 7, maxLength: 16, interval: 400, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'];

export const generateSequence = (length) => {
  const seq = [];
  for (let i = 0; i < length; i++) {
    seq.push(Math.floor(Math.random() * colors.length));
  }
  return seq;
};

export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy, maxLevel) => {
  const levelBonus = maxLevel / 12;
  const accuracyBonus = accuracy / 100;
  const totalScore = (accuracyBonus * 0.6 + levelBonus * 0.4);
  if (totalScore >= 0.85) return 3;
  if (totalScore >= 0.6) return 2;
  if (totalScore >= 0.35) return 1;
  return 0;
};

export const calculateScore = (accuracy, maxLevel, difficultyMultiplier) => {
  const basePoints = accuracy * 2;
  const levelBonus = maxLevel * 3;
  const difficultyBonus = difficultyMultiplier * 10;
  return Math.max(0, Math.round(basePoints + levelBonus + difficultyBonus));
};
