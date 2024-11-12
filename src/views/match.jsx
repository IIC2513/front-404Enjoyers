import React from 'react';
import CreateMatch from '../components/matches/CreateMatch';
import JoinMatch from '../components/matches/JoinMatch';
import AvailableMatches from '../components/matches/AvailableMatches';
import AvailableUserMatches from '../components/matches/AvailableUserMatches';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/auth/AuthContext';
import parseJwt from '../components/auth/AuthParser';

function MatchPage() {
    const {token} = useContext(AuthContext);
    const userId = parseJwt(token)?.sub;

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