export async function executeCombatAction(fightId, action, habilityId = null, token) {
    //console.log('Token:', token);
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fights/${fightId}/actions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                action,
                habilityId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to execute combat action.');
        }

        return await response.json();  
    } catch (error) {
        console.error('Error executing combat action:', error);
        throw error; 
    }
}

export async function startFight(charId, token) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fights/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                char_id: charId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to start fight.');
        }
        const data = await response.json();
        //console.log('Fight started service:', data);
        console.log('Fight datda service:', data.fight);
        //console.log('Player:', data.player);
        console.log('Enemy:', data.enemy);
        //console.log('Player2:', data.fight.player);
        //console.log('Enemy2:', data.fight.enemy);
        return data;
    } catch (error) {
        console.error('Error initiating fight:', error);
        throw error;
    }
}