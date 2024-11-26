import React from 'react';
import battleBackground from '../components/game/battleBackground';
import battlePlayer from '../components/game/battlePlayer';
import battleEnemy from '../components/game/battleEnemy';
import combatActions from '../components/game/combatActions';

// () --> { map, player, enemy, actions }
function BattleView() {
    return (
        <div className="battle-view">
            {/* map={map} */}
            <battleBackground />
            {/* player={player} */}
            <PlayerInfo />
            {/* enemy={enemy} */}
            <EnemyInfo />
            {/* onAttack={actions.onAttack}
                onUsePotion={actions.onUsePotion}
                onUseItem={actions.onUseItem}
                onEscape={actions.onEscape} */}
            <combatActions 
            />
        </div>
    );
}

export default BattleView;