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

        if (currentPath.includes(ROUTE.SET_USER_DETAILS) || currentPath.includes(ROUTE.RESET_PASSWORD)) {
            let includePath = ROUTE.SET_USER_DETAILS;

            if (currentPath.includes(ROUTE.RESET_PASSWORD)) {
                includePath = ROUTE.RESET_PASSWORD;
            }

            if (url['search'].includes('token')) {
                const searchQuery = url['search'].substring(1).split('&');
                const searchObj = searchQuery.map((query) => {
                    return query.split('=')[1];
                });

                navigate(`${ROUTE.ROOT}${ROUTE.AUTH}/${includePath}`, {
                    state: {
                        userUuid: searchObj[0],
                        token: searchObj[1],
                    },
                });
            } else {
                if (!url.state?.userUuid) {
                    navigate(`${ROUTE.ROOT}${ROUTE.AUTH}`);
                }
            }
        }
    }, [isLogin, currentPath]);

    return <>{children}</>;
};

export { AuthRoute };
