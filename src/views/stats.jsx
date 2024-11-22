import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/auth/AuthContext';

function Stats() {
  const { characterId } = useParams();
  const {token} = useContext(AuthContext);

  useEffect(() => {
  }, [])

  return (
    <div className="stats">
      <h1>Your Stats</h1>
    </div>
  );
}

export default Stats;