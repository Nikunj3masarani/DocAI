import { InputBase, InputBaseProps, Paper, PaperProps } from '@mui/material';
import styled from 'styled-components';
type StyledInputBaseProps = InputBaseProps & {
    width: string;
};

const StyledInputBase = styled(InputBase)<StyledInputBaseProps>`
    width: ${({ width }) => width ?? '100%'};
`;

type CustomPaperProps = PaperProps & {
    width?: string;
};

const StyledPaper = styled(Paper)<CustomPaperProps>`
    &.MuiPaper-root {
        display: flex;
        align-items: center;
        padding : 0.5rem;
        width: ${({ width }: { width?: string }) => width ?? '70%'};
        border-radius: 1rem;
    }
`;

export { StyledInputBase, StyledPaper };
export type { StyledInputBaseProps, CustomPaperProps };
