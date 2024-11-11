import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardDetails } from './BoardServices';
import { moveCharacter } from './BoardServices';
import { getMatchDetails } from '../matches/MatchService';
import spriteX from '../../assets/imgs/X.jpg';
import spriteEmpty from '../../assets/imgs/empty.png';
import spriteD from '../../assets/imgs/D.jpg';
import spriteB from '../../assets/imgs/B.jpg';
import spriteFrontKnight from '../../assets/imgs/knight/front.png';
import spriteFrontArcher from '../../assets/imgs/archer/front.png';
import spriteFrontMage from '../../assets/imgs/mage/front.png';
import spriteFrontDwarf from '../../assets/imgs/dwarf/front.png';
import spriteFrontdruid from '../../assets/imgs/druid/front.png';
import spriteFrontElf from '../../assets/imgs/dwarf/front.png';
import '../../assets/styles/style.css';

function Board() {
    const { matchId } = useParams();
    const [cells, setCells] = useState([]);
    const [boardType, setBoardType] = useState('');
    const [characters, setCharacters] = useState([]);
    const [currentCharacter, setCurrentCharacter] = useState(null);


    useEffect(() => {
        async function fetchBoard() {
            try {
                const boardResponse = await getBoardDetails(matchId);
                const matchResponse = await getMatchDetails(matchId);

                if (boardResponse.status === 'success' && matchResponse.status === 'success') {
                    setCells(boardResponse.cells || []); 
                    setBoardType(boardResponse.board.type || '');
                    setCharacters(boardResponse.characters || []);

                    const characterInTurn = boardResponse.characters.find(
                        char => char.id === matchResponse.match.characterTurn
                    );
                    setCurrentCharacter(characterInTurn);
                } else {
                    console.error("Error: Unable to fetch board or match details");
                }
            } catch (error) {
                console.error('Error fetching board or match details:', error);
            }
        }
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
        if (['-', 'D', 'B'].includes(cell.type) && currentCharacter) {
            try {
                const response = await moveCharacter(currentCharacter, parseMatchId, cell.x, cell.y);
                if (response.status === 'success') {
                    const updatedCharacter = response.character;
                    setCharacters(prevCharacters =>
                        prevCharacters.map(char =>
                            char.id === updatedCharacter.id ? updatedCharacter : char
                        )
                    );
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

    const renderCell = (cell) => {
        const sprite = cellSprites[cell.type] || cellSprites['-'];
        const character = characters.find(char => char.cell[0] === cell.x && char.cell[1] === cell.y);
        const isClickable = cell.type === '-' || cell.type === 'D' || cell.type === 'B';
    
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
            </div>
        );
    };

    return (
        <div className="board-container">
            <div>
                <h2 className="board-title">Map: {boardType}</h2>
                <div className="board">
                    {cells.map((cell) => renderCell(cell))}
                </div>
            </div>
        </div>
    );
}

export default Board;