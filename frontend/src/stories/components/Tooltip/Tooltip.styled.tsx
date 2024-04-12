import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

const StyledTooltip = styled((props: TooltipProps) => <Tooltip classes={{ popper: props.className }} {...props} />)`
    & .MuiTooltip-tooltip {
        font-size: 1.2rem;
    }

    &.MuiTooltip-popper[data-popper-placement*='bottom'] {
        .MuiTooltip-tooltipPlacementBottom.MuiTooltip-tooltip {
            margin-top: 5px;
        }
    }
`;

export { StyledTooltip };
export type { TooltipProps };
