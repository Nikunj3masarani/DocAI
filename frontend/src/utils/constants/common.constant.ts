import { Option } from '@docAi-app/types';
export const ERROR_STATUS_CODE = {
    422: 422,
};

export const TIMEOUT = {
    STANDARD: 500,
    TOKEN_COUNT: 1000,
    TOAST: 3000,
};

export const PAGINATION_OPTIONS = [
    { label: 10, value: 10 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 },
];

export const InputChipsAddOnOption = {
    Tab: 'Tab',
    Comma: ',',
    Enter: 'Enter',
};

export const CHIPS_OPTIONS = [InputChipsAddOnOption.Enter, InputChipsAddOnOption.Tab, InputChipsAddOnOption.Comma];

export const USER_ROLE: Readonly<Record<string, Option>> = {
    viewer: {
        label: 'Viewer',
        value: 2,
    },
    editor: {
        label: 'Editor',
        value: 3,
    },
    owner: {
        label: 'Owner',
        value: 1,
    },
} as const;

export const ALLOW_FILE_TYPES = ['PDF', 'TXT', 'HTML'];
export const MAX_FILE_SIZE = 10;
