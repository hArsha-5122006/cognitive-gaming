export const getDifficultySettings = (level) => {
  const settings = {
    1: { targets: 6, angleDelta: 45, timeLimit: 15000, multiplier: 1.0 },
    2: { targets: 8, angleDelta: 60, timeLimit: 14000, multiplier: 1.5 },
    3: { targets: 10, angleDelta: 90, timeLimit: 13000, multiplier: 2.0 },
    4: { targets: 12, angleDelta: 135, timeLimit: 12000, multiplier: 2.8 },
    5: { targets: 15, angleDelta: 180, timeLimit: 10000, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

export const generateTrial = (angleDelta) => {
  const shapes = ['⬆', '⬇', '⬅', '➡', '↗', '↘', '↖', '↙'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const rotation = Math.floor(Math.random() * 360);
  const targetRotation = (rotation + angleDelta * (Math.random() > 0.5 ? 1 : -1) + 360) % 360;
  return {
    shape,
    rotation,
    targetRotation,
    options: [rotation, targetRotation].sort(() => Math.random() - 0.5),
  };
};

export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy, avgTime) => {
  const timeBonus = Math.max(0, 1 - (avgTime / 3000));
  const accuracyBonus = accuracy / 100;
  const totalScore = (accuracyBonus * 0.6 + timeBonus * 0.4);
  if (totalScore >= 0.85) return 3;
  if (totalScore >= 0.6) return 2;
  if (totalScore >= 0.35) return 1;
  return 0;
};

export const calculateScore = (accuracy, avgTime, difficultyMultiplier) => {
  const basePoints = accuracy * 2;
  const timeBonus = Math.max(0, 100 - Math.floor(avgTime / 20));
  const difficultyBonus = difficultyMultiplier * 10;
  return Math.max(0, Math.round(basePoints + timeBonus + difficultyBonus));
};
