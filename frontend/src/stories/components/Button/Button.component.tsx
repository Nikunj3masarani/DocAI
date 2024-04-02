import { ButtonProps } from '@mui/material/Button';
import { StyledButtonComp } from './button.styled';

type ButtonPropsType = ButtonProps & {
    children?: React.ReactNode;
};

export const Button = ({ children = '', ...props }: ButtonPropsType) => {
    return <StyledButtonComp {...props}>{children}</StyledButtonComp>;
};
