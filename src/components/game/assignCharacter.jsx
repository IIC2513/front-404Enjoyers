import React, { useState } from 'react';
import { setCharacter } from '../../scripts/characterService';

// Componente para asignar un personaje a una partida
function AssignCharacter({ matchId, userId }) {
  const [charClass, setCharClass] = useState("");
  const [charName, setCharName] = useState("");

  const handleAssign = async () => {
    const response = await setCharacter(matchId, userId, charClass, charName);
    if (response.status === "success") {
      alert("Personaje asignado exitosamente!");
    } else {
      alert("Error al asignar personaje");
    }
  };

  return (
    <div className="assign-character">
      <input
        type="text"
        placeholder="Nombre del personaje"
        value={charName}
        onChange={(e) => setCharName(e.target.value)}
      />
      <select value={charClass} onChange={(e) => setCharClass(e.target.value)}>
        <option value="">Selecciona una clase</option>
        <option value="Knight">Knight</option>
        <option value="Archer">Archer</option>
        <option value="Mage">Mage</option>
        <option value="Dwarf">Dwarf</option>
        <option value="Elf">Elf</option>
        <option value="Druid">Druid</option>
      </select>
      <button onClick={handleAssign}>Asignar Personaje</button>
    </div>
  );
}

export default AssignCharacter;