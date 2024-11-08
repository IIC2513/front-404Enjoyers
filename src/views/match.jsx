import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMatch, joinMatch } from '../scripts/matchService'; // Servicio para manejar partidas

function Match() {
  const [matchId, setMatchId] = useState('');
  const navigate = useNavigate();

  const handleCreateMatch = async () => {
    const response = await createMatch(); // Llama al servicio para crear una partida
    if (response.status === "success") {
      navigate(`/game/${response.matchId}`); // Redirige a la pantalla de juego con el ID de la partida
    } else {
      alert("Error al crear la partida");
    }
  };

  const handleJoinMatch = async () => {
    const response = await joinMatch(matchId); // Llama al servicio para unirse a una partida
    if (response.status === "success") {
      navigate(`/game/${matchId}`); // Redirige a la pantalla de juego con el ID de la partida
    } else {
      alert("Error al unirse a la partida");
    }
  };

  return (
    <div className="match">
      <h1>Selecciona una Partida</h1>
      <button onClick={handleCreateMatch}>Crear Partida</button>

      <input
        type="text"
        placeholder="ID de la Partida"
        value={matchId}
        onChange={(e) => setMatchId(e.target.value)}
      />
      <button onClick={handleJoinMatch}>Unirse a Partida</button>
    </div>
  );
}

export default Match;