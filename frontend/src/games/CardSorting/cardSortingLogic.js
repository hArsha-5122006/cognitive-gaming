export const getDifficultySettings = (level) => {
  const settings = {
    1: { dimensions: ['color'], cardsPerRound: 4, switchAfter: 3, multiplier: 1.0 },
    2: { dimensions: ['color', 'shape'], cardsPerRound: 6, switchAfter: 4, multiplier: 1.5 },
    3: { dimensions: ['color', 'shape'], cardsPerRound: 8, switchAfter: 5, multiplier: 2.0 },
    4: { dimensions: ['color', 'shape', 'number'], cardsPerRound: 10, switchAfter: 4, multiplier: 2.8 },
    5: { dimensions: ['color', 'shape', 'number'], cardsPerRound: 12, switchAfter: 3, multiplier: 3.5 },
  };
  return settings[level] || settings[1];
};

const colors = ['Red', 'Blue', 'Green'];
const shapes = ['Circle', 'Square', 'Triangle'];
const numbers = [1, 2, 3];

export const generateCards = (count) => {
  const cards = [];
  for (let i = 0; i < count; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    cards.push({ id: i, color, shape, number });
  }
  return cards;
};

export const generateRule = (dimension) => {
  if (dimension === 'color') {
    const value = colors[Math.floor(Math.random() * colors.length)];
    return { dimension: 'color', value, description: `Sort by color: ${value}` };
  } else if (dimension === 'shape') {
    const value = shapes[Math.floor(Math.random() * shapes.length)];
    return { dimension: 'shape', value, description: `Sort by shape: ${value}` };
  } else if (dimension === 'number') {
    const value = numbers[Math.floor(Math.random() * numbers.length)];
    return { dimension: 'number', value, description: `Sort by number: ${value}` };
  }
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
  const timeBonus = Math.max(0, 100 - Math.floor(avgTime / 30));
  const difficultyBonus = difficultyMultiplier * 15;
  return Math.max(0, Math.round(basePoints + timeBonus + difficultyBonus));
};
