import { Box, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Box)`
    background: ${({ theme }) => theme.colors.desertStorm};
    border-right: 1px solid ${({ theme }) => theme.colors.platinum};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: fit-content;
    width: 28rem;
    padding: 0;
    height: 100vh;
`;

export const StyledList = styled(List)`
    &.MuiList-root {
        padding-top: 0;
        padding-bottom: 0;
    }
    h6 {
        color: ${({ theme }) => theme.colors.secondary};
        font-size: 1.5rem;
        font-weight: 500;
        padding: 0 3rem 1rem 3rem;
        margin-top: 3rem;
    }
    .navItem {
        display: flex;
        padding: 1rem 2.5rem 0rem 1.5rem;
        gap: 1.5rem;
    }
    .navLink {
        color: ${({ theme }) => theme.colors.secondary};
        background-color: ${({ theme }) => theme.colors.transparent};
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.5rem;
        font-weight: 400;
        padding: 1.2rem 1.5rem;

        &.active,
        &:hover {
            background: ${({ theme }) => theme.colors.mercury} !important;
            border-radius: 0.8rem !important;
            width: 100%;
        }
        &:hover {
            color: ${({ theme }) => theme.colors.black};

            svg {
                path {
                    fill: ${({ theme }) => theme.colors.black};
                }
            }
        }
    }
`;

export const StyledHeader = styled('div')`
    border-bottom: 1px solid ${({ theme }) => theme.colors.platinum};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 3rem;
    width: 100%;

    img {
        height: 5.9rem;
    }
`;

export const StyledListItem = styled('div')`
    display: flex;
    flex-direction : column;
    justify-content : space-between;
    align-items : flex-start;
    width: 100%;
    min-height: calc(100vh - 11rem);
    > div {
        width: 100%;
    }
`;
