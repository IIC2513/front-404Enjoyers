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
        <div className='matches'>
            <div className='card'>
                <CreateMatch userId={userId}/>
            </div>
            <div className='card'>
                <AvailableMatches userId={userId}/>
            </div>
            <div className='card'>
                <AvailableUserMatches userId={userId} />
            </div>
        </div>
    );
}

export default MatchPage;