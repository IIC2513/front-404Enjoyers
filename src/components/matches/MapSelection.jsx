import React from 'react';

function MapSelection({ match, setMatch }) {
    const handleMapSelection = (map) => {
        setMatch({ ...match, selectedMap: map });
    };

    return (
        <div>
            <h3>Select Map</h3>
            <button onClick={() => handleMapSelection("map_1")}>Map 1</button>
            <button onClick={() => handleMapSelection("map_2")}>Map 2</button>
            <button onClick={() => handleMapSelection("map_3")}>Map 3</button>
            <p>Map Selected: {match.selectedMap}</p>
        </div>
    );
}

export default MapSelection;