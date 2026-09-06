export const getDifficultySettings = (level) => {
  const settings = {
    1: { minLength: 3, maxLength: 5, trialsPerLength: 2, multiplier: 1.0 },
    2: { minLength: 4, maxLength: 6, trialsPerLength: 2, multiplier: 1.5 },
    3: { minLength: 5, maxLength: 7, trialsPerLength: 2, multiplier: 2.0 },
    4: { minLength: 6, maxLength: 8, trialsPerLength: 3, multiplier: 2.8 },
    5: { minLength: 7, maxLength: 9, trialsPerLength: 3, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

export const generateSequence = (length) => {
  const digits = [];
  for (let i = 0; i < length; i++) {
    digits.push(Math.floor(Math.random() * 9) + 1);
  }
  return digits;
};

export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy, avgLength) => {
  const lengthBonus = Math.min(1, avgLength / 9);
  const accBonus = accuracy / 100;
  const totalScore = (accBonus * 0.7 + lengthBonus * 0.3);
  if (totalScore >= 0.85) return 3;
  if (totalScore >= 0.6) return 2;
  if (totalScore >= 0.35) return 1;
  return 0;
};

export const calculateScore = (accuracy, avgLength, difficultyMultiplier) => {
  const basePoints = accuracy * 2;
  const lengthBonus = avgLength * 3;
  const difficultyBonus = difficultyMultiplier * 10;
  return Math.max(0, Math.round(basePoints + lengthBonus + difficultyBonus));
};
