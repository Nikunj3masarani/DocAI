import { styled } from '@mui/material/styles';
import { IconType } from '@patent-app/types/Common.type';

const StyledG = styled('g')`
    fill: ${({ fill, theme }) => (fill ? fill : theme.colors.secondary)};
`;

const Edit = ({ width = 13, height = 13, fill, ...props }: IconType) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 13 13" {...props}>
        <StyledG fill={fill}>
            <path d="M12.408 5.91a.59.59 0 0 0-.591.59v3.546a1.772 1.772 0 0 1-1.773 1.772h-7.09a1.773 1.773 0 0 1-1.772-1.772v-7.09a1.773 1.773 0 0 1 1.772-1.773H6.5a.59.59 0 1 0 0-1.182H2.954A2.954 2.954 0 0 0 0 2.956v7.09A2.955 2.955 0 0 0 2.954 13h7.09A2.954 2.954 0 0 0 13 10.046V6.5a.59.59 0 0 0-.591-.591Z" />
            <path d="M4.065 5.59a1.773 1.773 0 0 0-.52 1.26v.832a1.773 1.773 0 0 0 1.773 1.773h.833a1.772 1.772 0 0 0 1.258-.52l5.07-5.07a1.773 1.773 0 0 0 0-2.51L11.646.52a1.771 1.771 0 0 0-2.512 0l-5.069 5.07Zm6.741-4.236.84.84a.59.59 0 0 1 0 .833l-.509.52-1.684-1.684.509-.509a.592.592 0 0 1 .845 0ZM4.726 6.85a.59.59 0 0 1 .172-.42l3.728-3.727 1.672 1.672L6.57 8.102a.591.591 0 0 1-.42.171h-.832a.59.59 0 0 1-.591-.59v-.834Z" />
        </StyledG>
    </svg>
);
export default Edit;
