import React from 'react';

// Componente para mostrar un personaje
function Character({
  name,
  charClass,
  equipped,
  strength,
  defense,
  magic,
  luck,
  agility,
  max_health,
  health,
  moves,
  actions,
  cell,
  experience,
  habilities
}) {
  return (
    <div className="character">
      <h3>{name} - {charClass}</h3>
      <p>Fuerza: {strength}</p>
      <p>Defensa: {defense}</p>
      <p>Magia: {magic}</p>
      <p>Suerte: {luck}</p>
      <p>Agilidad: {agility}</p>
      <p>Salud: {health} / {max_health}</p>
      <p>Movimientos: {moves}</p>
      <p>Acciones: {actions}</p>
      <p>Equipado: {equipped}</p>
      <p>Posición: ({cell[0]}, {cell[1]})</p>
      <p>Experiencia: {experience}</p>
      <p>Habilidades: {habilities.join(', ')}</p>
    </div>
  );
}

export default Character;