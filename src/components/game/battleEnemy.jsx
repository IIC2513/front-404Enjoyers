import React from 'react';

// () --> { enemy }
function battleEnemy() {
    // const { icon, name, health, maxHealth } = enemy;
    // Hardcoded values for now
    const icon = '../../assets/ogre/left.png';
    const name = 'Ogre';
    const health = 100;
    const maxHealth = 130;

    const healthPercentage = (health / maxHealth) * 100;

    return (
        <div className="enemy-info">
            <img src={icon} alt={`${name} icon`} className="enemy-icon" />
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

export default battleEnemy;
