import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const Figure = ({ width = 10, height = 11, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 10 11" {...props}>
        <StyledPath
            fill={fill}
            fillRule="evenodd"
            d="M1.5.7h7c.828 0 1.5.661 1.5 1.477v6.895c0 .816-.672 1.477-1.5 1.477h-7c-.828 0-1.5-.661-1.5-1.477V2.177C0 1.36.672.699 1.5.699ZM9 2.176a.496.496 0 0 0-.5-.493h-7c-.276 0-.5.22-.5.493v6.895c0 .272.224.492.5.492h7c.276 0 .5-.22.5-.492V2.177Zm-6.25.492c.414 0 .75.331.75.74V7.84a.744.744 0 0 1-.75.738.744.744 0 0 1-.75-.738V3.408c0-.408.336-.739.75-.739Zm3 2.71a.744.744 0 0 0-.75-.74c-.414 0-.75.331-.75.74V7.84c0 .407.336.738.75.738s.75-.33.75-.738V5.378Zm1.5 1.23c.414 0 .75.331.75.739v.493a.744.744 0 0 1-.75.738.744.744 0 0 1-.75-.738v-.493c0-.408.336-.739.75-.739Z"
            clipRule="evenodd"
        />
    </svg>
);

export default Figure;
