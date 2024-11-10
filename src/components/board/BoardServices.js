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