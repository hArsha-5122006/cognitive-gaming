export const getDifficultySettings = (level) => {
  const settings = {
    1: { trials: 10, congruentRatio: 0.5, timeLimit: 2000, multiplier: 1.0 },
    2: { trials: 15, congruentRatio: 0.4, timeLimit: 1800, multiplier: 1.5 },
    3: { trials: 20, congruentRatio: 0.3, timeLimit: 1600, multiplier: 2.0 },
    4: { trials: 25, congruentRatio: 0.2, timeLimit: 1400, multiplier: 2.8 },
    5: { trials: 30, congruentRatio: 0.1, timeLimit: 1200, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

export const generateTrial = (congruentRatio) => {
  const isCongruent = Math.random() < congruentRatio;
  const directions = ['←', '→'];
  const target = directions[Math.floor(Math.random() * directions.length)];
  let flankers = [];
  if (isCongruent) {
    flankers = [target, target];
  } else {
    const opposite = target === '←' ? '→' : '←';
    flankers = [opposite, opposite];
  }
  // Shuffle positions: target could be middle, flankers left/right
  const positions = ['left', 'center', 'right'];
  const shuffled = positions.sort(() => Math.random() - 0.5);
  const display = shuffled.map(pos => {
    if (pos === 'center') return target;
    else return flankers[0]; // both flankers same
  });
  return {
    display, // array of 3 strings
    target,
    correctResponse: target === '←' ? 'left' : 'right',
    isCongruent,
  };
};

export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy, avgTime) => {
  const timeBonus = Math.max(0, 1 - (avgTime / 1500));
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
