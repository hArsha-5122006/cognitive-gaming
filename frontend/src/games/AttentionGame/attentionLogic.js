// attentionLogic.js

export const getDifficultySettings = (level) => {
  const settings = {
    1: { gridSize: 3, displayTime: 4000, multiplier: 1.0, targetCount: 1 },   // Easy
    2: { gridSize: 4, displayTime: 3500, multiplier: 1.5, targetCount: 2 },   // Medium
    3: { gridSize: 5, displayTime: 3000, multiplier: 2.0, targetCount: 3 },   // Hard
    4: { gridSize: 6, displayTime: 2500, multiplier: 2.8, targetCount: 4 },   // Very Hard
    5: { gridSize: 7, displayTime: 2000, multiplier: 3.5, targetCount: 5 },   // Expert
  };
  return settings[level] || settings[1];
};

export const generateGrid = (gridSize, targetCount) => {
  const total = gridSize * gridSize;
  const colors = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '🔷', '🔶', '🔺', '⬛', '⬜', '🟥'];
  
  // Pick a random base color
  const baseColorIndex = Math.floor(Math.random() * colors.length);
  const baseColor = colors[baseColorIndex];
  
  // Pick a different color for targets
  let targetColor;
  do {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
  } while (targetColor === baseColor);
  
  // Randomly select positions for targets
  const targetPositions = [];
  const allPositions = Array.from({ length: total }, (_, i) => i);
  
  for (let i = 0; i < targetCount; i++) {
    const randomIndex = Math.floor(Math.random() * allPositions.length);
    targetPositions.push(allPositions.splice(randomIndex, 1)[0]);
  }
  
  // Build the grid
  const grid = [];
  for (let i = 0; i < total; i++) {
    if (targetPositions.includes(i)) {
      grid.push({ id: i, color: targetColor, isTarget: true });
    } else {
      grid.push({ id: i, color: baseColor, isTarget: false });
    }
  }
  
  return grid;
};

export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const calculateStars = (accuracy, responseTime, maxTime) => {
  const timeBonus = Math.max(0, 1 - (responseTime / maxTime));
  const accuracyBonus = accuracy / 100;
  const totalScore = (accuracyBonus * 0.7 + timeBonus * 0.3);
  
  if (totalScore >= 0.85) return 3;
  if (totalScore >= 0.6) return 2;
  if (totalScore >= 0.35) return 1;
  return 0;
};

export const calculateScore = (correct, total, responseTime, difficultyMultiplier) => {
  const accuracy = calculateAccuracy(correct, total);
  const basePoints = correct * 20;
  const timeBonus = Math.max(0, 100 - Math.floor(responseTime / 50));
  const difficultyBonus = difficultyMultiplier * 10;
  
  return Math.max(0, basePoints + timeBonus + difficultyBonus);
};
