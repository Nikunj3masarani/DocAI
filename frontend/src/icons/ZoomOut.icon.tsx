import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledG = styled('g')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const ZoomOut = ({ width = 14, height = 14, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 14 14" {...props}>
        <StyledG fill={fill}>
            <path d="M9.1 8.4a.7.7 0 0 1 .495.205L12.6 11.61V9.8a.7.7 0 0 1 1.4 0v3.5a.7.7 0 0 1-.7.7H9.8a.7.7 0 0 1 0-1.4h1.81L8.605 9.595A.7.7 0 0 1 9.1 8.4ZM.7 0h3.5a.7.7 0 1 1 0 1.4H2.39l3.005 3.005a.7.7 0 0 1-.99.99L1.4 2.39V4.2a.7.7 0 1 1-1.4 0V.7A.7.7 0 0 1 .7 0ZM8.4 4.9a.7.7 0 0 1 .205-.495L11.61 1.4H9.8a.7.7 0 0 1 0-1.4h3.5a.7.7 0 0 1 .7.7v3.5a.7.7 0 0 1-1.4 0V2.39L9.595 5.395A.7.7 0 0 1 8.4 4.9ZM0 13.3V9.8a.7.7 0 1 1 1.4 0v1.81l3.005-3.005a.7.7 0 0 1 .99.99L2.39 12.6H4.2a.7.7 0 0 1 0 1.4H.7a.7.7 0 0 1-.7-.7Z" />
        </StyledG>
    </svg>
);

export default ZoomOut;
