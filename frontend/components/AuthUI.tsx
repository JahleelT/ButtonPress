import { useAuth } from '../src/contexts/AuthContext';
import React, { useState }  from 'react';

export const AuthUI: React.FC = () => {
  const { user, loading, signUp, signIn, signOut } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      { (user) ?  
      /* Logged In UI */
      <div>

      </div>
      : 
      /* Logged Out UI */
      <div>

      </div>
      }
    </div>
  )
}

export default AuthUI;