import { StyledTooltip, TooltipProps } from './Tooltip.styled';

const Tooltip = ({ ...props }: TooltipProps) => {
    return <StyledTooltip {...props}>{props.children}</StyledTooltip>;
};

export { Tooltip };
