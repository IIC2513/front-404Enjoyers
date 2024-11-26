
// Asignar un personaje a una partida
export async function setCharacter(match_id, user_id, char_class, char_name) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/matches/set_character`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ match_id, user_id, char_class, char_name })
    });
    return await response.json();
  }
  
  // Crear un nuevo personaje
  export async function createCharacter(char_class, char_name) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/characters/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ char_class, char_name })
    });
    return await response.json();
  }
  
  // Obtener la lista de personajes
  export async function fetchCharacters() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/characters`);
    const data = await response.json();
    return data.chars;
  }

  // Mejorar un atributo
  export async function improveStat(characterID, stat, xpCost) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/characters/improve-stat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: characterID, stat, xp_cost: xpCost })
    });
    return await response.json();
  }
  
  // Equipar un objeto
  export async function equipItem(char_id, item_id) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/characters/equip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ char_id, item_id })
    });
    return await response.json();
  }
  
  // Usar un consumible
  export async function useItem(char_id, item_id) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/characters/use`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ char_id, item_id })
    });
    return await response.json();
  }