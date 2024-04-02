import { Suspense } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CircularLoader } from '@docAi-app/stories';
import theme from '@docAi-app/theme';
import { ApiLoader } from '@docAi-app/components';
import { RouterProvider } from 'react-router-dom';
import { routes } from '@docAi-app/routes/Route';

function App() {
    return (
        <Suspense fallback={<CircularLoader />}>
            <ThemeProvider theme={theme}>
                <></>
                <CssBaseline />
                <ApiLoader />
                <RouterProvider router={routes} />
            </ThemeProvider>
        </Suspense>
    );
}

export default App;
