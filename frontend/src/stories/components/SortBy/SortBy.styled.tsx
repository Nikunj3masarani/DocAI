import { Menu, MenuItem, styled } from '@mui/material';

export const StyledStatus = styled('button')`
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.secondary20};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    outline: none;
    gap: 1rem;
    border-radius: 8px;
    padding: 1.2rem;
    min-width: 200px;

    div {
        font-family: ${({ theme }) => theme.typography.fontFamily};
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.21;
    }
`;

export const StyledMenu = styled(Menu)`
    .MuiMenu-paper {
        border: solid 1px ${({ theme }) => theme.colors.cinder10};
        box-shadow: 0 4px 6px 0 ${({ theme }) => theme.colors.black10};
        border-radius: 1rem;
    }
`;

export const StyledMenuItem = styled(MenuItem)`
    &.MuiMenuItem-root {
        color: ${({ theme }) => theme.colors.secondary};
        min-width: fit-content;
        font-size: 1.4rem;
        font-weight: 500;

        &.Mui-selected {
            background-color: ${({ theme }) => theme.colors.secondary10};
        }
    }
`;
