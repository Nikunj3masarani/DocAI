import { Select, styled, MenuItem, InputLabel } from '@mui/material';

export const SelectStyle = styled(Select)`
    .MuiSelect-select {
        font-size: 1.4rem;
        line-height: 1.35;
        text-align : left;
    }

    .MuiOutlinedInput-notchedOutline {
        legend {
            font-size: 1rem;
        }
    }
`;

export const MenuItemStyle = styled(MenuItem)`
    &.MuiButtonBase-root.MuiMenuItem-root {
        font-size: 1.4rem;
    }
`;

export const InputLabelStyle = styled(InputLabel)`
    &.MuiFormLabel-root.MuiInputLabel-root {
        color: ${({ theme }) => theme.colors.secondary};
        font-size: 1.4rem;
        line-height: 1.35;
    }
`;
