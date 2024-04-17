import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Pagination, { PaginationProps } from '@mui/material/Pagination';

const StyledPagination = styled(Pagination)`
    justify-content: flex-start;
    flex-grow: 1;

    .MuiPaginationItem-root {
        border-radius: 1.2rem;
        font-size: 1.6rem;
        font-weight: 400;

        &.Mui-selected {
            background-color: ${({ theme }) => theme.colors.primary};
            color: ${({ theme }) => theme.colors.white};
        }
    }

    .MuiPaginationItem-previousNext {
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

const StyledPaginationAction = styled(Box)`
    padding-right: 2.4rem;
    padding-block: 1rem;
`;

export { StyledPagination, StyledPaginationAction };
export type { PaginationProps };
