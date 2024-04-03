import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')<IconType>`
    fill: ${({ theme, fill }) => (fill ? fill : theme.colors.white)};
`;

const Plus = ({ width = 14, height = 14, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 14 14" {...props}>
        <StyledPath
            fill={fill}
            d="M7 14a.951.951 0 0 1-.951-.951V.95a.951.951 0 1 1 1.902 0V13.05A.951.951 0 0 1 7 14Z"
        />
        <StyledPath fill={fill} d="M13.049 7.951H.95a.951.951 0 1 1 0-1.902H13.05a.951.951 0 1 1 0 1.902Z" />
    </svg>
);
export default Plus;
