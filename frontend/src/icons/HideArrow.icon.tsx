import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledG = styled('g')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const HideArrow = ({ width = 14, height = 14, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
        <StyledG fill={fill} fillRule="evenodd" clipRule="evenodd">
            <path d="M13.707 13.707a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 1.414L8.414 7l5.293 5.293a1 1 0 0 1 0 1.414Z" />
            <path d="M7.707 13.707a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 1.414L2.414 7l5.293 5.293a1 1 0 0 1 0 1.414Z" />
        </StyledG>
    </svg>
);

export default HideArrow;
