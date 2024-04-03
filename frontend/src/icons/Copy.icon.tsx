import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')<IconType>`
    fill: ${({ theme, fill }) => (fill ? fill : theme.colors.secondary)};
`;

const Copy = ({ width = 12, height = 14, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
        <StyledPath
            fill={fill}
            d="M8.21 0H1.264C.568 0 0 .568 0 1.263v8.21c0 .348.284.632.632.632a.633.633 0 0 0 .631-.631v-7.58c0-.347.284-.63.632-.63H8.21a.633.633 0 0 0 .631-.632A.633.633 0 0 0 8.211 0Zm2.527 2.526H3.789c-.694 0-1.263.569-1.263 1.263v8.843c0 .694.569 1.263 1.263 1.263h6.948c.695 0 1.263-.569 1.263-1.263V3.789c0-.694-.568-1.263-1.263-1.263Zm-.632 10.106H4.421A.633.633 0 0 1 3.789 12V4.421c0-.347.285-.632.632-.632h5.684c.348 0 .632.285.632.632V12a.633.633 0 0 1-.632.632Z"
        />
    </svg>
);
export default Copy;
