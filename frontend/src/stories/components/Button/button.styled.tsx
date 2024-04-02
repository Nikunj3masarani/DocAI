import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const StyledButtonComp = styled(Button)`
    &.MuiButton-root {
        border-radius: 0.6rem;
        box-shadow: 0px 1px 2px 0px ${({ theme }) => theme.colors.mirage5};
        font-style: normal;
        text-transform: inherit;
        line-height: initial;
        cursor: pointer;
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 2.4rem;
        padding: 1.4rem 5.6rem;

        &.MuiButton-sizeMedium {
            padding: 1rem 1.7rem;
            height: 41px;
        }

        &.MuiButton-sizeSmall {
            padding: 0.8rem 5.6rem;
        }

        &.MuiButton {
            &-containedPrimary {
                border: 1px solid ${({ theme }) => theme.colors.primary20};
                background: ${({ theme }) => theme.colors.primary};
                color: ${({ theme }) => theme.colors.white};
            }
            &-outlinedPrimary {
                border: 1px solid ${({ theme }) => theme.colors.primary};
                color: ${({ theme }) => theme.colors.primary};
            }
        }
        &.Mui-disabled {
            cursor: not-allowed;
            opacity: 0.4;
        }
    }
`;

export { StyledButtonComp };
export type { ButtonProps };
