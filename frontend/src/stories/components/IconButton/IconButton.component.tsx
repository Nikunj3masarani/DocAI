import { IconButtonProps } from '@mui/material/IconButton';
import StyledIconButton from './IconButton.styled';

export type CustomIconsProps = IconButtonProps & {
    isbordered?: boolean | string;
    customSize?: string;
    borderradius?: string;
};
export const IconButton = ({ children, ...others }: CustomIconsProps): JSX.Element => {
    return (
        <StyledIconButton {...others} isbordered={others.isbordered ? 'true' : 'false'}>
            {children}
        </StyledIconButton>
    );
};
