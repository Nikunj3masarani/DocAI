import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')<IconType>`
    fill: ${({ theme, fill }) => (fill ? fill : theme.colors.secondary)};
`;

const StyledPath2 = styled('path')<IconType>`
    stroke: ${({ theme, stroke }) => (stroke ? stroke : theme.colors.secondary)};
    fill: ${({ theme, fill }) => (fill ? fill : theme.colors.secondary)};
`;
const AddToPrompt = ({ width = 14, height = 15, fill, fill1, stroke, ...props }: IconType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 14 15"
            {...props}
        >
            <StyledPath
                fill={fill}
                d="M4.583 15a.443.443 0 01-.423-.339l-.512-1.983c-.282-1.096-1.067-1.961-2.1-2.315L.302 9.936A.457.457 0 010 9.5c0-.198.122-.374.302-.436l1.246-.427c1.033-.354 1.818-1.219 2.1-2.315L4.16 4.34A.443.443 0 014.583 4c.199 0 .372.139.424.339l.511 1.983c.283 1.096 1.068 1.961 2.1 2.315l1.247.427c.18.062.302.238.302.436a.457.457 0 01-.302.436l-1.247.427c-1.032.354-1.817 1.219-2.1 2.315l-.51 1.983a.443.443 0 01-.425.339zM1.846 9.5c1.303.456 2.292 1.553 2.65 2.94l.087.339.088-.34c.358-1.386 1.347-2.484 2.65-2.939-1.303-.455-2.292-1.552-2.65-2.94l-.088-.339-.087.34C4.138 7.948 3.149 9.044 1.846 9.5z"
            ></StyledPath>
            <StyledPath2
                fill={fill1}
                stroke={stroke}
                strokeWidth="0.5"
                d="M10 7a.288.288 0 01-.205-.086.295.295 0 01-.085-.207V1.293c0-.078.03-.152.085-.207a.288.288 0 01.494.207v5.414c0 .078-.03.152-.085.207A.288.288 0 0110 7z"
            ></StyledPath2>
            <StyledPath2
                fill={fill1}
                stroke={stroke}
                strokeWidth="0.5"
                d="M12.707 4.29H7.293a.295.295 0 01-.207-.085.288.288 0 010-.41.295.295 0 01.207-.085h5.414c.078 0 .152.03.207.085a.288.288 0 01-.207.495z"
            ></StyledPath2>
        </svg>
    );
};

export default AddToPrompt;
