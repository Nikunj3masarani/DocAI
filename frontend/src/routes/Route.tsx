import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { ForgotPassword, Login, PageNotFound, ResetPassword } from '@docAi-app/pages';
import { AuthContainer, AuthRoute, ErrorComponent, MainContainer } from '@docAi-app/components';
import { Search } from '@docAi-app/pages/Search';
import { Models } from '@docAi-app/pages/Models';

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
        index: true,
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
];

const PRIVATE_ROUTES: RouteObject[] = [
    {
        path: `${ROUTE.SEARCH}`,
        element: <Search />,
        ...errorElement,
    },
    {
        path: `${ROUTE.MODELS}`,
        element: <Models />,
        ...errorElement,
    },
];
const ROUTES: RouteObject[] = [
    {
        path: ROUTE.ROOT,
        element: (
            <AuthRoute>
                <MainContainer />
            </AuthRoute>
        ),
        ...errorElement,
        children: PRIVATE_ROUTES,
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
