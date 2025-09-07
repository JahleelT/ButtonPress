import { useAuth } from '../src/contexts/AuthContext';
import { ClickCounter } from './ClickCounter';
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
        <p>Welcome, {user.email}</p>
        <ClickCounter/>
        <button onClick={signOut}>Sign Out</button>
      </div>
      : 

      /* Logged Out UI */
      <div>
        <p>Welcome! Please Sign In or Up to Get Started!</p>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Password'
        />
        <button onClick={() => signIn(email, password)}>Sign In</button>
        <button onClick={() => signUp(email, password)}>Sign Up</button>
      </div>
      }
    </div>
  )
}

export default AuthUI;