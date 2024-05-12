import React, {createContext, ReactNode, useState} from 'react';

interface AuthContextType {
  user: any;
  signIn: (data: any) => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  signIn: () => {}, 
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState(null);

  const signIn = (data: any) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{user, signIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext};
