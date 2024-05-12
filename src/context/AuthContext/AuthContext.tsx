import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  auth: boolean;
  signIn: (accessToken: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  auth: false,
  signIn: async () => {}, // Default implementation
  signOut: async () => {}, // Default implementation
});

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const loadAuthData = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAuth(!!token);
    };

    loadAuthData();
  }, []);

  const signIn = async (accessToken: string) => {
    if (!accessToken) {
      console.error('Received empty accessToken in signIn.');
      return;
    }
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      setAuth(true);
    } catch (error) {
      console.error('Error setting accessToken in AsyncStorage', error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{auth, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
