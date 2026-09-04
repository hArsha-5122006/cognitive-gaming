const API_BASE_URL = "http://127.0.0.1:5000";

export async function saveGameResult(result) {
  const response = await fetch(`${API_BASE_URL}/results/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error("Failed to save game result");
  }

  return response.json();
}

export async function getGameResults() {
  const response = await fetch(`${API_BASE_URL}/results/`);

  if (!response.ok) {
    throw new Error("Failed to fetch game results");
  }

  return response.json();
}
