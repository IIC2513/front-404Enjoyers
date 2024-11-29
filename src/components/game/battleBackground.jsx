import React from 'react';

function BattleBackground({ background }) {
    const backgrounds = {
        castle: '(../../assets/Dark_Castle_Background.png)',
    };

    return (
        <div 
            className="battle-background" 
            style={{ backgroundImage: backgrounds[background] || backgrounds['castle'] }}
        />
    );
}

export default BattleBackground;