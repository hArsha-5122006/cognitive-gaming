export const getDifficultySettings = (level) => {
  const settings = {
    1: { stimuli: ['⬅️', '➡️'], trials: 10, interval: 1500, multiplier: 1.0 },
    2: { stimuli: ['⬅️', '➡️', '⬆️', '⬇️'], trials: 15, interval: 1200, multiplier: 1.5 },
    3: { stimuli: ['⬅️', '➡️', '⬆️', '⬇️'], trials: 20, interval: 1000, multiplier: 2.0 },
    4: { stimuli: ['⬅️', '➡️', '⬆️', '⬇️', '↗️', '↘️'], trials: 25, interval: 800, multiplier: 2.8 },
    5: { stimuli: ['⬅️', '➡️', '⬆️', '⬇️', '↗️', '↘️', '↖️', '↙️'], trials: 30, interval: 600, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

export const generateTrial = (difficulty) => {
  const { stimuli } = getDifficultySettings(difficulty);
  const stimulus = stimuli[Math.floor(Math.random() * stimuli.length)];
  return stimulus;
};

export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy, avgTime) => {
  const timeBonus = Math.max(0, 1 - (avgTime / 1500));
  const accuracyBonus = accuracy / 100;
  const totalScore = (accuracyBonus * 0.5 + timeBonus * 0.5);
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
