import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  token: string;
}

interface AuthState {
  authenticated: boolean;
  user: User | null;
}

interface AuthContextData extends AuthState {
  setAuth: (data: AuthState) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    authenticated: false,
    user: null,
  });

  useEffect(() => {
    async function loadStorageData() {
      const storedUser = await AsyncStorage.getItem('@AppCar:user');

      if (storedUser) {
        setAuth({
          authenticated: true,
          user: JSON.parse(storedUser),
        });
      }
    }

    loadStorageData();
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem('@AppCar:user');
    setAuth({
      authenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, signOut }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
