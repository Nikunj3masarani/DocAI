import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type StyleTextFieldProps = {
    minheight?: string;
};
const StyledTextFieldComp = styled(TextField)<StyleTextFieldProps>`
    &.MuiFormControl-root {
        min-height: ${({ minheight }) => (minheight ? minheight : `7.8rem`)};

        .MuiFormLabel-root {
            color: ${({ theme }) => theme.colors.davyGrey};
            font-size: 1.4rem;
            font-weight: 400;
            line-height: normal;
            top: -3px;
        }

        .MuiInputBase-input {
            color: ${({ theme }) => theme.colors.black};
            font-size: 1.4rem;
            line-height: normal;
        }
    }

    .MuiFormHelperText-root {
        font-size: 1.4rem;
        margin-left: 0;
    }
`;

export { StyledTextFieldComp };
export type { TextFieldProps };
