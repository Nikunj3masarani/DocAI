import { createTheme } from '@mui/material/styles';
import { Theme } from './theme';

const theme = createTheme({
    ...Theme,

    palette: {
        primary: {
            main: Theme.colors.primary,
        },

        secondary: {
            main: Theme.colors.secondary,
        },

        text: {
            primary: Theme.colors.secondary,
            secondary: Theme.colors.primary,
        },

        error: {
            main: Theme.colors.error,
        },
    },

    typography: {
        ...Theme.typography,
        fontSize: 14,
        htmlFontSize: 11.4,
    },
});

export default theme;
