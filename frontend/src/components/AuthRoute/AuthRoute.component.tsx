/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
    clearLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    setToLocalStorage,
} from '@docAi-app/utils/helper';
import { REDIRECT_URL } from '@docAi-app/utils/constants/storage.constant';
import { USER_UUID } from '../../utils/constants/storage.constant';

//Import Icon

//Import Api

//Import Assets

//Import Style

const SEARCH_QUERY = {
    user_uuid: 'userUuid',
    token: 'token',
    index_uuid: 'indexUuid',
    title: 'title',
    status: 'status',
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLogin, setIsLogin } = useAuth();
    const navigate = useNavigate();
    const url = useLocation();
    const currentPath = url.pathname;
    useEffect(() => {
        // for private route
        if (!currentPath.includes(ROUTE.AUTH)) {
            const redirectUrlInfo: Partial<{ url: string; state: any }> = getFromLocalStorage(REDIRECT_URL);

            if (!isLogin) {
                removeFromLocalStorage(REDIRECT_URL);
                setToLocalStorage(REDIRECT_URL, {
                    url: currentPath,
                    state: { ...getUrlSearchObject(url['search']) },
                });
                return navigate(`${ROUTE.ROOT}${ROUTE.AUTH}/${ROUTE.LOGIN}`);
            } else if (redirectUrlInfo?.url) {
                const { url, state } = redirectUrlInfo;
                removeFromLocalStorage(REDIRECT_URL);
                return navigate(url, { state: { ...state } });
            }
        }
        // for public route
        else if (currentPath.includes(ROUTE.AUTH)) {
            if (isLogin) {
                const redirectUrlInfo: Partial<{ url: string; state: any }> = getFromLocalStorage(REDIRECT_URL);
                removeFromLocalStorage(REDIRECT_URL);

                if (redirectUrlInfo?.url) {
                    const { url, state } = redirectUrlInfo;
                    return navigate(url, { state: { ...state } });
                } else {
                    return navigate(`${ROUTE.ROOT}`);
                }
            }
        }

        if (
            currentPath.includes(ROUTE.SET_USER_DETAILS) ||
            currentPath.includes(ROUTE.RESET_PASSWORD) ||
            currentPath.includes(ROUTE.INVITE_TO_BRAIN)
        ) {
            let includePath = `${ROUTE.AUTH}/${ROUTE.SET_USER_DETAILS}`;

            if (currentPath.includes(ROUTE.RESET_PASSWORD)) {
                includePath = `${ROUTE.AUTH}/${ROUTE.RESET_PASSWORD}`;
            } else if (currentPath.includes(ROUTE.INVITE_TO_BRAIN)) {
                includePath = ROUTE.INVITE_TO_BRAIN;
            }

            if (url['search'].length > 0) {
                const searchObj = getUrlSearchObject(url['search']);
                const currUser = getFromLocalStorage(USER_UUID);

                if (!currUser || (currentPath.includes(ROUTE.INVITE_TO_BRAIN) && searchObj?.userUuid !== currUser)) {
                    clearLocalStorage();
                    setIsLogin(false);
                }

                return navigate(`${ROUTE.ROOT}${includePath}`, {
                    state: { ...searchObj },
                });
            } else {
                if (!url.state?.userUuid) {
                    return navigate(`${ROUTE.ROOT}${ROUTE.AUTH}`);
                }
            }
        }
    }, [isLogin, currentPath]);

    return <>{children}</>;
};

function getUrlSearchObject(querySearch: string) {
    const searchQuery = querySearch.substring(1).split('&');

    const searchObj: { [x: string]: string } = {};

    searchQuery.forEach((query: string) => {
        const tempQuery = query.split('=');

        searchObj[SEARCH_QUERY[tempQuery[0] as keyof typeof SEARCH_QUERY]] = tempQuery[1];
    });

    return searchObj;
}
export { AuthRoute };
