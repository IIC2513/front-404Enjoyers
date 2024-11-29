import React from 'react';

function CombatActions({ onAttack, onUsePotion, onUseItem, onEscape }) {
    return (
        <div className="combat-actions">
            <button onClick={onAttack}>Attack</button>
            <button onClick={onEscape}>Escape</button>
        </div>
    );
}

export default CombatActions;