import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CharacterSelection from '../components/matches/CharacterSelection';
import MapSelection from '../components/matches/MapSelection';
import { getMatchDetails, startMatch, getUsers } from '../components/matches/MatchService';
import { AuthContext } from '../components/auth/AuthContext';
import parseJwt from '../components/auth/AuthParser';

function MatchDetail() {
    const { matchId } = useParams(); // Obtenemos `matchId` de la URL
    const [match, setMatch] = useState(null);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([])
    const {token} = useContext(AuthContext);
    const [isCreator, setCreator] = useState(false)
    const userId = Number(parseJwt(token)?.sub);

    useEffect(() => {
        async function fetchMatchDetails() {
            try {
                const response = await getMatchDetails(parseInt(matchId), token);
                setMatch(response.match);
                const usersResponse = await getUsers(parseInt(matchId), token);
                setUsers(usersResponse.users);
                if (usersResponse.users[0].id === userId){
                    setCreator(true);
                }
            } catch (error) {
                console.error("Error fetching match details:", error);
                setMessage("Error loading match details");
            }
        }
        fetchMatchDetails();
    }, [matchId]);

    const handleStartGame = async () => {
        if (users[0].id === userId) { // Solo el creador puede iniciar
            const response = await startMatch(parseInt(matchId), match.selectedMap, token);
            if (response.status === 'success') {
                alert("Game successfully started!");
            } else {
                alert("Error starting the game " + response.message);
            }
        } else {
            alert("The creator of the match must start the game");
        }
    };

    if (!match) return <p>Loading match details...</p>;

    return (
        <div>
            <h2>Match ID{matchId}</h2>
            {message && <p>{message}</p>}
            
            {/* Selección de Personaje */}
            <CharacterSelection matchId={matchId} userId={userId} />
            
            {/* Selección de Mapa (solo para el creador) */}
            {isCreator && <MapSelection match={match} setMatch={setMatch} />}
            
            {/* Botón de Iniciar Partida (solo para el creador) */}
            {isCreator && (
                <button onClick={handleStartGame}>Start Match</button>
            )}
        </div>
    );
}

export default MatchDetail;