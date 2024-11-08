import React from 'react';
import CreateMatch from '../components/matches/CreateMatch';
import JoinMatch from '../components/matches/JoinMatch';
import AvailableMatches from '../components/matches/AvailableMatches';
import AvailableUserMatches from '../components/matches/AvailableUserMatches';

function MatchPage() {
    const userId = 4; // Dato harcodeado, debería ser el ID del usuario logueado

    return (
        <div>
            <h1>Matches Management</h1>
            <CreateMatch userId={userId} />
            <JoinMatch userId={userId} />
            <AvailableMatches userId={userId}/>
            <AvailableUserMatches userId={userId} />
        </div>
    );
}

export default MatchPage;