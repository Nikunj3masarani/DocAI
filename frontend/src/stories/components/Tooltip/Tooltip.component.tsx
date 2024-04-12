import { StyledTooltip, TooltipProps } from './Tooltip.styled';

export const Tooltip = ({ ...props }: TooltipProps) => {
    return <StyledTooltip {...props}>{props.children}</StyledTooltip>;
};
