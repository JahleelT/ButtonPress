import React, {useEffect, useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { incrementUserClicks, getUserClicks } from '../services/firestore';

const ClickCounter: React.FC = () => {
  const { user } = useAuth();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!user) return;
    // TODO: fetch initial count from Firestore
  }, [user]);

  const handleClick = async () => {
    if (!user) return;
    // TODO: increment in firestore + update state
  };

  return (
    <div>
      <p>Clicks: {count}</p>
      <button onClick={handleClick} disabled={!user}>
        Increase click count!
      </button>
    </div>
  );
};

export default ClickCounter;