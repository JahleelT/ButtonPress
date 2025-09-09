import React, {useState, createContext, useContext, useEffect } from "react";
import type { ReactNode } from 'react';
import  { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../../services/firebase.ts';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email:string, password:string) => Promise<void>;
  signIn: (email:string, password:string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => { throw new Error("signup called outside AuthProvider"); },
  signIn: async () => { throw new Error("signin called outside AuthProvider"); },
  signOut: async () => { throw new Error("signout called outside AuthProvider"); }
});

export const useAuth = (): AuthContextType => {

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an Auth Provider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email:string, password:string): Promise<void> => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up user: ", error);
    }
  }

  const signIn = async (email:string, password:string): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user) throw new Error("No user returned from sign in");

      const token = await userCredential.user.getIdToken();

      const res = await fetch("https://backend-service-989215811929.us-central1.run.app/api/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const data = await res.json();
      console.log("Backend response:", data);
    } catch(error) {
      console.error("Sign in error:", error);
    }
  }

  const signOut = async (): Promise<void> => {
    firebaseSignOut(auth).then(() => {
      console.log("Signout successful. Goodbye.");
    }).catch((error) => {
      console.error("An error has occurred during the signout process. ", error);
      throw error;
    })
  }

  const value = {
    user, loading, signUp, signIn, signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}