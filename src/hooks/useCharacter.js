import { useState, useEffect } from 'react';
import { fetchCharacters } from '../scripts/characterService';

// Hook para obtener los personajes
export function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCharacters() {
      try {
        const chars = await fetchCharacters();
        setCharacters(chars);
      } catch (e) {
        setError("Error al cargar los personajes");
      } finally {
        setLoading(false);
      }
    }
    loadCharacters();
  }, []);

  return { characters, loading, error };
}