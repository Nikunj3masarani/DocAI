import { styled } from '@mui/material';
import { IconType } from '@patent-app/types/Common.type';

const StyledPath = styled('path')<IconType>`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const Download = ({ width = 13.451, height = 20.177, fill, ...props }: IconType) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 13.451 20.177" {...props}>
            <g data-name="Group 24565">
                <StyledPath
                    fill={fill}
                    data-name="Path 18150"
                    d="M6.131 16.567c.019.019.04.038.061.055l.03.022.036.027.037.022.034.02.038.018.036.017.038.014.04.014.038.01.042.01.045.007.037.005a.846.846 0 00.166 0l.037-.005.045-.007.042-.01.038-.01.04-.014.038-.014.036-.017.038-.018.034-.02.037-.022.036-.027.03-.022a.797.797 0 00.061-.055l5.885-5.885a.841.841 0 00-1.19-1.188l-4.45 4.45V.841a.841.841 0 00-1.681 0v13.1l-4.45-4.45A.841.841 0 10.246 10.68z"
                />
                <StyledPath
                    fill={fill}
                    data-name="Path 18151"
                    d="M12.61 18.495H.841a.841.841 0 000 1.681h11.77a.841.841 0 100-1.681z"
                />
            </g>
        </svg>
    );
};

export default Download;
