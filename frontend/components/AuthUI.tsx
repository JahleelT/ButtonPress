import { useAuth } from '../src/contexts/AuthContext';
import { ClickCounter } from './ClickCounter';
import React, { useState }  from 'react';
import { Button } from './Button';

export const AuthUI: React.FC = () => {
  const { user, loading, signUp, signIn, signOut } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }
  // from-cyan-500 via-sky-500 via-blue-500 via-indigo-500 via-violet-500 via-purple-500 to-fuchsia-500
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-sky-500 via-blue-500 via-indigo-500 via-violet-500 via-purple-500 to-fuchsia-500 p-4">
      { (user) ?  
      
      /* Logged In UI */
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <p className="text-center text-lg font-medium text-gray-700 mb-4">Welcome, {user.email}!</p>

        <ClickCounter/>

        <Button color="bg-red-500" onClick={signOut}>
          Sign Out
        </Button>

      </div>

      : // <-- False condition begins here

      /* Logged Out UI */
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <p className="text-center text-lg font-medium text-gray-700 mb-4">Welcome! Please Sign In or Up to Get Started!</p>

        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Password'
          className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button onClick={() => signIn(email, password)}>
          Sign In
        </Button>

        <Button onClick={() => signUp(email, password)}>
          Sign Up
        </Button>
      </div>
      }
    </div>
  )
}

export default AuthUI;