import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthContext';
import { getCharacter, upgradeStat } from '../components/stats/StatsServices';
import spriteFrontKnight from '../assets/imgs/knight/front.png';
import spriteFrontArcher from '../assets/imgs/archer/front.png';
import spriteFrontMage from '../assets/imgs/mage/front.png';
import spriteFrontDwarf from '../assets/imgs/dwarf/front.png';
import spriteFrontdruid from '../assets/imgs/druid/front.png';
import spriteFrontElf from '../assets/imgs/elf/front.png';

function Stats() {
  const { characterId } = useParams();
  const {token} = useContext(AuthContext);
  const [character, setCharacter] = useState({});
  const [sprite, setSprite] = useState('');

  const characterSprites = {
    "knight": spriteFrontKnight,
    "archer": spriteFrontArcher,
    "mage": spriteFrontMage,
    "dwarf": spriteFrontDwarf,
    "druid": spriteFrontdruid,
    "elf": spriteFrontElf,
};

  async function fetchStats() {
    const characterResponse = await getCharacter(characterId, token);
    if (characterResponse.status === 'success'){
      setCharacter(characterResponse.character);
      setSprite(characterSprites[characterResponse.character.class.toLowerCase()]);
    }
    else{
      console.error(`Error: ${characterResponse.message}`);
    }
  }

  useEffect(() => {
    fetchStats();
  }, [])

  const handleUpgrade = async (stat) => {
    const upgradeResponse = await upgradeStat(characterId, stat, token);
    alert(upgradeResponse.message);
    fetchStats();
  }

  return (
    <div className="stats">
      <h1>Your Stats</h1>
      <h2>{character?.name} - {character?.class}</h2>
      <section>
      <div className='current-stats'>
        <div className='upgradable'>
          <h3>Strength: {character?.strength}</h3>
          <button
           onClick={() => {
            handleUpgrade('strength')
           }}
          >
            +
          </button>
        </div>
        <div className='upgradable'>
          <h3>Defense: {character?.defense}</h3> 
          <button
           onClick={() => {
            handleUpgrade('defense')
           }}
          >
            +
          </button>
        </div>
        <div className='upgradable'>
          <h3>Magic: {character?.magic}</h3>
          <button
           onClick={() => {
            handleUpgrade('magic')
           }}
          >
            +
          </button>
        </div> 
        <div className='upgradable'>
          <h3>Luck: {character?.luck}</h3>
          <button
           onClick={() => {
            handleUpgrade('luck')
           }}
          >
            +
          </button>
        </div>
        <div className='upgradable'>
          <h3>Agility: {character?.agility}</h3>
          <button
           onClick={() => {
            handleUpgrade('agility')
           }}
          >
            +
          </button>
        </div>
        <div className='not-upgradable'>
          <h3>Health: {character?.health}/{character?.max_health}</h3>
        </div>
        <div className='not-upgradable'>
          <h3>Experience: {character?.experience}</h3>
        </div>
      </div>
      <div className='sprite'>
        {character && sprite &&
        (<img
          src = {sprite}
          className = "stat-character-sprite"
          alt = {character.class}
          />)}
      </div>
      </section>
    </div>
  );
}

export default Stats;