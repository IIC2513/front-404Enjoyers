import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CharacterSelection from '../components/matches/CharacterSelection';
import MapSelection from '../components/matches/MapSelection';
import { getMatchDetails, startMatch, getUsers, getCharacters } from '../components/matches/MatchService';
import { getBaseStats } from '../scripts/characterService';
import { AuthContext } from '../components/auth/AuthContext';
import parseJwt from '../components/auth/AuthParser';
import spriteFrontKnight from '../assets/imgs/knight/front.png';
import spriteFrontArcher from '../assets/imgs/archer/front.png';
import spriteFrontMage from '../assets/imgs/mage/front.png';
import spriteFrontDwarf from '../assets/imgs/dwarf/front.png';
import spriteFrontdruid from '../assets/imgs/druid/front.png';
import spriteFrontElf from '../assets/imgs/elf/front.png';

function MatchDetail() {
    const { matchId } = useParams(); // Obtenemos `matchId` de la URL
    const [match, setMatch] = useState(null);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([])
    const [characters, setCharacters] = useState([])
    const {token} = useContext(AuthContext);
    const [isCreator, setCreator] = useState(false);
    const [classType, setClass] = useState('Knight');
    const [sprite, setSprite] = useState(spriteFrontKnight);
    const [stats, setStats] = useState({});
    const userId = Number(parseJwt(token)?.sub);

    const characterSprites = {
        "Knight": spriteFrontKnight,
        "Archer": spriteFrontArcher,
        "Mage": spriteFrontMage,
        "Dwarf": spriteFrontDwarf,
        "Druid": spriteFrontdruid,
        "Elf": spriteFrontElf,
    };

    async function fetchCharacterStats(){
        try{
            const statsResponse = await getBaseStats(classType, token);
            if (statsResponse.status === 'success'){
                setStats(statsResponse.stats);
            }
            else{
                console.error(statsResponse.error);
            }
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {

        async function fetchMatchDetails() {
            try {
                const response = await getMatchDetails(parseInt(matchId), token);
                setMatch(response.match);
                const usersResponse = await getUsers(parseInt(matchId), token);
                setUsers(usersResponse.users);
                const charactersResponnse = await getCharacters(parseInt(matchId), token);
                setCharacters(charactersResponnse.characters);
                if (usersResponse.users[0].id === userId){
                    setCreator(true);
                }
            } catch (error) {
                console.error("Error fetching match details:", error);
                setMessage("Error loading match details");
            }
        }
        fetchMatchDetails();
        fetchCharacterStats();
    }, [matchId]);

    const handleStartGame = async () => {
        if (users[0].id === userId) { // Solo el creador puede iniciar
            const response = await startMatch(parseInt(matchId), match.selectedMap, token);
            if (response.status === 'success') {
                alert("Game successfully started!");
            } else {
                alert("Error starting the game " + response.message);
            }
        } else {
            alert("The creator of the match must start the game");
        }
    };

    const cycleClass = async (direction) => {
        const classKeys = Object.keys(characterSprites);
        const currentIndex = classKeys.indexOf(classType);
      
        let newIndex;
        if (direction === 'next') {
          newIndex = (currentIndex + 1) % classKeys.length;
        } else if (direction === 'prev') {
          newIndex = (currentIndex - 1 + classKeys.length) % classKeys.length;
        }
      
        const newClass = classKeys[newIndex];
        setClass(newClass);
        setSprite(characterSprites[newClass]);
        fetchCharacterStats();
    }

    const isReady = (user_id) => {
        return characters.some(character=> character.userId === user_id);
    }


    if (!match) return <p>Loading match details...</p>;

    return (
        <div className='match-details'>
            <div className='selection'>
                <h2>Match ID{matchId}</h2>
                {message && <p>{message}</p>}
                
                {/* Selección de Personaje */}
                <CharacterSelection matchId={matchId} userId={userId} />
                
                {/* Selección de Mapa (solo para el creador) */}
                {isCreator && <MapSelection match={match} setMatch={setMatch} />}
                
                {/* Botón de Iniciar Partida (solo para el creador) */}
                {isCreator && (
                    <button onClick={handleStartGame}>Start Match</button>
                )}
            </div>
            <div className='selection'>
                <h2>Current Users</h2>
                <div className='users-table'>

                <div className='users-header'>
                    <div>Username</div>
                    <div>Is Ready</div>
                </div>
                {users.map((user) => (
                    <div key={user.id} className='users-row'>
                        <div>{user.username}</div>
                        <div>{isReady(user.id)? 'Yes':'No'}</div>
                    </div>
                ))}
                </div>
            </div>
            <div className='selection'>
                <h2>Base Character Stats</h2>
                <div className='class'>
                    <button id='prevBtn' onClick={() => {cycleClass('prev')}}>˂</button>
                    <h3>{classType}</h3>
                    <button id='nextBtn' onClick={() => {cycleClass('next')}}>˃</button>
                </div>
                <div className='card'>
                <div className='sprite'>
                    <img
                    src = {sprite}
                    className = "stat-character-sprite"
                    />
                </div>
                <div className='base-stats'>
                    <p>Strength: {stats?.strength}</p>
                    <p>Defense: {stats?.defense}</p>
                    <p>Magic: {stats?.magic}</p>
                    <p>Luck: {stats?.luck}</p>
                    <p>Agility: {stats?.agility}</p>
                    <p>MaxHealth: {stats?.max_health}</p>
                    <p>MaxMoves: {stats?.moves}</p>
                    <p>MaxActions: {stats?.actions}</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default MatchDetail;