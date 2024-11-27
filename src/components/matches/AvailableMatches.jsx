import React, { useContext, useEffect, useState } from 'react';
import { getAvailableMatches, joinMatch, getMatchDetails, getUsers } from './MatchService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

function AvailableMatches({ userId }) {
    const [matches, setMatches] = useState([]);
    const [users, setUsers] = useState([])
    const [joinStatus, setJoin] = useState(false);
    const [viewStatus, setView] = useState(true);
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);

    async function fetchMatches() {
        try {
            const matchesResponse = await getAvailableMatches(token);
            const availableMatches = matchesResponse.availableMatches || [];

            setMatches(availableMatches);

            const usersPromises = availableMatches.map(async (match) => {
                const usersResponse = await getUsers(match.id, token);
                return usersResponse.users;
            });

            const usersForMatches = await Promise.all(usersPromises);
            setUsers(usersForMatches);
        } catch (error) {
            alert("Error at load available matches: " + error.message);
        }
    }

    useEffect(() => {
        fetchMatches();
    }, []);

    // Función para verificar si usuario puede entrar a partida
    const isJoinable = (index) => {
        if (!users[index]){
            return false;
        }
        const usersId = users[index].map(user => user.id);
        const inMatch = usersId.includes(Number(userId));
        if (inMatch){
            return false;
        }
        return true;
    };

    // Función para verificar si el usuario ya está en la partida
    const isUserInMatch = (index) => {
        if (!users[index]){
            return false;
        }
        const usersId = users[index].map(user => user.id);
        return usersId.includes(Number(userId));
    };


    // Manejar la unión a una partida
    const handleJoinMatch = async (match, index) => {
        if (isUserInMatch(index)) {
            alert(`You already have joined match with ID: ${match.id}`);
            return;
        }

        if (users[index].length >= 4) { // Cambio aquí: comparar con `>=` y no `=`
            alert(`The match with ID: ${match.id} is full.`);
            return;
        }
        try {
            const response = await joinMatch(match.id, userId, token);
            if (response.status === 'success') {
                alert(`You have joined de match with ID: ${match.id}`);
                fetchMatches();
            } else {
                alert(`Error when joining the match: ${response.message}`);
            }
        } catch (error) {
            alert("Error when trying to join the the match: " + error.message);
        }
    };

    const handleMatchClick = async (match) => {
        try {
            const matchDetails = await getMatchDetails(match.id, token);
            if (matchDetails) {
                console.log(`Navigating to match with ID: ${match.id}`);
               navigate(`/matches/${match.id}`);
            } else {
                alert("Match not found.");
            }
        } catch (error) {
            alert("Error retrieving match details: " + error.message);
        }
    };

    return (
        <div className="matches-container">
        <h2>Waiting Matches</h2>
        <div className="matches-table">
            <div className="matches-header">
            <div>Match ID</div>
            <div>Public</div>
            <div>Players</div>
            <div>Turns</div>
            <div>Actions</div>
            </div>
            {matches.map((match, index) => (
            <div key={match.id} className="matches-row">
                <div>{match.id}</div>
                <div>{match.public ? 'Yes' : 'No'}</div>
                <div>{users[index]?.length}/4</div>
                <div>{match.turns}</div>
                <div className="actions">
                {match.status === 'waiting' && (
                    <>
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        handleJoinMatch(match, index);
                        }}
                        disabled={!isJoinable(index)}
                    >
                        Join
                    </button>
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        handleMatchClick(match);
                        }}
                        disabled={!isUserInMatch(index)}
                    >
                        View
                    </button>
                    </>
                )}
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default AvailableMatches;
