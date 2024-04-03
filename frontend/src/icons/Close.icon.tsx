import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')<IconType>`
    stroke: ${({ theme, stroke }) => (stroke ? stroke : theme.palette.primary.main)};
`;

const Close = ({ width = 18, height = 19, stroke, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 19" fill="none" {...props}>
        <StyledPath d="M2.01904 2L16.4638 16.7481" stroke={stroke} stroke-width="2" stroke-linecap="round" />
        <StyledPath d="M1.46387 17L15.9086 2.2519" stroke={stroke} stroke-width="2" stroke-linecap="round" />
    </svg>
);

export default Close;
