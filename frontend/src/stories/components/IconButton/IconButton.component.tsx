//Import Third Party lib

//Import Storybook

//Import Component
import StyledIconButton from './IconButton.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { IconButtonProps } from '@mui/material/IconButton';

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style

type CustomIconsProps = IconButtonProps & {
    isbordered?: boolean | string;
    customSize?: string;
    borderradius?: string;
};

const IconButton = ({ children, ...others }: CustomIconsProps): JSX.Element => {
    return (
        <StyledIconButton {...others} isbordered={others.isbordered ? 'true' : 'false'}>
            {children}
        </StyledIconButton>
    );
};

export { IconButton, type CustomIconsProps };
