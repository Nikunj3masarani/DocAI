import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const MoveTo = ({ width = 15, height = 14, fill, ...props }: IconType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 15 14"
            {...props}
        >
            <StyledPath
                fill={fill}
                d="M13.125 1.273H7.65L5.15 0H1.875C.844 0 0 .86 0 1.91V14h15V3.182c0-1.05-.844-1.91-1.875-1.91zm-11.25 0H4.85l2.5 1.272h5.775c.344 0 .625.287.625.637v.636H1.25V1.91c0-.35.281-.636.625-.636zM1.25 12.727V5.091h12.5v7.636H1.25zm9.637-4.715a1.288 1.288 0 010 1.788l-2.062 2.1-.881-.897 1.431-1.458h-5V8.273h5.006L7.944 6.815l.881-.897 2.063 2.1v-.006z"
            ></StyledPath>
        </svg>
    );
};

export default MoveTo;
