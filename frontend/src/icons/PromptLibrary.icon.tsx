import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')<IconType>`
    fill: ${({ theme, fill }) => (fill ? fill : theme.colors.secondary)};
`;

const PromptLibrary = ({ width = 14, height = 14, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14 14" fill="none" {...props}>
        <StyledPath
            fill={fill}
            fillRule="evenodd"
            d="M2.1 0A2.1 2.1 0 0 0 0 2.1v1.4c0 1.16.94 2.1 2.1 2.1h.12c-.078.219-.12.455-.12.7v1.4c0 .245.042.481.12.7H2.1A2.1 2.1 0 0 0 0 10.5v1.4C0 13.06.94 14 2.1 14h7.7a2.1 2.1 0 0 0 2.1-2.1v-1.4c0-.245-.042-.481-.12-.7h.12A2.1 2.1 0 0 0 14 7.7V6.3a2.1 2.1 0 0 0-2.1-2.1h-.12c.078-.219.12-.455.12-.7V2.1A2.1 2.1 0 0 0 9.8 0H2.1Zm4.2 8.4V5.6h5.6a.7.7 0 0 1 .7.7v1.4a.7.7 0 0 1-.7.7H6.3ZM4.9 5.6v2.8h-.7a.7.7 0 0 1-.7-.7V6.3a.7.7 0 0 1 .7-.7h.7ZM2.8 9.8h-.7a.7.7 0 0 0-.7.7v1.4a.7.7 0 0 0 .7.7h.7V9.8Zm1.4 2.8h5.6a.7.7 0 0 0 .7-.7v-1.4a.7.7 0 0 0-.7-.7H4.2v2.8Zm0-8.4V1.4h5.6a.7.7 0 0 1 .7.7v1.4a.7.7 0 0 1-.7.7H4.2Zm-1.4 0V1.4h-.7a.7.7 0 0 0-.7.7v1.4a.7.7 0 0 0 .7.7h.7Z"
            clipRule="evenodd"
        />
    </svg>
);
export default PromptLibrary;
