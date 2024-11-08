import React from 'react';
import { useParams } from 'react-router-dom';
import AssignCharacter from '../components/game/assignCharacter';
import CharacterList from '../components/game/characterList';

function Game() {
  const { matchId } = useParams(); // Obtiene el ID de la partida de la URL
  const userId = 1;   // Agregar el ID del usuario (falta)

  return (
    <div className="game">
      <h1>Página de la Partida</h1>
      <p>ID de la partida: {matchId}</p>

      {/* Componente para asignar un personaje al usuario */}
      <AssignCharacter matchId={matchId} userId={userId} />

      {/* Componente para mostrar la lista de personajes en la partida */}
      <CharacterList />
    </div>
  );
}

export default Game;