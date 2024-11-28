import React from 'react';
import spriteFrontKnight from '../assets/imgs/knight/front.png';
import spriteFrontArcher from '../assets/imgs/archer/front.png';
import spriteFrontMage from '../assets/imgs/mage/front.png';
import spriteFrontDwarf from '../assets/imgs/dwarf/front.png';
import spriteFrontdruid from '../assets/imgs/druid/front.png';
import spriteFrontElf from '../assets/imgs/elf/front.png';

function EndGame({ winner, scores, statistics, isBossDefeated }) {
    const characterSprites = {
        "knight": spriteFrontKnight,
        "archer": spriteFrontArcher,
        "mage": spriteFrontMage,
        "dwarf": spriteFrontDwarf,
        "druid": spriteFrontdruid,
        "elf": spriteFrontElf,
    };

    const sortedScores = [...scores].sort((a, b) => b.points - a.points);
    const topThree = sortedScores.slice(0, 3);

    return (
        <div className="end-game">
            <header className="end-game-header">
                <h1>Game Over</h1>
                {isBossDefeated ? (
                    <h2>Congratulations! The Final Demon has been Defeated!</h2>
                ) : (
                    <h2>Time's up! Points decide the winner!</h2>
                )}
            </header>
            <main className="end-game-main">
                <div className="podium">
                    <h3>🏆 Podium</h3>
                    <div className="podium-container">
                        {topThree.map((player, index) => (
                            <div
                                key={index}
                                className={`podium-place podium-${index + 1}`}
                            >
                                <img
                                    src={characterSprites[player.class.toLowerCase()]}
                                    className="podium-sprite"
                                    alt={player.class}
                                />
                                <h4>{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</h4>
                                <p>{player.username}</p>
                                <p>{player.points} points</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="scores-section">
                    <h3>Final Scores</h3>
                    <div className="scoreboard">
                        <div className="headers">
                            <div>Character</div>
                            <div>Name</div>
                            <div>Class</div>
                            <div>Points</div>
                        </div>
                        {sortedScores.map((player, index) => (
                            <div key={index} className="entry">
                                <div>
                                    <img
                                        src={characterSprites[player.class.toLowerCase()]}
                                        className="score-character-sprite"
                                        alt={player.class}
                                    />
                                </div>
                                <div>{player.username}</div>
                                <div>{player.class}</div>
                                <div>{player.points}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="winner-section">
                    <h3>🏆 Winner: {winner.username}</h3>
                    <h4>Class: {winner.class}</h4>
                    <div className="statistics-section">
                        <h4>Statistics</h4>
                        <ul>
                            {statistics.map((stat, index) => (
                                <li key={index}>
                                    {stat.label}: {stat.value}
                                </li>
                            ))}
                        </ul>
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
