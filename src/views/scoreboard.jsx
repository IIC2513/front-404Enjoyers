import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthContext';
import { getCharacters } from '../components/scoreboard/ScoreboardService';
import spriteFrontKnight from '../assets/imgs/knight/front.png';
import spriteFrontArcher from '../assets/imgs/archer/front.png';
import spriteFrontMage from '../assets/imgs/mage/front.png';
import spriteFrontDwarf from '../assets/imgs/dwarf/front.png';
import spriteFrontdruid from '../assets/imgs/druid/front.png';
import spriteFrontElf from '../assets/imgs/elf/front.png';

function Scoreboard() {
  const { matchId } = useParams();
  const {token} = useContext(AuthContext);
  const [characters, setCharacters] = useState([]);
  const [match, setMatch] = useState({});

  const characterSprites = {
    "knight": spriteFrontKnight,
    "archer": spriteFrontArcher,
    "mage": spriteFrontMage,
    "dwarf": spriteFrontDwarf,
    "druid": spriteFrontdruid,
    "elf": spriteFrontElf,
};

  async function fetchScoreboard() {
    console.log("fetching");
    const charactersResponse = await getCharacters(matchId, token);
    if (charactersResponse.status === 'success'){
      setCharacters(charactersResponse.characters);
      setMatch(charactersResponse.match);
      console.log(charactersResponse.characters);
    }
    else{
      console.error("Error while getting characters");
    }
  }

  useEffect(() => {
    fetchScoreboard();
  }, [])

  return (
    <div className="scoreboard">
      <h1>Scoreboard of Match {matchId}</h1>
      <section>
        <div className='headers'>
          <div>Character</div>
          <div>Name</div>
          <div>Class</div>
          <div>Experience</div>
        </div>
        {characters?.map((character, index) => (
          <div key={index} className='entry'>
            <div><img
                src = {characterSprites[character.class.toLowerCase()]}
                className = "score-character-sprite"
                alt = {character.class}/>
            </div>
            <div>{character.name}</div>
            <div>{character.class}</div>
            <div>{character.experience}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Scoreboard;