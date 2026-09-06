export const getDifficultySettings = (level) => {
  const settings = {
    1: { gridSize: 4, targetCount: 1, distractorRatio: 0.2, timeLimit: 8000, multiplier: 1.0 },
    2: { gridSize: 5, targetCount: 2, distractorRatio: 0.3, timeLimit: 7000, multiplier: 1.5 },
    3: { gridSize: 6, targetCount: 3, distractorRatio: 0.4, timeLimit: 6000, multiplier: 2.0 },
    4: { gridSize: 7, targetCount: 4, distractorRatio: 0.5, timeLimit: 5000, multiplier: 2.8 },
    5: { gridSize: 8, targetCount: 5, distractorRatio: 0.6, timeLimit: 4000, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

const symbols = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '🔷', '🔶', '🔺', '⬛', '⬜', '🟥'];

export const generateGrid = (gridSize, targetCount, distractorRatio) => {
  const total = gridSize * gridSize;
  const grid = [];
  // Choose target symbol
  const targetSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  // Choose distractor symbols (different from target)
  let distractors = symbols.filter(s => s !== targetSymbol);
  // Shuffle distractors
  distractors = distractors.sort(() => Math.random() - 0.5);
  // Number of distractors to use
  const numDistractors = Math.min(distractors.length, Math.floor(total * distractorRatio));
  const usedDistractors = distractors.slice(0, numDistractors);
  
  // Fill grid with target and distractors
  for (let i = 0; i < total; i++) {
    let symbol;
    if (i < targetCount) {
      symbol = targetSymbol;
    } else {
      // Pick a random distractor
      symbol = usedDistractors[Math.floor(Math.random() * usedDistractors.length)];
    }
    grid.push({ id: i, symbol, isTarget: i < targetCount });
  }
  // Shuffle grid
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [grid[i], grid[j]] = [grid[j], grid[i]];
  }
  return grid;
};

export const calculateAccuracy = (correct, totalTargets) => {
  if (totalTargets === 0) return 0;
  return Math.round((correct / totalTargets) * 100);
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

export const calculateScore = (correct, totalTargets, timeTaken, timeLimit, difficultyMultiplier) => {
  const accuracy = calculateAccuracy(correct, totalTargets);
  const basePoints = correct * 15;
  const timeBonus = Math.max(0, 100 - Math.floor((timeTaken / 1000) * 2));
  const difficultyBonus = difficultyMultiplier * 10;
  return Math.max(0, Math.round(basePoints + timeBonus + difficultyBonus));
};
