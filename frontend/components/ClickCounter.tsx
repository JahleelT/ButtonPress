import React, {useEffect, useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { incrementUserClicks, getUserClicks, subscribeToUserClicks } from '../services/firestore';
import { Button } from './Button';


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
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      <p className="text-center text-gray-700 font-medium mb-3  ">Clicks: {count}</p>
      <Button
        onClick={handleClick}
        disabled={!user}
      >
        Increase click count!
      </Button>
    </div>
  );
};

export default ClickCounter;