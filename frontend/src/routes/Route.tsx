import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import { Login, PageNotFound } from '@docAi-app/pages';
import { AuthContainer, ErrorComponent, MainContainer } from '@docAi-app/components';

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
        element: null,
        ...errorElement,
    },
];
const ROUTES: RouteObject[] = [
    {
        path: ROUTE.ROOT,
        element: <MainContainer />,
        ...errorElement,
        children: [
            {
                path: ROUTE.AUTH,
                element: <AuthContainer />,
                children: AUTHCHILDROUTES,
                ...errorElement,
            },
        ],
    },

    {
        path: ROUTE.WILDCARD,
        element: <PageNotFound />,
    },
];

export const routes = createBrowserRouter(ROUTES);
