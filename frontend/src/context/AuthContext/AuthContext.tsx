import { ACCESS_TOKEN_KEY } from '@docAi-app/utils/constants/storage.constant';
import { getFromLocalStorage } from '@docAi-app/utils/helper';
import { createContext, useState } from 'react';
interface AuthContextType {
    isLogin: boolean;
    setIsLogin: (newLoginState: boolean) => void;
}

const initialAuthContextValue = {
    isLogin: false,
    setIsLogin: (newLoginState: boolean) => {
    },
};

const AuthContext = createContext<AuthContextType>(initialAuthContextValue);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogin, setIsLogin] = useState(getFromLocalStorage(ACCESS_TOKEN_KEY) ? true : false);
    
    const initialValues = {
        isLogin: isLogin,
        setIsLogin: setIsLogin,
    };
    return <AuthContext.Provider value={initialValues}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
