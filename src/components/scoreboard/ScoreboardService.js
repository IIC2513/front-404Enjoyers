// Funcion para obtener personajes de una partida
export async function getCharacters(matchId, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/matches/${matchId}/characters`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
         },
    });
    return response.json();
}