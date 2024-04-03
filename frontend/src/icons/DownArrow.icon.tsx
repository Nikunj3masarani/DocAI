import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.cinder)};
`;

const DownArrow = ({ width = 12, height = 7, fill, ...props }: IconType) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 12 7" {...props}>
            <StyledPath
                fill={fill}
                d="M1.539.268L6 4.793 10.461.268a.892.892 0 011.275 0 .924.924 0 010 1.293L6.637 6.732A.9.9 0 016 7a.895.895 0 01-.637-.268L.264 1.561A.924.924 0 01.405.15.892.892 0 011.54.268z"
            ></StyledPath>
        </svg>
    );
};

export default DownArrow;
