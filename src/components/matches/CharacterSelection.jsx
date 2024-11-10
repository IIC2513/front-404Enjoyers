import React, { useState } from 'react';
import { setCharacter } from './MatchService';

function CharacterSelection({ matchId, userId }) {
    const [charClass, setCharClass] = useState('');
    const [charName, setCharName] = useState('');
    const [message, setMessage] = useState('');

    const handleCharacterSelection = async () => {
        const response = await setCharacter(parseInt(matchId), userId, charClass, charName);
        if (response.status === 'success') {
            alert("Character selected successfully.");
        } else {
            alert("Error at selecting character: " + response.message);
        }
    };

    return (
        <div>
            <h3>Select your character</h3>
            {message && <p>{message}</p>}
            <input
                type="text"
                placeholder="Name your character"
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
            />
            <select onChange={(e) => setCharClass(e.target.value)} value={charClass}>
                <option value="">Select a class</option>
                <option value="Knight">Knight</option>
                <option value="Archer">Archer</option>
                <option value="Mage">Mage</option>
                <option value="Dwarf">Dwarf</option>
                <option value="Elf">Elf</option>
                <option value="Druid">Druid</option>
            </select>
            <button onClick={handleCharacterSelection}>Confirm Character</button>
        </div>
    );
}

export default CharacterSelection;