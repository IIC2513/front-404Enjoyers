import React from 'react';
import CreateMatch from '../components/matches/CreateMatch';
import JoinMatch from '../components/matches/JoinMatch';
import AvailableMatches from '../components/matches/AvailableMatches';
import AvailableUserMatches from '../components/matches/AvailableUserMatches';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/auth/AuthContext';

function MatchPage() {
    const userId = 1; // Dato harcodeado, debería ser el ID del usuario logueado
    const {token} = useContext(AuthContext);

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