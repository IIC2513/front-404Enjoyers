import React from 'react';

// () --> { map }
function battleBackground() {
    const backgrounds = {
        castle: 'url(../../assets/Dark_Castle_Background.png)',
        // Add more backgrounds here
    };

    return (
        <div 
            className="battle-background" 
            // Instead of 0, map
            style={{ backgroundImage: backgrounds[0] || backgrounds['castle'] }}
        />
    );
}

export default battleBackground;