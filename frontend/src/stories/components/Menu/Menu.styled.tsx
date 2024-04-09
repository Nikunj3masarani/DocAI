import { Menu } from '@mui/material';
import styled from 'styled-components';

export const StyledMenuMain = styled.div`
    .MuiIconButton-root {
        &.MuiIconButton-sizeMedium {
            padding: 1.3rem 0.5rem;
        }
    }
`;

export const StyledMenu = styled(Menu)`
    .MuiPaper-rounded {
        border-radius: 1rem;
    }
    .MuiMenuItem-root {
        font-size: 1.6rem;
        color: black;
    }
`;

export const StyledMenuChild = styled(Menu)`
    .MuiPaper-rounded {
        border-radius: 2rem;
    }

    .MuiList-root {
        padding: 2rem;
        border-radius: 2rem;

        h2 {
            color: black;
            font-size: 2rem;
            line-height: 2.4rem;
            // font-family: ${({ theme }) => theme.fontFamily.secondary};
        }
        .content {
            padding: 6px 0px;
            // color: red;
            font-weight: normal;
        }
    }
`;

export const StyledMenuItem = styled.div`
    padding: 8px;
`;

export const StyledMenuItemBtn = styled.div`
    display: flex;
    justify-content: right;
`;
