import { styled } from '@mui/material/styles';

type CircularProgressProps = {
    height: string;
    color?: string;
};

export const StyledCircularLoaderContainer = styled('div')<CircularProgressProps>`
    height: ${({ height }) => height};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .MuiCircularProgress-root {
        color: ${({ color }) => color};
    }
`;
