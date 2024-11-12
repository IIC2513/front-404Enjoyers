import React, { useContext, useEffect, useState } from 'react';
import { getUserMatches } from './MatchService';
import { AuthContext } from '../auth/AuthContext';

function AvailableUserMatches({ userId }) {
    const [matches, setMatches] = useState([]);
    const {token} = useContext(AuthContext);

    useEffect(() => {
        async function fetchMatches() {
            try{
                const response = await getUserMatches(userId, token);
                setMatches(response.matches || []);
            }catch(error){
                alert("Error at load user matches: " + error.message);
            }
        }
        fetchMatches();
    }, []);

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