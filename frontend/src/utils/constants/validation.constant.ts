import { Validation } from '@docAi-app/types';
import { REGEX } from './regex.constant';

export const PASSWORD = {
    MIN_LENGTH: 8,
    MAX_LENGTH: 12,
};

export const EMAIL_VALIDATION: Validation = {
    required: { message: 'Email is required' },
    regex: { message: 'Please add valid email', regexPattern: REGEX.EMAIL_VALID },
};

export const PASSWORD_VALIDATION: Validation = {
    required: { message: 'Password in required' },
    // between: {
    //     minLength: PASSWORD.MIN_LENGTH,
    //     maxLength: PASSWORD.MAX_LENGTH,
    //     message: `Password length must be between ${PASSWORD.MIN_LENGTH} and ${PASSWORD.MAX_LENGTH}`,
    // },
    // regex: {
    //     message: 'Password must contain alpha numeric characters',
    //     regexPattern: REGEX.ALPHA_NUMERIC_WITH_SPECIAL_REGEXP,
    // },
};

export const CONFIRM_PASSWORD_VALIDATION: Validation = {
    required: { message: 'Confirm Password in required' },
    between: {
        minLength: PASSWORD.MIN_LENGTH,
        maxLength: PASSWORD.MAX_LENGTH,
        message: `Confirm Password length must be between ${PASSWORD.MIN_LENGTH} and ${PASSWORD.MAX_LENGTH}`,
    },
    regex: {
        message: 'Confirm Password must contain alpha numeric characters',
        regexPattern: REGEX.ALPHA_NUMERIC_WITH_SPECIAL_REGEXP,
    },
};
