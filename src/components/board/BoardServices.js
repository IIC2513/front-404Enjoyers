const BASE_URL = 'http://localhost:3000';

export async function getBoardDetails(matchId) {
    try {
        const response = await fetch(`${BASE_URL}/boards/${matchId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch board details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getBoardDetails:', error);
        return { status: 'error', message: error.message };
    }
}

export async function moveCharacter(character, matchId, x, y) {
    console.log("Attempting to move character with", {
        match_id: matchId,
        char_id: character.id,
        x,
        y,
    });
    try {
        const response = await fetch(`${BASE_URL}/boards/move`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                match_id: matchId,
                char_id: character.id,
                x,
                y
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.message === "No valid path to the destination.") {
                throw new Error("Movement blocked by an obstacle.");
            }
            if (errorData.message === "Cell out of reach.") {
                throw new Error("Cell out of reach.");
            }
            throw new Error(errorData.message || 'Failed to move character');
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error in moveCharacter:", error);
        throw error;
    }
}