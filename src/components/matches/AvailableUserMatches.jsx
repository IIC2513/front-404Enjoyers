import React, { useContext, useEffect, useState } from 'react';
import { getUserMatches } from './MatchService';
import { getBoardDetails } from '../board/BoardServices';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function AvailableUserMatches({ userId }) {
    const [matches, setMatches] = useState([]);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

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

    const handleMatchClick = async (match) => {

        try {
            const boardDetails = await getBoardDetails(match.id, token)
            console.log(boardDetails);
            if (boardDetails){
                navigate(`/boards/${match.id}`)
            } else {
                alert("Board not found")
            }
        } catch (error) {
            alert("Error retrieving board details: " + error.message);
        }
    };

    return (
        <div>
            <h2>Matches you are already in</h2>
            <ul>
                {matches.map((match) => (
                    <li key={match.id} 
                        onClick={() => handleMatchClick(match)}
                        style={{ cursor: 'pointer', color: match.public ? 'black' : 'red' }}
                        >ID: {match.id} ({match.status})</li>
                ))}
            </ul>
        </div>
    );
}

export default AvailableUserMatches;