import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoardDetails, moveCharacter, executeActionsInTurn, getEventsForCell, getEventsForMatch } from './BoardServices';
import { getMatchDetails, nextPlayer } from '../matches/MatchService';
import { startFight } from '../game/fightsService';
import spriteX from '../../assets/imgs/X.jpg';
import spriteEmpty from '../../assets/imgs/empty.png';
import spriteD from '../../assets/imgs/D.jpg';
import spriteB from '../../assets/imgs/B.jpg';
import spriteFrontKnight from '../../assets/imgs/knight/front.png';
import spriteFrontArcher from '../../assets/imgs/archer/front.png';
import spriteFrontMage from '../../assets/imgs/mage/front.png';
import spriteFrontDwarf from '../../assets/imgs/dwarf/front.png';
import spriteFrontdruid from '../../assets/imgs/druid/front.png';
import spriteFrontElf from '../../assets/imgs/elf/front.png';
import spriteSkeletonGenericEnemy from '../../assets/imgs/skeleton/skeleton-idle.png';
import spriteAxe from '../../assets/imgs/weapons/axe.png';
import spriteBow from '../../assets/imgs/weapons/bow.png';
import spriteStaff from '../../assets/imgs/weapons/staff.png';
import spriteSword from '../../assets/imgs/weapons/sword.png';
import spritePotion from '../../assets/imgs/items/potion.png';
import spriteChest from '../../assets/imgs/items/Chest.png';
import spriteDoorKey from '../../assets/imgs/items/Door Key.png';
import spriteChestKey from '../../assets/imgs/items/chest_key.png';
import spriteEnchantment from '../../assets/imgs/items/book.png';
import spriteScroll from '../../assets/imgs/items/scroll.png';
import spriteGoblet from '../../assets/imgs/items/goblet.png';
import BattleView from '../../views/battle';
import '../../assets/styles/style.css';
import { AuthContext } from '../auth/AuthContext';
import parseJwt from '../auth/AuthParser';

function Board() {
    const { matchId } = useParams();
    const [cells, setCells] = useState([]);
    const [boardType, setBoardType] = useState('');
    const [characters, setCharacters] = useState([]);
    const [currentCharacter, setCurrentCharacter] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [availableActions, setAvailableActions] = useState(0);
    const [isActionPhase, setIsActionPhase] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTurnComplete, setIsTurnComplete] = useState(false);
    const [cellEvents, setCellEvents] = useState([]);
    const [characterTurn, setCharacterTurn] = useState(null);
    const {token} = useContext(AuthContext);
    const userId = Number(parseJwt(token)?.sub);
    const navigate = useNavigate();
    // Para el combate
    const [isInCombat, setIsInCombat] = useState(false);
    const [enemy, setEnemy] = useState(null);
    const [fight, setFight] = useState(null);
    // Sprites
    const [eventSprites, setEventSprites] = useState({});

    async function fetchBoard() {
        try {
            const boardResponse = await getBoardDetails(matchId, token);
            const matchResponse = await getMatchDetails(matchId, token);
            const eventsResponse = await getEventsForMatch(matchId, token);

            if (boardResponse.status === 'success' && matchResponse.status === 'success' && eventsResponse.status === 'success') {
                setCells(boardResponse.cells || []); 
                setBoardType(boardResponse.board.type || '');
                setCharacters(boardResponse.characters || []);

                const characterInTurn = boardResponse.characters.find(
                    char => char.id === matchResponse.match.characterTurn
                );
                setCurrentCharacter(characterInTurn);
                setCharacterTurn(matchResponse.match.characterTurn);

                assignSpritesToCells(eventsResponse.events);
            } else {
                console.error("Error: Unable to fetch board or match details");
            }
        } catch (error) {
            console.error('Error fetching board or match details:', error);
        }
    }

    useEffect(() => {
        fetchBoard();
    }, [matchId]);

    const cellSprites = {
        'X': spriteX,
        '-': spriteEmpty,
        'D': spriteD,
        'B': spriteB,
    };

    const characterSprites = {
        "knight": spriteFrontKnight,
        "archer": spriteFrontArcher,
        "mage": spriteFrontMage,
        "dwarf": spriteFrontDwarf,
        "druid": spriteFrontdruid,
        "elf": spriteFrontElf,
    };

    const handleCellClick = async (cell) => {
        const parseMatchId = parseInt(matchId, 10);
        if (currentCharacter?.userId !== userId) {
            alert(`It's not your turn. You are ${characters.find(c=> c.userId === userId)?.name}`);
            return;
        }
        if (['-', 'B'].includes(cell.type) && currentCharacter) {
            try {
                const response = await moveCharacter(currentCharacter, parseMatchId, cell.x, cell.y, token);
                if (response.status === 'success') {
                    setMessages([response.message]);
                    const updatedCharacter = response.character;
                    setCharacters(prevCharacters =>
                        prevCharacters.map(char =>
                            char.id === updatedCharacter.id ? updatedCharacter : char
                        )
                    );
                    //setAvailableActions(updatedCharacter.actions);
                    setIsActionPhase(true);

                    const cellEventsResponse = await getEventsForCell(cell.id, token);
                    if (cellEventsResponse.status === 'success') {
                        setCellEvents(cellEventsResponse.events);

                        const visibleEnemyEvent = cellEventsResponse.events.find(event => event.name === 'visibleEnemy');
                        if (visibleEnemyEvent) {
                            const fightData = await startFight(currentCharacter.id, token);
                            //console.log("fightData:", fightData);
                            //console.log("fightData.enemy:", fightData.enemy);
                            setIsInCombat(true);
                            if (fightData && fightData.enemy) {
                                //console.log("Enemy data:", fightData.enemy);
                                setEnemy(fightData.enemy);
                                //console.log("Fight data:", fightData.fight);
                                setFight(fightData.fight);
                            } else {
                                console.error("Error: Enemy data is missing:", fightData.message);
                            }
                        } else {
                            setIsInCombat(false);
                            setEnemy(null);
                        }
                    }
                } else {
                    alert("Error: " + response.message);
                }
            } catch (error) {
                if (error.message === "Cell out of reach.") {
                    alert("Not valid move, the cell is out of reach.");
                } else if (error.message === "Movement blocked by an obstacle.") {
                    alert("Movement blocked: there is an obstacle in the way.");
                } else {
                    console.error("Error moving character:", error);
                }
            }
        }
    };

    const handleEventCheck = (event) => {
        setSelectedEvents((prevSelectedEvents) => {
          if (prevSelectedEvents.includes(event.id)) {
            return prevSelectedEvents.filter((id) => id !== event.id);
          } else {
            return [...prevSelectedEvents, event.id];
          }
        });
      };

    const executeActions = async () => {
        try {
            const parseMatchId = parseInt(matchId, 10);
            const response = await executeActionsInTurn(parseMatchId, currentCharacter.id, selectedEvents, token);
            if (response.status === 'success') {
                setMessages(response.messages);
                setSelectedEvents([]);
                setIsTurnComplete(true);
                setIsActionPhase(false);
                if (response.enemy) {
                    setEnemy(response.enemy);
                }
                fetchBoard();
            } else {
                alert("Error executing actions: " + response.message);
            }
        } catch (error) {
            console.error("Error executing actions:", error);
        }
    };

    const assignSpritesToCells = (eventsByCell) => {
        const newEventSprites = {};
    
        Object.entries(eventsByCell).forEach(([cellId, events]) => {
            // Buscar el evento específico "visibleEnemy"
            const visibleEnemyEvent = events.find(event => event.name === 'visibleEnemy');
            const axeEvent = events.find(event => event.name === 'Axe');
            const bowEvent = events.find(event => event.name === 'Bow');
            const staffEvent = events.find(event => event.name === 'Staff');
            const swordEvent = events.find(event => event.name === 'Sword');
            const potionEvent = events.find(event => event.name === 'Potions');
            const chestEvent = events.find(event => event.name === 'lockedChest');
            const doorKeyEvent = events.find(event => event.name === 'Door Key');
            const chestKeyEvent = events.find(event => event.name === 'Chest Key');
            const enchantmentEvent = events.find(event => event.name === 'Enchantment');
            const scrollEvent = events.find(event => event.name === 'Scroll');
            const gobletEvent = events.find(event => event.name === 'curseRelic');
            const gobletEvent2 = events.find(event => event.name === 'blessingRelic');
            if (visibleEnemyEvent) {
                newEventSprites[cellId] = {
                    image: spriteSkeletonGenericEnemy,
                    name: 'Skeleton',
                };
            }
            if (axeEvent) {
                newEventSprites[cellId] = {
                    image: spriteAxe,
                    name: 'Axe',
                };
            }
            if (bowEvent) {
                newEventSprites[cellId] = {
                    image: spriteBow,
                    name: 'Bow',
                };
            }
            if (staffEvent) {
                newEventSprites[cellId] = {
                    image: spriteStaff,
                    name: 'Staff',
                };
            }
            if (swordEvent) {
                newEventSprites[cellId] = {
                    image: spriteSword,
                    name: 'Sword',
                };
            }
            if (potionEvent) {
                newEventSprites[cellId] = {
                    image: spritePotion,
                    name: 'Potion',
                };
            }
            if (chestEvent) {
                newEventSprites[cellId] = {
                    image: spriteChest,
                    name: 'Chest',
                };
            }
            if (doorKeyEvent) {
                newEventSprites[cellId] = {
                    image: spriteDoorKey,
                    name: 'Door Key',
                };
            }
            if (chestKeyEvent) {
                newEventSprites[cellId] = {
                    image: spriteChestKey,
                    name: 'Chest Key',
                };
            }
            if (enchantmentEvent) {
                newEventSprites[cellId] = {
                    image: spriteEnchantment,
                    name: 'Enchantment',
                };
            }
            if (scrollEvent) {
                newEventSprites[cellId] = {
                    image: spriteScroll,
                    name: 'Scroll',
                };
            }
            if (gobletEvent) {
                newEventSprites[cellId] = {
                    image: spriteGoblet,
                    name: 'Curse Relic',
                };
            }
            if (gobletEvent2) {
                newEventSprites[cellId] = {
                    image: spriteGoblet,
                    name: 'Blessing Relic',
                };
            }
        });
    
        setEventSprites(newEventSprites); // Actualiza el estado de los sprites
    };

    useEffect(() => {
        if (isTurnComplete) {
            alert("Turn completed.");
            setIsTurnComplete(false);
        }
    }, [isTurnComplete, matchId]);

    const renderCell = (cell) => {
        const sprite = cellSprites[cell.type] || cellSprites['-'];
        const character = characters.find(char => char.cellId === cell.id);
        const isClickable = cell.type === '-' || cell.type === 'D' || cell.type === 'B';
        const eventSprite = eventSprites[cell.id];
    
        return (
            <div
                key={cell.id}
                className={`board-cell ${isClickable ? 'clickable' : ''}`}
                style={{ backgroundImage: `url(${sprite})` }}
                onClick={isClickable ? () => handleCellClick(cell) : undefined}
            >
                {character && (
                    <img
                        src={characterSprites[character.class.toLowerCase()]}
                        className="character-sprite"
                        alt={character.class}
                    />
                )}
                {eventSprite && (
                    <img
                        src={eventSprite.image}
                        className="event-sprite"
                        alt="eventSprite.name"
                    />
                )}
            </div>
        );
    };

    const handleInventoryClick = async (inventoryId) => {

        try {
            navigate(`/inventories/${inventoryId}`)
        } catch (error) {
            alert("Error while getting inventory: " + error.message);
        }
    };
    const handleStatsClick = async (characterId) => {

        try {
            navigate(`/stats/${characterId}`)
        } catch (error) {
            alert("Error while getting stats: " + error.message);
        }
    };
    const handleScoreboardClick = async (matchId) => {

        try {
            navigate(`/scoreboard/${matchId}`)
        } catch (error) {
            alert("Error while getting scoreboard: " + error.message);
        }
    };

    return (
        <div className="board-container">
            {/* Si isInCombat es true, renderizar la vista de batalla */}
            {isInCombat ? (
                <BattleView 
                matchId={matchId} 
                player={currentCharacter} 
                enemy={enemy}
                fight= {fight}
                token={token}
            /> 
            ) : (
                <>
                    <div>
                        <h2 className="board-title">Map: {boardType}</h2>
                        <h3>
                            Current turn: {currentCharacter?.name}
                            {(currentCharacter?.userId === userId)? (<> (You)</>):<></>}
                        </h3>
                        <div className="message-container">
                            {messages.map((message, index) => (
                        <div key={index} className="message">{message}</div>
                            ))}
                        </div>
                        <div className='other'>
                            <button 
                                className='actions-button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleInventoryClick(characters.find(c=> c.userId === userId)?.inventoryId);
                                }}>
                                Open Inventory
                            </button>
                            <button 
                                className='actions-button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatsClick(characters.find(c=> c.userId === userId)?.id);
                                }}>
                                Show Stats
                            </button>
                            <button 
                                className='actions-button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleScoreboardClick(matchId);
                                }}>
                                Show Scoreboard
                            </button>
                        </div>
                        <div className="board">
                            {cells.map((cell) => renderCell(cell))}
                        </div>
                        <button className="actions-button" onClick={executeActions} disabled={!isActionPhase}>
                            Execute Actions
                        </button>
                        <div className="cell-events-container">
                            <h3>Events in this cell</h3>
                            {cellEvents.length > 0 ? (
                                cellEvents.map((event, index) => (
                                    <div key={index} className="cell-event">
                                        <p>Event: {event.name}</p>
                                        <input 
                                            type="checkbox"
                                            onChange={() => handleEventCheck(event)}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>There are no events in this cell</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );    
}

export default Board;