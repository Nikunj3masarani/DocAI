// Note: If your color is rgba(colorName, 0.05) name it as colorName5
// If your color is rgba(colorName, 0.5) name it as colorName50

import '@mui/material/styles/createTheme';

const COLORS = {
    primary: '#753FEA',
    primary5: '#F8F5FE',
    primary10: '#F1ECFD',
    primary20: '#E3D9FB',
    primary40: '#C8B2F7',
    primary60: '#AC8CF2',
    primary80: '#9165EE',

    secondary: '#232528',
    secondary5: '#F4F4F4',
    secondary10: '#E9E9E9',
    secondary20: '#D3D3D4',
    secondary40: '#A7A8A9',
    secondary60: '#7B7C7E',
    secondary80: '#4F5153',

    error: '#FF3434',
    black: '#000000',
    black10: 'rgba(#000000, 0.1)',
    black20 : 'rgba(#000000 , 0.2)',
    white: '#FFFFFF',

    mercury: '#E8E6DE',
    desertStorm: '#F8F8F5',
    turquoise: '#46DAFF',
    earthBlue: '#000094',
    artyClickCoolMagenta: '#B900FF',
    artyClickCoolMagenta10: 'rgba(185, 0, 255, 0.1)',
    mirage5: 'rgba(16, 24, 40, 0.05)',
    davyGrey: '#565655',
    platinum: '#E5E5E1',
    dawnPink: '#ECECEC',
    cinder: '#151515',
    cinder10: 'rgba(#151515, 0.1)',
    seashell: '#F1F1F1',
    transparent: 'transparent',
    red : '#red',

    zIndex: {
        linearLoader: 1400,
    },
};

const FONT_FAMILY = {
    normal: "'Inter'",
};

export const Theme = {
    colors: COLORS,
    typography: {
        fontFamily: [FONT_FAMILY.normal].join(','),
    },
};

declare module '@mui/material/styles/createTheme' {
    export interface Theme {
        colors: typeof COLORS;
    }

    export interface ThemeOptions {
        colors: typeof COLORS;
    }
}
