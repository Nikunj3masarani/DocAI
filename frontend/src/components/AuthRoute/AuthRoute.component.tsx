//Import Third Party lib
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//Import Storybook

//Import Component

//Import Page

//Import Hook
import { useAuth } from '@docAi-app/hooks';

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';

//Import Icon

//Import Api

//Import Assets

//Import Style

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLogin } = useAuth();
    const navigate = useNavigate();
    const url = useLocation();
    
    const currentPath = url.pathname;
    const isReset = false;
    
    useEffect(() => {
        if (!currentPath.includes(ROUTE.AUTH)) {
            if (!isLogin) {
                navigate(`/${ROUTE.AUTH}`);
            } 
        } else if (currentPath.includes(ROUTE.AUTH)) {
            if (isLogin) {
                navigate(`${ROUTE.ROOT}${ROUTE.SEARCH}`);
            }
        }
        if (currentPath.includes(ROUTE.RESET_PASSWORD) && !isReset) {
            navigate(`/${ROUTE.AUTH}`);
        }
    }, [isLogin, currentPath]);

    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here

    return <>{children}</>;
};

export { AuthRoute };
