import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AssignCharacter from '../components/game/assignCharacter';
import CharacterList from '../components/game/characterList';
import { AuthContext } from '../components/auth/AuthContext';
import axios from 'axios';

function Game() {
  const { matchId } = useParams(); // Obtiene el ID de la partida de la URL
  const userId = 1;   // Agregar el ID del usuario (falta)
  const {token} = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const config = {
    'method': 'get',
    'url': `${import.meta.env.VITE_BACKEND_URL}/matches/available`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  }

  useEffect(() => {
    axios(config).then((response) => {
      console.log("Showing matches available because you are logged");
      console.log(response);
      setMsg(response.data.message);
    }).catch((error) => {
      console.log("An error ocurred. You are not logged.");
      console.log(error);
      setMsg(error.message);
    })
  }, [])

  return (
    <div className="game">
      <h1>Página de la Partida</h1>
      <h2>{msg}</h2>
      <p>ID de la partida: {matchId}</p>

      {/* Componente para asignar un personaje al usuario */}
      <AssignCharacter matchId={matchId} userId={userId} />

      {/* Componente para mostrar la lista de personajes en la partida */}
      <CharacterList />
    </div>
  );
}

export default Game;