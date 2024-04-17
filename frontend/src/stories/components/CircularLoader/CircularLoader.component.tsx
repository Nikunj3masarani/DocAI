import { CircularProgress } from '@mui/material';
import { Theme } from '@docAi-app/theme/theme';
import { StyledCircularLoaderContainer } from './CircularLoader.styled';

type CircularLoaderProps = {
    height?: string;
    color?: string;
    size?: string | number;
};

export const CircularLoader = ({
    height = '100vh',
    color = Theme.colors.primary,
    size = 40,
}: CircularLoaderProps): JSX.Element => {
    return (
        <StyledCircularLoaderContainer height={height} color={color}>
            <CircularProgress size={size} />
        </StyledCircularLoaderContainer>
    );
};
