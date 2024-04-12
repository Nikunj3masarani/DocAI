import { styled } from '@mui/material/styles';
import Tab, { TabProps } from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

export const StyledTabs = styled(Tabs)`
    .MuiTabs-indicator {
        background: ${({ theme }) => theme.colors.primary};
    }
    .MuiTabs-flexContainer {
        justify-content: stretch;
        button:not(:last-child) {
            margin-right: 10px;
        }
    }
`;

export const StyledTab = styled(Tab)<TabProps>`
    &.customSelected {
        background-color: ${({ theme }) => theme.colors.transparent};
        color: ${({ theme }) => theme.colors.black};
    }
    &.customSelectedCircle {
        background-color: ${({ theme }) => theme.colors.black} !important;
        color: ${({ theme }) => theme.colors.white} !important;
        font-weight: 600;
    }
    &.customRoot {
        font-size: 1.4rem;
        font-weight: normal;
        text-transform: none;
        border-radius: 8px;
        width: 100%;
        color: ${({ theme }) => theme.colors.black} !important;
        font-family: ${({ theme }) => theme.typography.fontFamily};
    }
    &.customRootCircle {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.colors.black};
        border-radius: 4px;
        height: 44px;
        font-weight: 600;
        text-transform: none;
        min-width: 100px;
        border: 1px solid ${({ theme }) => theme.colors.black};
        background-color: ${({ theme }) => theme.colors.black10};
        opacity: 1;
        font-family: ${({ theme }) => theme.typography.fontFamily};
    }
    &.customNormal {
        border-bottom: 3px solid ${({ theme }) => theme.colors.transparent} !important;
        font-weight: bold !important;
        min-width: 110px !important;
        font-size: 1.4rem;
        font-family: ${({ theme }) => theme.typography.fontFamily};
    }
    &.customRootNormal {
        color: ${({ theme }) => theme.colors.black};
        text-transform: none;
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 1.35;
        min-width: 110px;
        margin-right: 0 !important;
        font-family: ${({ theme }) => theme.typography.fontFamily};

        @media (min-width: 1200px) and (max-width: 1366px) {
            min-width: 96px;
        }
    }
    &.customIndicator {
        background-color: ${({ theme }) => theme.colors.red};
    }
    &.MuiTabs-indicator {
        background-color: ${({ theme }) => theme.colors.red};
    }
`;
