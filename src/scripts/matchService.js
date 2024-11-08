const BASE_URL = "http://localhost:3000";

export async function createMatch() {
  const response = await fetch(`${BASE_URL}/matches/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  return await response.json();
}

export async function joinMatch(matchId) {
  const response = await fetch(`${BASE_URL}/matches/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ match_id: matchId })
  });
  return await response.json();
}