import { createContext, useState } from 'react';
interface AuthContextType {
    isLogin: boolean;
    setIsLogin: (newLoginState: boolean) => void;
}

const initialAuthContextValue = {
    isLogin: false,
    setIsLogin: (newLoginState: boolean) => {
        console.log(newLoginState);
    },
};

const AuthContext = createContext<AuthContextType>(initialAuthContextValue);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogin, setIsLogin] = useState(true);
    const initialValues = {
        isLogin: isLogin,
        setIsLogin: setIsLogin,
    };
    return <AuthContext.Provider value={initialValues}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
