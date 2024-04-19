//Import Third Party lib
import { CircularProgress } from '@mui/material';

//Import Storybook

//Import Component
import { StyledCircularLoaderContainer } from './CircularLoader.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import { Theme } from '@docAi-app/theme/theme';

//Import Icon

//Import Api

//Import Assets

//Import Style

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
