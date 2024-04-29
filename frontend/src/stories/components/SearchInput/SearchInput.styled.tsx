import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledSearchInput = styled(TextField)`
    &.MuiFormControl-root {
        margin: 0;
    }   
    .MuiInputBase-root {
        background-color: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) => theme.colors.secondary20};
        border-radius: 1rem;

        &:hover,
        &.Mui-focused {
            border: 1px solid ${({ theme }) => theme.colors.secondary};
        }

        .MuiInputBase-input {
            margin-right: 0.6rem;
        }

        &.MuiInputBase-adornedStart {
            svg {
                width: 2rem;
            }
        }

        .clear-icon {
            width: 3rem;

            svg {
                width: 3rem;
            }
        }

        :hover {
            border: 1px solid ${({ theme }) => theme.colors.davyGrey};

            .MuiOutlinedInput-notchedOutline {
                border: 0px solid ${({ theme }) => theme.colors.davyGrey};
            }
        }

        &.Mui-focused {
            .MuiOutlinedInput-notchedOutline {
                border: 0px solid ${({ theme }) => theme.colors.davyGrey};
            }
        }

        .MuiOutlinedInput-notchedOutline {
            border: 0px solid ${({ theme }) => theme.colors.davyGrey};
        }

        .MuiInputBase-input {
            font-size: 1.4rem;
            font-weight: 500;
            padding: 0.9rem 1.4rem;
        }
    }

    .MuiOutlinedInput-root {
        padding-right: 0;
    }
`;

export { StyledSearchInput };
export type { TextFieldProps };
