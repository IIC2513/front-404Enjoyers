import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CharacterSelection from '../components/matches/CharacterSelection';
import MapSelection from '../components/matches/MapSelection';
import { getMatchDetails, startMatch } from '../components/matches/MatchService';

function MatchDetail() {
    const { matchId } = useParams(); // Obtenemos `matchId` de la URL
    const [match, setMatch] = useState(null);
    const [message, setMessage] = useState('');
    const userId = 1; // Dato harcodeado, debería ser el ID del usuario logueado

    useEffect(() => {
        async function fetchMatchDetails() {
            try {
                const response = await getMatchDetails(parseInt(matchId));
                setMatch(response.match);
            } catch (error) {
                console.error("Error fetching match details:", error);
                setMessage("Error loading match details");
            }
        }
        fetchMatchDetails();
    }, [matchId]);

    const handleStartGame = async () => {
        if (match.users[0] === userId) { // Solo el creador puede iniciar
            const response = await startMatch(parseInt(matchId), match.selectedMap);
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
            {match.users[0] === userId && <MapSelection match={match} setMatch={setMatch} />}
            
            {/* Botón de Iniciar Partida (solo para el creador) */}
            {match.users[0] === userId && (
                <button onClick={handleStartGame}>Iniciar Partida</button>
            )}
        </div>
    );
}

export default MatchDetail;