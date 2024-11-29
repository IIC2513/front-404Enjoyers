import React, {useState, useEffect} from 'react';
import BattleBackground from '../components/game/battleBackground'; 
import BattlePlayer from '../components/game/battlePlayer';
import BattleEnemy from '../components/game/battleEnemy';
import CombatActions from '../components/game/combatActions';
import { executeCombatAction } from '../components/game/fightsService';

function BattleView({ matchId, player, enemy, fight, token }) {
    const [combatMessage, setCombatMessage] = useState('');
    const [isCombatFinished, setIsCombatFinished] = useState(false);

    useEffect(() => {
        if (!player || !enemy) {
            console.error("Player or enemy data is missing! Player: ", player, "Enemy: ", enemy);
        } else {
            //console.log("Player data:", player);
            //console.log("Enemy data:", enemy);
        }
    }, [player, enemy]);

    // Si los datos no están disponibles, muestra un mensaje de carga
    if (!player || !enemy) {
        return <div>Loading battle...</div>;
    }
    // Función para ejecutar el ataque
    const handleAttack = async () => {
        try {
            const response = await executeCombatAction(fight.id, 'attack', null, token);  // Llamada al backend para ejecutar ataque
            console.log('Attacker:', fight.turn)
            setCombatMessage(response.message);  // Mostrar mensaje con el resultado

            if (response.status === 'finished') {
                setIsCombatFinished(true);  // Si la pelea terminó, marca el estado
            }
        } catch (error) {
            setCombatMessage('Error executing attack.');  // Mensaje de error
        }
    };

    // Función para ejecutar la defensa
    const handleDefend = async () => {
        try {
            const response = await executeCombatAction(fight.id, 'defend', null, token);  // Llamada al backend para defender
            setCombatMessage(response.message);

            if (response.status === 'finished') {
                setIsCombatFinished(true);  // Terminar la pelea si corresponde
            }
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
            setCombatMessage(response.message);

            if (response.status === 'finished') {
                setIsCombatFinished(true);  // Terminar combate si es necesario
            }
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
                    <BattlePlayer player={player} />
                </div>

                {/* Mostrar el enemigo */}
                <div className="character enemy">
                    <BattleEnemy enemy={enemy} />
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