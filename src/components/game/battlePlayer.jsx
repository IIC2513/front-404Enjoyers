import React from 'react';
import spritebackKnight from '../../assets/imgs/knight/back.png';
import spritebackArcher from '../../assets/imgs/archer/back.png';
import spritebackMage from '../../assets/imgs/mage/back.png';
import spritebackDwarf from '../../assets/imgs/dwarf/back.png';
import spritebackdruid from '../../assets/imgs/druid/back.png';
import spritebackElf from '../../assets/imgs/elf/back.png';

function BattlePlayer({ player }) {
    if (!player) {
        console.error("Player data is missing!");
        return <div>Loading battle...</div>;  // Mostrar mensaje de carga si los datos aún no están listos
    }
    const name  = player.name;
    const className = player.class;
    const health = player.health;
    const maxHealth = player.max_health;
    const strength = player.strength;
    const defense = player.defense;
    const agility = player.agility;
    const magic = player.magic;
    const luck = player.luck;
    const habilities = player.habilities;
    const experience = player.experience;
    const healthPercentage = (health / maxHealth) * 100;

    //console.log('Class:', className);

    const playerSprites = {
        Knight: spritebackKnight,
        Archer: spritebackArcher,
        Mage: spritebackMage,
        Dwarf: spritebackDwarf,
        Druid: spritebackdruid,
        Elf: spritebackElf,
    };

    const playerImage = playerSprites[className]

    return (
        <div className="player-info">
            <img src={playerImage} alt={`${name} icon`} className="player-icon" />
            <div className="player-details">
                <h3>{name}</h3>
                <div className="health-bar">
                    <div 
                        className="health-fill" 
                        style={{ width: `${healthPercentage}%` }}
                    />
                </div>
                <ul>
                <li>Strength: {strength}</li>
                    <li>Defense: {defense}</li>
                    <li>Agility: {agility}</li>
                    <li>Magic: {magic}</li>
                    <li>Luck: {luck}</li>
                </ul>
            </div>
        </div>
    );
}

export default BattlePlayer;