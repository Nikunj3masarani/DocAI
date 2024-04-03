import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledG = styled('g')<IconType>`
    fill: ${({ theme, fill }) => (fill ? fill : theme.colors.secondary)};
`;

const StyledPath = styled('path')<IconType>`
    stroke: ${({ theme, stroke }) => (stroke ? stroke : theme.colors.black)};
`;

const BrowsePrompt = ({ width = 16, height = 17, fill, stroke, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
        <StyledG fill={fill}>
            <path d="M6 14a.576.576 0 0 1-.555-.431l-.67-2.524a4.23 4.23 0 0 0-2.748-2.947L.395 7.554A.583.583 0 0 1 0 7c0-.252.16-.476.395-.554l1.632-.544a4.23 4.23 0 0 0 2.749-2.947l.67-2.524A.576.576 0 0 1 6 0c.26 0 .487.177.555.431l.67 2.524a4.23 4.23 0 0 0 2.748 2.947l1.631.544A.583.583 0 0 1 12 7c0 .252-.16.476-.396.554l-1.631.544a4.23 4.23 0 0 0-2.749 2.947l-.67 2.524A.576.576 0 0 1 6 14ZM2.417 7c1.705.58 3 1.976 3.469 3.741l.114.432.114-.432A5.386 5.386 0 0 1 9.584 7a5.386 5.386 0 0 1-3.47-3.741L6 2.827l-.114.432A5.387 5.387 0 0 1 2.416 7Z" />
            <StyledPath
                stroke={stroke}
                strokeWidth={0.3}
                d="M12.5 16a.242.242 0 0 1-.231-.185l-.279-1.082a1.793 1.793 0 0 0-1.145-1.262l-.68-.233A.25.25 0 0 1 10 13a.25.25 0 0 1 .165-.238l.68-.233a1.793 1.793 0 0 0 1.145-1.262l.279-1.082A.242.242 0 0 1 12.5 10c.108 0 .203.076.231.185l.279 1.082c.154.597.582 1.07 1.145 1.262l.68.233A.25.25 0 0 1 15 13a.25.25 0 0 1-.165.238l-.68.233a1.793 1.793 0 0 0-1.145 1.262l-.279 1.082A.242.242 0 0 1 12.5 16Zm-1.493-3c.71.248 1.25.847 1.445 1.603l.048.185.048-.185A2.284 2.284 0 0 1 13.993 13a2.284 2.284 0 0 1-1.445-1.603l-.048-.186-.048.186A2.284 2.284 0 0 1 11.007 13Z"
            />
        </StyledG>
    </svg>
);

export default BrowsePrompt;
