import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const Delete = ({ width = 15, height = 14, fill, ...props }: IconType) => (
    <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x={0}
        y={0}
        viewBox="0 0 18 18"
        width={width}
        height={height}
        xmlSpace="preserve"
        {...props}
    >
        <StyledPath
            id="Path_29364"
            d="M2.7 4.5H.9c-.5 0-.9-.5-.9-1 0-.4.3-.8.7-.8H17.3c.4.1.7.5.6 1-.1.4-.4.8-.8.8H15.2v10.7c0 1.2-.7 2.3-1.9 2.6-.2.2-.5.2-.8.2H5.4c-1.5 0-2.7-1.1-2.8-2.6V4.8c.1-.1.1-.2.1-.3zm10.8 0h-9v10.6c-.1.5.3 1 .8 1.1h7.2c.5.1 1-.3 1.1-.8v-.3c-.1 0-.1-10.6-.1-10.6z"
            fill={fill}
        />
        <StyledPath
            id="Path_29365"
            d="M9 0h1.8c.5 0 .9.4.9.9 0 .4-.3.7-.6.8H7.3c-.4 0-.7-.2-.8-.6-.1-.4 0-.8.3-1 0 0 .2-.1.4-.1H9z"
            fill={fill}
        />
        <StyledPath
            id="Path_29366"
            d="M6.3 10.3V8.2c0-.5.4-.9.9-.9s.9.4.9.9v4.4c0 .5-.4.9-.9.9s-.9-.5-.9-1v-2.2z"
            fill={fill}
        />
        <StyledPath
            id="Path_29367"
            d="M11.7 10.4v2.2c0 .5-.4.9-.9.9s-.9-.4-.9-.9V8.2c0-.5.4-.9.9-.9s.9.4.9.9v2.2z"
            fill={fill}
        />
    </svg>
);

export default Delete;
