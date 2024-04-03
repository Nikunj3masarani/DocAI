import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')<IconType>`
    fill: ${({ theme, fill }) => (fill ? fill : theme.colors.secondary)};
`;

const Search = ({ width = 16, height = 16, fill, ...props }: IconType) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width={width}
        height={height}
        fill="none"
        {...props}
    >
        <StyledPath
            fill={fill}
            d="M6.44 12.874c1.43 0 2.819-.477 3.947-1.356l4.257 4.257a.8.8 0 0 0 1.131-1.132l-4.256-4.257a6.438 6.438 0 0 0-1.134-9.032 6.438 6.438 0 1 0-3.945 11.52ZM3.02 3.017A4.836 4.836 0 1 1 9.86 9.86a4.836 4.836 0 0 1-6.84 0 4.82 4.82 0 0 1 0-6.842Z"
        />
    </svg>
);
export default Search;
