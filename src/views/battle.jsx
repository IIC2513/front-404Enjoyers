import React, {useState, useEffect} from 'react';
import BattleBackground from '../components/game/battleBackground'; 
import BattlePlayer from '../components/game/battlePlayer';
import BattleEnemy from '../components/game/battleEnemy';
import CombatActions from '../components/game/combatActions';
import { executeCombatAction, getCharacterInfo, getEnemyInfo, getFightInfo } from '../components/game/fightsService';
import { useNavigate } from 'react-router-dom';

function BattleView({ matchId, player, enemy, fight, token, onCombatEnd }) {
    const [combatMessage, setCombatMessage] = useState('');
    const [isCombatFinished, setIsCombatFinished] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [currentEnemy, setCurrentEnemy] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setCurrentPlayer(player);
                setCurrentEnemy(enemy);
            } catch (error) {
                console.error('Error loading initial combat data:', error);
            }
        };

        if (player && player.id && enemy && enemy.id) {
            loadInitialData();
        } else {
            console.error("Player or enemy data is missing! Player: ", player, "Enemy: ", enemy);
        }
    }, [player, enemy]);

    useEffect(() => {
        if (isCombatFinished) {
            onCombatEnd();
            console.log('Combat finished!');
            console.log('Character:', currentPlayer);
        }
    }, [isCombatFinished, onCombatEnd]);

    const loadCombatData = async () => {
        try {
            const playerData = await getCharacterInfo(player.id, token);
            const enemyData = await getEnemyInfo(enemy.id, token);

            setCurrentPlayer(playerData.character);
            setCurrentEnemy(enemyData.enemy);
        } catch (error) {
            console.error('Error loading combat data:', error);
        }
    };


    // Si los datos no están disponibles, muestra un mensaje de carga
    if (!currentPlayer || !currentEnemy) {
        return <div>Loading battle...</div>;
    }
    // Función para ejecutar el ataque
    const handleAttack = async () => {
        try {
            const fightInfo = await getFightInfo(fight.id, token);
            const response = await executeCombatAction(fightInfo.fight.id, 'attack', null, token);  // Llamada al backend para ejecutar ataque
            
            //console.log('Attacker:', fight.turn)
            setCombatMessage(response.message);  // Mostrar mensaje con el resultado
            //console.log('fight status:', fightInfo.fight.status);
            //console.log('fight data:', fightInfo.fight);
            if (fightInfo.fight.status === 'finished') {
                setIsCombatFinished(true);  // Si la pelea terminó, marca el estado
            } else {
                await loadCombatData();
            }  // Cargar datos de combate
        } catch (error) {
            setCombatMessage('Error executing attack.');  // Mensaje de error
        }
    };

    // Función para ejecutar la defensa
    const handleDefend = async () => {
        try {
            const response = await executeCombatAction(fight.id, 'defend', null, token);  // Llamada al backend para defender
            const fightInfo = await getFightInfo(fight.id, token);
            setCombatMessage(response.message);

            if (fightInfo.fight.status === 'finished') {
                setIsCombatFinished(true);  // Terminar la pelea si corresponde
            }
            await loadCombatData();  // Cargar datos de combate
        } catch (error) {
            setCombatMessage('Error executing defend.');
        }
    };

    // Función para ejecutar escape
    const handleEscape = async () => {
        try {
            const response = await executeCombatAction(fight.id, 'escape', null, token);  // Llamada al backend para escapar
            setCombatMessage(response.message);
            setIsCombatFinished(true);  // Marcar que el combate ha terminado
        } catch (error) {
            setCombatMessage('Error executing escape.');
        }
    };

    // Función para usar habilidad
    const handleUseHability = async (habilityId) => {
        try {
            const response = await executeCombatAction(matchId, 'useHability', habilityId, token);  // Llamada al backend para usar habilidad
            const fightInfo = await getFightInfo(fight.id, token);
            setCombatMessage(response.message);

            if (fightInfo.fight.status === 'finished') {
                setIsCombatFinished(true);  // Terminar combate si es necesario
            }
            await loadCombatData();  // Cargar datos de combate
        } catch (error) {
            setCombatMessage('Error using hability.');
        }
    };

    if (!player || !enemy) {
        return <div>Loading battle...</div>;  // Mostrar carga mientras se obtienen los datos
    }

    return (
        <div className="battle-view">
            {/* Fondo del combate */}
            <BattleBackground />

            <div className="battle-characters">
                {/* Mostrar el jugador */}
                <div className="character">
                    <BattlePlayer player={currentPlayer} />
                </div>

                {/* Mostrar el enemigo */}
                <div className="character enemy">
                    <BattleEnemy enemy={currentEnemy} />
                </div>
            </div>

            <div className="options-container">
                {/* Mostrar botones de opciones */}
                <button onClick={handleAttack} disabled={isCombatFinished}>
                    Attack
                </button>
                <button onClick={handleDefend} disabled={isCombatFinished}>
                    Defend
                </button>
                <button onClick={handleEscape} disabled={isCombatFinished}>
                    Escape
                </button>

                {/* Mostrar botones para habilidades si existen */}
                {player.habilities?.map((hability) => (
                    <button key={hability.id} onClick={() => handleUseHability(hability.id)} disabled={isCombatFinished}>
                        Use {hability.name}
                    </button>
                ))}
            </div>

            <p className="combat-message">{combatMessage}</p>
        </div>
    );
}

export default BattleView;