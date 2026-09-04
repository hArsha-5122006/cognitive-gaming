// Generate the cards for the memory game
export function generateCards() {
  const values = [
    "🐶",
    "🐱",
    "🐭",
    "🐰",
    "🦊",
    "🐼"
  ];

  // Create two copies of every value
  const cards = [...values, ...values];

  // Shuffle the cards
  return cards
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({
      id: index,
      value: value
    }));
}


// Check whether two selected cards match
export function checkMatch(card1, card2) {
  if (!card1 || !card2) {
    return false;
  }

  return card1.value === card2.value;
}


// Calculate the player's score
export function calculateScore(matches, mistakes, totalPairs = 6) {
  const baseScore = matches * 100;

  const penalty = mistakes * 20;

  const score = baseScore - penalty;

  return Math.max(score, 0);
}


// Calculate accuracy
export function calculateAccuracy(matches, mistakes) {
  const totalAttempts = matches + mistakes;

  if (totalAttempts === 0) {
    return 0;
  }

  return Math.round((matches / totalAttempts) * 100);
}