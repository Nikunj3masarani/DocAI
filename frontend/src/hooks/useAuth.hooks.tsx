import { AuthContext } from '@docAi-app/context/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth used outside AuthContext');
    }

    return context;
};

export { useAuth };
