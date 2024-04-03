import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledG = styled('g')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const ZoomIn = ({ width = 14, height = 14, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 14 14" {...props}>
        <StyledG fill={fill} fillRule="evenodd" clipRule="evenodd">
            <path d="m11.086 3.9 2.708-2.7a.702.702 0 1 0-.993-.994L10.1 2.914V1.102a.7.7 0 0 0-1.4 0V4.6a.7.7 0 0 0 .7.7h3.498a.7.7 0 0 0 0-1.4h-1.812ZM1.103 8.7h3.498a.7.7 0 0 1 .7.699v3.498a.7.7 0 0 1-1.4 0v-1.812l-2.7 2.708a.7.7 0 0 1-.994 0 .7.7 0 0 1 0-.993l2.708-2.702H1.103a.7.7 0 0 1 0-1.399ZM3.9 2.914 1.2.206a.703.703 0 0 0-.994.993L2.914 3.9H1.102a.7.7 0 0 0 0 1.4H4.6a.7.7 0 0 0 .7-.7V1.102a.7.7 0 1 0-1.4 0v1.812Zm4.8 9.983V9.399a.7.7 0 0 1 .699-.7h3.498a.7.7 0 0 1 0 1.4h-1.812l2.708 2.7a.7.7 0 0 1 0 .994.7.7 0 0 1-.993 0l-2.702-2.708v1.812a.7.7 0 0 1-1.399 0Z" />
        </StyledG>
    </svg>
);

export default ZoomIn;
