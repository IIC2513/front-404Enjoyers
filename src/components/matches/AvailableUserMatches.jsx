import React, { useContext, useEffect, useState } from 'react';
import { getUserMatches, getUsers} from './MatchService';
import { getBoardDetails } from '../board/BoardServices';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function AvailableUserMatches({ userId }) {
    const [matches, setMatches] = useState([]);
    const [users, setUsers] = useState([]);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMatches() {
            try{
                const response = await getUserMatches(userId, token);
                setMatches(response.matches || []);

                const usersPromises = response.matches.map(async (match) => {
                    const usersResponse = await getUsers(match.id, token);
                    return usersResponse.users;
                });

                const usersForMatches = await Promise.all(usersPromises);
                setUsers(usersForMatches);
            }catch(error){
                alert("Error at load user matches: " + error.message);
            }
        }
        fetchMatches();
    }, []);

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

    const handlePlayClick = async (match) => {

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
            <div className="matches-table">
            <div className="matches-header">
            <div>Match ID</div>
            <div>Status</div>
            <div>Players</div>
            <div>Turns</div>
            <div>Actions</div>
            </div>
            {matches.map((match, index) => (
            <div key={match.id} className="matches-row">
                <div>{match.id}</div>
                <div>{match.status}</div>
                <div>{users[index]?.length}</div>
                <div>{match.currentTurn}/{match.turns}</div>
                <div className="actions">
                {match.status === 'waiting' && (
                    <>
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        handleMatchClick(match);
                        }}
                    >
                        View
                    </button>
                    </>
                )}
                {match.status === 'in_progress' && (
                    <>
                    <button
                        className='playBtn'
                        onClick={(e) => {
                        e.stopPropagation();
                        handlePlayClick(match);
                        }}
                    >
                        Play
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

export default AvailableUserMatches;