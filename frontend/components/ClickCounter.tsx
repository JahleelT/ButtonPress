import React, {useEffect, useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { incrementUserClicks, getUserClicks, subscribeToUserClicks } from '../services/firestore';


export const ClickCounter: React.FC = () => {
  const { user } = useAuth();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!user) return;

    getUserClicks(user.uid).then(setCount);

    const unsub = subscribeToUserClicks(user.uid, setCount);

    return () => {
      unsub();
    };
  }, [user]);

  const handleClick = async () => {
    if (!user) return;
    try {
      await incrementUserClicks(user.uid);
    } catch (error) {
      console.error("Error encountered:", error);
    }
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