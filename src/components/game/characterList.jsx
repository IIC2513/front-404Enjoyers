import React from 'react';
import Character from './character';
import { useCharacters } from '../../hooks/useCharacter';


// Componente para mostrar la lista de personajes
function CharacterList() {
  const { characters, loading, error } = useCharacters();

  if (loading) return <p>Cargando personajes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="character-list">
      {characters.map((char) => (
        <Character key={char.id} {...char} />
      ))}
    </div>
  );
}

export default CharacterList;