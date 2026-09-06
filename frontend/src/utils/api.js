export const saveGameResult = async (gameName, score, accuracy, stars, difficulty, responseTime) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.warn('User not logged in – result not saved');
    return;
  }
  try {
    const res = await fetch('/api/game/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        game_name: gameName,
        score,
        accuracy,
        stars,
        difficulty,
        response_time: responseTime || 0
      })
    });
    if (!res.ok) console.warn('Failed to save result');
  } catch (e) {
    console.warn('Error saving result', e);
  }
};
