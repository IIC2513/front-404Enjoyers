import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardDetails } from './BoardServices';
import spriteX from '../../assets/imgs/X.jpg';
import spriteEmpty from '../../assets/imgs/empty.png';
import spriteD from '../../assets/imgs/D.jpg';
import spriteB from '../../assets/imgs/B.jpg';
import Background from '../../assets/imgs/Dark_Castle_Background.jpg';
import '../../assets/styles/style.css';

function Board() {
    const { matchId } = useParams();
    const [cells, setCells] = useState([]);
    const [boardType, setBoardType] = useState('');

    useEffect(() => {
        async function fetchBoard() {
            try {
                const response = await getBoardDetails(matchId);
                if (response.status === 'success') {
                    setCells(response.cells);
                    setBoardType(response.board.type);
                }
            } catch (error) {
                console.error('Error fetching board details:', error);
            }
        }
        fetchBoard();
    }, [matchId]);

    // Mapear los tipos de celdas a rutas de sprites
    const cellSprites = {
        'X': spriteX,
        '-': spriteEmpty,
        'D': spriteD,
        'B': spriteB,
    };

    const renderCell = (cell) => {
        const sprite = cellSprites[cell.type] || cellSprites['-'];

        return (
            <div
                key={cell.id}
                className="board-cell"
                style={{ backgroundImage: `url(${sprite})` }}
            ></div>
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