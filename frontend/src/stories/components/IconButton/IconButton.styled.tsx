import { styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { CustomIconsProps } from './IconButton.component';

const StyledIconButton = styled(IconButton)<CustomIconsProps>`
    &.MuiButtonBase-root {
        ${({ customSize }) => {
            if (customSize) {
                return {
                    height: customSize,
                    width: customSize,
                };
            }
        }}

        ${({ isbordered, theme, borderradius }) => {
            if (isbordered === 'true') {
                return {
                    border: `1px solid ${theme.colors.seashell}`,
                    borderRadius: borderradius ? borderradius : '6px',
                };
            }
        }}
    }
`;

export default StyledIconButton;
