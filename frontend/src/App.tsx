import { Suspense } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CircularLoader, StyledToastContainer } from '@docAi-app/stories';
import theme from '@docAi-app/theme';
import { ApiLoader, AuthRoute } from '@docAi-app/components';
import { RouterProvider } from 'react-router-dom';
import { routes } from '@docAi-app/routes/Route';
import { AuthContextProvider } from '@docAi-app/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Suspense fallback={<CircularLoader />}>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                    <CssBaseline />
                    <ApiLoader />
                    <StyledToastContainer />
                    <RouterProvider router={routes} />{' '}
                </AuthContextProvider>
            </ThemeProvider>
        </Suspense>
    );
}

export default App;
