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
  userId: string | null;
  userRole: string | null;
  signIn: (
    accessToken: string,
    userId: string,
    userRole: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  auth: false,
  userId: null,
  userRole: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserRole = await AsyncStorage.getItem('userRole');
      if (token) {
        setAuth(true);
        setUserId(storedUserId);
        setUserRole(storedUserRole);
      }
    };

    loadAuthData();
  }, []);

  const signIn = async (
    accessToken: string,
    userId: string,
    userRole: string,
  ) => {
    if (!accessToken || !userId || !userRole) {
      console.error('Received empty parameters in signIn.');
      return;
    }
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('userRole', userRole);
      setAuth(true);
      setUserId(userId);
      setUserRole(userRole);
    } catch (error) {
      console.error('Error setting user data in AsyncStorage', error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userRole');
    setAuth(false);
    setUserId(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{auth, userId, userRole, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
