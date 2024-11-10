import React, { useEffect, useState } from 'react';
import { getUserMatches } from './MatchService';

function AvailableUserMatches({ userId }) {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        async function fetchMatches() {
            const response = await getUserMatches(userId);
            setMatches(response.matches || []);
        }
        fetchMatches();
    }, [userId]);

    return (
        <div>
            <h2>Matches you are already in</h2>
            <ul>
                {matches.map((match) => (
                    <li key={match.id}>ID: {match.id}</li>
                ))}
            </ul>
        </div>
    );
}

export default AvailableUserMatches;