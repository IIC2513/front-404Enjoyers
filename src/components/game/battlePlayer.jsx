import React from 'react';

// () --> { player }
function battlePlayer({ player }) {
    // const { icon, username, health, maxHealth, stats } = player;

    // Hardcoded values for now
    const icon = '../../assets/knight/right.png';
    const name = 'Knight';
    const health = 100;
    const maxHealth = 100;
    const stats = {
        strength: 7,
        defense: 7,
        magic: 3,
        luck: 5,
        agility: 5,
    };

    const healthPercentage = (health / maxHealth) * 100;

    return (
        <div className="player-info">
            <img src={icon} alt={`${name} icon`} className="player-icon" />
            <div className="player-details">
                <h3>{name}</h3>
                <div className="health-bar">
                    <div 
                        className="health-fill" 
                        style={{ width: `${healthPercentage}%` }}
                    />
                </div>
                <ul>
                    <li>Strength: {stats.strength}</li>
                    <li>Defense: {stats.defense}</li>
                    <li>Agility: {stats.agility}</li>
                    <li>Magic: {stats.magic}</li>
                    <li>Luck: {stats.luck}</li>
                </ul>
            </div>
        </div>
    );
}

export default battlePlayer;