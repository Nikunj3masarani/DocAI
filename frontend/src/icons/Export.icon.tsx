import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const Export = ({ width = 16, height = 15, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 16 15" {...props}>
        <StyledPath
            fill={fill}
            d="M4.412 11.25H1.875A1.877 1.877 0 0 1 0 9.375v-7.5C0 .841.841 0 1.875 0h2.982c.501 0 .972.195 1.326.55l.7.7h3.492c1.034 0 1.875.841 1.875 1.875v1.313a.625.625 0 1 1-1.25 0V3.125a.626.626 0 0 0-.625-.625h-3.75a.625.625 0 0 1-.442-.183L5.3 1.433a.62.62 0 0 0-.442-.183H1.875a.626.626 0 0 0-.625.625v7.5c0 .345.28.625.625.625h2.537a.625.625 0 1 1 0 1.25Z"
        />
        <StyledPath
            fill={fill}
            d="M6.625 15A.625.625 0 0 1 6 14.375V12.5a4.38 4.38 0 0 1 4.375-4.375H11V7.5a1.251 1.251 0 0 1 2.134-.884l2.5 2.5c.236.236.366.55.366.884 0 .334-.13.648-.366.884l-2.5 2.5A1.251 1.251 0 0 1 11 12.5v-.625H9.125A1.877 1.877 0 0 0 7.25 13.75v.625c0 .345-.28.625-.625.625Zm2.5-4.375h2.5c.345 0 .625.28.625.625v1.25l2.5-2.5-2.5-2.5v1.25c0 .345-.28.625-.625.625h-1.25c-1.182 0-2.213.66-2.744 1.63.444-.242.953-.38 1.494-.38Z"
        />
    </svg>
);
export default Export;
