import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')<IconType>`
    stroke: ${({ theme, stroke }) => (stroke ? stroke : theme.colors.davyGrey)};
`;

const StyledCircle = styled('circle')<IconType>`
    fill: ${({ theme, fill }) => (fill ? fill : theme.colors.dawnPink)};
`;

const Cross = ({ width = 25, height = 25, fill, stroke, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
        <StyledCircle cx={12.5} cy={12.5} r={12.5} fill={fill} />
        <StyledPath
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m9.25 9.249 6.942 6.941m-6.942 0 6.942-6.941"
        />
    </svg>
);
export default Cross;
