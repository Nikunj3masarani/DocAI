import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledG = styled('g')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const DraftPatent = ({ width = 13, height = 16, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 13 16" {...props}>
        <StyledG fill={fill}>
            <g fillRule="evenodd" clipRule="evenodd">
                <path d="M.454.454A1.55 1.55 0 0 1 1.55 0h6.2c.206 0 .403.082.548.227l3.875 3.875a.775.775 0 0 1 .227.548v9.3a1.55 1.55 0 0 1-1.55 1.55h-9.3A1.55 1.55 0 0 1 0 13.95V1.55C0 1.139.163.745.454.454ZM7.429 1.55H1.55v12.4h9.3V4.971L7.429 1.55Z" />
                <path d="M6.975 0c.428 0 .775.347.775.775V4.65h3.875a.775.775 0 0 1 0 1.55H7.75A1.55 1.55 0 0 1 6.2 4.65V.775C6.2.347 6.547 0 6.975 0Z" />
            </g>
            <path d="M3.1 4.65h1.55V6.2H3.1V4.65ZM3.1 7.75h5.425V9.3H3.1V7.75ZM3.1 10.85h5.425v1.55H3.1v-1.55Z" />
        </StyledG>
    </svg>
);
export default DraftPatent;
