// Map games to cognitive skills
const gameSkills = {
  'Memory Match': 'Memory',
  'Sequence Recall': 'Memory',
  'Digit Span': 'Memory',
  'N‑Back': 'Working Memory',
  'Pattern Memory': 'Working Memory',
  'Target Attention': 'Attention',
  'Stroop Effect': 'Attention',
  'Flanker Task': 'Attention',
  'Visual Search': 'Visual Search',
  'Choice Reaction': 'Processing Speed',
  'Trail Making': 'Processing Speed',
  'Card Sorting': 'Flexibility',
  'Mental Rotation': 'Spatial',
};

const skillToGames = {
  'Memory': ['Memory Match', 'Sequence Recall', 'Digit Span'],
  'Working Memory': ['N‑Back', 'Pattern Memory'],
  'Attention': ['Target Attention', 'Stroop Effect', 'Flanker Task'],
  'Visual Search': ['Visual Search'],
  'Processing Speed': ['Choice Reaction', 'Trail Making'],
  'Flexibility': ['Card Sorting'],
  'Spatial': ['Mental Rotation'],
};

export const getSkill = (gameName) => gameSkills[gameName] || 'Other';

export const getGamesForSkill = (skill) => skillToGames[skill] || [];

export const analyzePerformance = (activities) => {
  if (!activities || activities.length === 0) return null;

  const skillScores = {};
  activities.forEach(act => {
    const skill = getSkill(act.game);
    if (!skill) return;
    if (!skillScores[skill]) {
      skillScores[skill] = { total: 0, count: 0 };
    }
    // Ensure score is a number
    const score = typeof act.score === 'number' ? act.score : 0;
    skillScores[skill].total += score;
    skillScores[skill].count += 1;
  });

  const averages = {};
  Object.keys(skillScores).forEach(skill => {
    averages[skill] = Math.round(skillScores[skill].total / skillScores[skill].count);
  });

  let weakest = null, strongest = null;
  let min = Infinity, max = -Infinity;
  Object.keys(averages).forEach(skill => {
    if (averages[skill] < min) { min = averages[skill]; weakest = skill; }
    if (averages[skill] > max) { max = averages[skill]; strongest = skill; }
  });

  let recommendations = [];
  if (weakest) {
    recommendations = getGamesForSkill(weakest);
    const played = activities.map(a => a.game);
    recommendations = recommendations.filter(g => !played.includes(g) || played.filter(p => p === g).length < 3);
    recommendations = recommendations.slice(0, 3);
  }

  return {
    skillAverages: averages,
    weakest,
    strongest,
    recommendations,
    totalGames: activities.length,
  };
};

export const saveActivity = (username, gameName, score, accuracy, stars, difficulty, responseTime) => {
  const key = `activities_${username}`;
  const stored = localStorage.getItem(key);
  const activities = stored ? JSON.parse(stored) : [];
  activities.push({
    id: Date.now(),
    game: gameName,
    score: typeof score === 'number' ? score : 0,
    accuracy: typeof accuracy === 'number' ? accuracy : 0,
    stars: typeof stars === 'number' ? stars : 0,
    difficulty: typeof difficulty === 'number' ? difficulty : 1,
    responseTime: typeof responseTime === 'number' ? responseTime : 0,
    date: new Date().toISOString(),
  });
  localStorage.setItem(key, JSON.stringify(activities));
  window.dispatchEvent(new CustomEvent('gameResultSaved'));
  return activities;
};

export const getActivities = (username) => {
  const key = `activities_${username}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const getPerformanceSummary = (username) => {
  const activities = getActivities(username);
  return analyzePerformance(activities);
};
