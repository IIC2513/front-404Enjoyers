import React from 'react';
import spriteFrontKnight from '../assets/imgs/knight/front.png';
import spriteFrontArcher from '../assets/imgs/archer/front.png';
import spriteFrontMage from '../assets/imgs/mage/front.png';
import spriteFrontDwarf from '../assets/imgs/dwarf/front.png';
import spriteFrontdruid from '../assets/imgs/druid/front.png';
import spriteFrontElf from '../assets/imgs/elf/front.png';

function EndGame({ winner, characters = []}) {
    const characterSprites = {
        "knight": spriteFrontKnight,
        "archer": spriteFrontArcher,
        "mage": spriteFrontMage,
        "dwarf": spriteFrontDwarf,
        "druid": spriteFrontdruid,
        "elf": spriteFrontElf,
    };

    return (
        <div className="end-game">
            <header className="end-game-header">
                <h1>Game Over</h1>
                <h2>Winner: {winner.name}</h2>
                <h3>Class: {winner.class}</h3>
            </header>
            <main className="end-game-main">
                <div className="characters-experience">
                    <h3>Characters Experience</h3>
                    <div className="characters-list">
                    <h3> {winner.experience} </h3>
                    </div>
                </div>
            </main>
            <footer className="end-game-footer">
                <button onClick={() => window.location.href = '/'}>Back to Home</button>
            </footer>
        </div>
    );
}

export default EndGame;