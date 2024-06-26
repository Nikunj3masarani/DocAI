import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledTextArea = styled(TextField)`
    &.MuiFormControl-root {
        .MuiFormLabel-root {
            color: ${({ theme }) => theme.colors.davyGrey};
            font-size: 1.4rem;
            font-weight: 400;
            line-height: normal;
            top: -3px;
        }

        .MuiInputBase-input {
            color: ${({ theme }) => theme.colors.black};
            line-height: normal;
            font-size: 1.4rem;
        }
        
        .MuiInputBase-root {
            border-radius: 1rem;
        }
    }

    .MuiFormHelperText-root {
        font-size: 1.4rem;
        margin-left: 0;
    }
`;

export { StyledTextArea };
export type { TextFieldProps as TextAreaProps };
