export const getDifficultySettings = (level) => {
  const settings = {
    1: { points: 8, mixed: false, timeLimit: 30000, multiplier: 1.0 },
    2: { points: 12, mixed: false, timeLimit: 25000, multiplier: 1.5 },
    3: { points: 16, mixed: true, timeLimit: 20000, multiplier: 2.0 },
    4: { points: 20, mixed: true, timeLimit: 18000, multiplier: 2.8 },
    5: { points: 24, mixed: true, timeLimit: 15000, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

export const generatePoints = (count, mixed) => {
  const points = [];
  if (!mixed) {
    // Numbers only (1, 2, 3, ...)
    for (let i = 1; i <= count; i++) {
      points.push({ id: i, label: String(i), type: 'number' });
    }
  } else {
    // Mixed numbers and letters (1, A, 2, B, 3, C, ...)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const maxPairs = Math.min(count, 12);
    for (let i = 0; i < maxPairs; i++) {
      points.push({ id: i * 2 + 1, label: String(i + 1), type: 'number' });
      if (i + 1 <= maxPairs) {
        points.push({ id: i * 2 + 2, label: letters[i], type: 'letter' });
      }
    }
    // Trim to exact count
    while (points.length > count) points.pop();
  }
  // Shuffle positions (but keep order in array for sequence)
  // We'll assign random positions on a grid later
  return points;
};

export const shufflePositions = (points, gridCols, gridRows) => {
  const total = gridCols * gridRows;
  const positions = [];
  for (let i = 0; i < total; i++) {
    positions.push(i);
  }
  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  // Assign positions to points (ensure they are spread out)
  const shuffledPoints = points.map((p, idx) => ({
    ...p,
    position: positions[idx % positions.length]
  }));
  return shuffledPoints;
};

export const calculateAccuracy = (errors, total) => {
  if (total === 0) return 0;
  // Accuracy = correct clicks / total clicks (each click is a point, errors are extra clicks)
  // We'll define accuracy as (total - errors) / total * 100
  const correct = total - errors;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy, timeTaken, timeLimit) => {
  const timeBonus = Math.max(0, 1 - (timeTaken / timeLimit));
  const accuracyBonus = accuracy / 100;
  const totalScore = (accuracyBonus * 0.6 + timeBonus * 0.4);
  if (totalScore >= 0.85) return 3;
  if (totalScore >= 0.6) return 2;
  if (totalScore >= 0.35) return 1;
  return 0;
};

export const calculateScore = (accuracy, timeTaken, timeLimit, difficultyMultiplier) => {
  const basePoints = accuracy * 2;
  const timeBonus = Math.max(0, 100 - Math.floor((timeTaken / 1000) * 1.5));
  const difficultyBonus = difficultyMultiplier * 10;
  return Math.max(0, Math.round(basePoints + timeBonus + difficultyBonus));
};
