import React from 'react';
import spriteColossum from '../../assets/imgs/colossum/left.png';
import spriteDragon from '../../assets/imgs/dragon/right.png';
import spriteGoblin from '../../assets/imgs/goblin/left.png';
import spriteElemental from '../../assets/imgs/elemental/right.png';
import spriteOgre from '../../assets/imgs/ogre/left.png';

function BattleEnemy({ enemy }) {
    if (!enemy) {
        console.error("Enemy data is missing!");
        return <div>Loading battle...</div>;  // Mostrar mensaje de carga si los datos aún no están listos
    }
    const name  = enemy.name;
    const className = enemy.class;
    const health = enemy.health;
    const maxHealth = enemy.max_health;
    const healthPercentage = (health / maxHealth) * 100;
    //console.log('Class:', className);

    const enemySprites = {
        Colossus: spriteColossum,
        Dragon: spriteDragon,
        Goblin: spriteGoblin,
        Elemental: spriteElemental,
        Ogre: spriteOgre,
    };

    const enemyImage = enemySprites[className]
    return (
        <div className="enemy-info">
            <img src={enemyImage} alt={`${name} icon`} className="enemy-icon" />
            <div className="enemy-details">
                <h3>{name}</h3>
                <div className="health-bar">
                    <div 
                        className="health-fill" 
                        style={{ width: `${healthPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default BattleEnemy;