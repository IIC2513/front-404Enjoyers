
export async function getCharacter(characterId, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/characters/show/${characterId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                }
    });
    return await response.json();
}

export async function upgradeStat(characterId, stat, token) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/characters/improve-stat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                },
            body: JSON.stringify({
                id: characterId,
                stat: stat
            })
    });
    return await response.json();
}