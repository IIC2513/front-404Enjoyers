import React, { useState, useContext } from 'react';
import { joinMatch } from './MatchService';
import { AuthContext } from '../auth/AuthContext';

function JoinMatch({ userId }) {
    const [matchId, setMatchId] = useState('');
    const {token} = useContext(AuthContext);

    const handleJoinMatch = async () => {
        const response = await joinMatch(Number(matchId), userId, token);
        if (response.status === "success") {
            alert("You have joined the game!");
        } else {
            alert("Error when joining the game: " + response.message);
        }
    };

    return (
        <div>
            <h2>Join  a Match</h2>
            <input
                type="text"
                value={matchId}
                onChange={(e) => setMatchId(e.target.value)}
                placeholder="ID of the match"
            />
            <button onClick={handleJoinMatch}>Join</button>
        </div>
    );
}

export default JoinMatch;