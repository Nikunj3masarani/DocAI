import { Option } from '@docAi-app/types/common.type';
export const ERROR_STATUS_CODE = {
    401: 401,
    403: 403,
};

export const TIMEOUT = {
    STANDARD: 500,
    TOKEN_COUNT: 1000,
    TOAST: 5000,
};

export const PROMPT_SORT_BY_OPTIONS = [
    { label: 'Latest First', value: 'latestFirst' },
    { label: 'Oldest First', value: 'oldestFirst' },
    { label: 'Low to high ratings', value: 'lowToHighRatings' },
    { label: 'High to low ratings', value: 'highToLowRatings' },
];

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
        value: 3,
    },
    editor: {
        label: 'Editor',
        value: 2,
    },
    owner: {
        label: 'Owner',
        value: 1,
    },
} as const;