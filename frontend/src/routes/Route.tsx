import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import {
    Chat,
    ForgotPassword,
    IndexList,
    InviteToBrain,
    Login,
    PageNotFound,
    ResetPassword,
    SetUserDetails,
} from '@docAi-app/pages';
import { AuthContainer, AuthRoute, ErrorComponent, MainContainer, UpdateIndex } from '@docAi-app/components';
import { Search } from '@docAi-app/pages/Search';
import { ChatCreateContextProvider } from '@docAi-app/context/ChatCreateContext/ChatCreateContext';

const errorElement = {
    errorElement: <ErrorComponent />,
};

const AUTHCHILDROUTES: RouteObject[] = [
    {
        index: true,
        element: <Navigate to={ROUTE.LOGIN} />,
        ...errorElement,
    },
    {
        path: ROUTE.LOGIN,
        element: <Login />,
        ...errorElement,
    },
    {
        path: ROUTE.FORGOT_PASSWORD,
        element: <ForgotPassword />,
        ...errorElement,
    },
    {
        path: ROUTE.RESET_PASSWORD,
        element: <ResetPassword />,
        ...errorElement,
    },
    {
        path: ROUTE.SET_USER_DETAILS,
        element: <SetUserDetails />,
        ...errorElement,
    },
];

const PRIVATE_ROUTES: RouteObject[] = [
    {
        index: true,
        element: <Navigate to={ROUTE.HOME} />,
        ...errorElement,
    },
    {
        path: `${ROUTE.HOME}`,
        element: <Search />,
        ...errorElement,
    },
    {
        path: `${ROUTE.INDEX_LIST}`,
        element: <IndexList />,
        ...errorElement,
    },
    {
        path: `${ROUTE.INDEX_LIST}/:${ROUTE.INDEX_ID}`,
        element: <UpdateIndex />,
        ...errorElement,
    },
    {
        path: `${ROUTE.CHAT}/:${ROUTE.CHAT_ID}`,
        element: <Chat />,
        ...errorElement,
    },
];

const ROUTES: RouteObject[] = [
    {
        path: ROUTE.ROOT,
        element: (
            <AuthRoute>
                <ChatCreateContextProvider>
                    <MainContainer />
                </ChatCreateContextProvider>
            </AuthRoute>
        ),
        ...errorElement,
        children: PRIVATE_ROUTES,
    },
    {
        path: `${ROUTE.ROOT}${ROUTE.INVITE_TO_BRAIN}`,
        element: (
            <AuthRoute>
                <InviteToBrain />
            </AuthRoute>
        ),
        ...errorElement,
    },
    {
        path: ROUTE.AUTH,
        element: (
            <AuthRoute>
                <AuthContainer />
            </AuthRoute>
        ),
        children: AUTHCHILDROUTES,
        ...errorElement,
    },

    {
        path: ROUTE.WILDCARD,
        element: <PageNotFound />,
    },
];

export const routes = createBrowserRouter(ROUTES);
