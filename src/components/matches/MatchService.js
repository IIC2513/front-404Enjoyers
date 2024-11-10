const BASE_URL = "http://localhost:3000";

// Funcion para crear una partida
export async function createMatch(user_id, turns, isPublic) {
    const response = await fetch(`${BASE_URL}/matches/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, turns, public: isPublic })
    });
    return await response.json();
}

// Funcion para unirse a una partida
export async function joinMatch(match_id, user_id, password = null) {
    const response = await fetch(`${BASE_URL}/matches/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ match_id, user_id, password })
    });
    return await response.json();
}

// Funcion para abandonar una partida
export async function leaveMatch(match_id, user_id) {
    const response = await fetch(`${BASE_URL}/matches/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id, user_id })
    });
    return await response.json();
}

// Funcion para avanzar al siguiente turno
export async function nextTurn(match_id) {
    const response = await fetch(`${BASE_URL}/matches/next_turn`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id })
    });
    return await response.json();
}

// Funcion para avanzar al siguiente jugador
export async function nextPlayer(match_id) {
    const response = await fetch(`${BASE_URL}/matches/next_player`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id })
    });
    return await response.json();
}

// Funcion para finalizar una partida
export async function finishMatch(match_id, winner_id) {
    const response = await fetch(`${BASE_URL}/matches/finish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id, winner_id })
    });
    return await response.json();
}

// Funcion para obtener las partidas disponibles
export async function getAvailableMatches() {
    const response = await fetch(`${BASE_URL}/matches/available`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

// Funcion para obtener las partidas en las que el usuario esta participando
export async function getUserMatches(user_id) {
    try {
        const response = await fetch(`${BASE_URL}/matches/user/${user_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las partidas del usuario:", error);
        return { userMatches: [] }; // Devuelve un array vacío en caso de error
    }
}

// Funcion para obtener los detalles de una partida
export async function getMatchDetails(matchId) {
    const response = await fetch(`${BASE_URL}/matches/${matchId}`);
    return response.json();
}

// Funcion para seleccionar un personaje
export async function setCharacter(matchId, userId, charClass, charName) {
    const response = await fetch(`${BASE_URL}/matches/set_character`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ match_id: matchId, user_id: userId, char_class: charClass, char_name: charName })
    });
    return response.json();
}

// Funcion para empezar una partida
export async function startMatch(matchId, map) {
    const response = await fetch(`${BASE_URL}/matches/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ match_id: matchId, map })
    });
    return response.json();
}