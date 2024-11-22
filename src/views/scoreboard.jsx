import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthContext';

function Scoreboard() {
  const { matchId } = useParams();
  const {token} = useContext(AuthContext);

  useEffect(() => {
  }, [])

  return (
    <div className="inventory">
      <h1>Scoreboard of Match {matchId}</h1>
    </div>
  );
}

export default Scoreboard;