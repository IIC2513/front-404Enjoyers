import React from 'react';

// () --> { onAttack, onUsePotion, onUseItem, onEscape }
function combatActions() {
    return (
        <div className="combat-actions">
            {/* onClick={onAttack} */}
            <button>Attack</button>
            {/* onClick={onUsePotion} */}
            <button>Use Potion</button>
            {/* onClick={onUseItem} */}
            <button>Use Item</button>
            {/* onClick={onEscape} */}
            <button>Escape</button>
        </div>
    );
}

export default combatActions;
