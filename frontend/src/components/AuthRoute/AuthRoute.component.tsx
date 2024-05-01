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
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '@docAi-app/utils/helper';
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
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLogin } = useAuth();
    const navigate = useNavigate();
    const url = useLocation();

    const currentPath = url.pathname;

    useEffect(() => {
        if (!currentPath.includes(ROUTE.AUTH)) {
            const redirectUrlInfo: Partial<{ url: string; state: any }> = getFromLocalStorage(REDIRECT_URL);

            if (!isLogin) {
                if (!redirectUrlInfo?.url) {
                    setToLocalStorage(REDIRECT_URL, {
                        url: currentPath,
                        state: { ...getUrlSearchObject(url['search']) },
                    });
                }
                navigate(`/${ROUTE.AUTH}`);
            } else if (redirectUrlInfo?.url) {
                const { url, state } = redirectUrlInfo;
                removeFromLocalStorage(REDIRECT_URL);
                navigate(url, { state: state });
            }
        } else if (currentPath.includes(ROUTE.AUTH)) {
            if (isLogin) {
                navigate(`${ROUTE.ROOT}${ROUTE.HOME}`);
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
                if (searchObj?.user_uuid !== getFromLocalStorage(USER_UUID)) {
                    navigate(`${ROUTE.ROOT}${ROUTE.AUTH}`);
                } else {
                    navigate(`${ROUTE.ROOT}${includePath}`, {
                        state: { ...searchObj },
                    });
                }
            } else {
                if (!url.state?.userUuid) {
                    navigate(`${ROUTE.ROOT}${ROUTE.AUTH}`);
                }
            }
        }
    }, [isLogin, currentPath]);

    return <>{children}</>;
};

function getUrlSearchObject(querySearch: string) {
    const searchQuery = querySearch.substring(1).split('&');

    const searchObj: Partial<typeof SEARCH_QUERY> = {};

    searchQuery.forEach((query: string) => {
        const tempQuery = query.split('=');

        searchObj[tempQuery[0] as keyof typeof SEARCH_QUERY] = tempQuery[1];
    });

    return searchObj;
}
export { AuthRoute };
