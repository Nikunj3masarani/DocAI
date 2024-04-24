import { styled } from '@mui/material/styles';
import { MuiChipsInput, MuiChipsInputProps } from  'mui-chips-input';

const StyledMuiChipsInput = styled(MuiChipsInput)`
    &.MuiFormControl-root {
        .MuiFormLabel-root {
            color: ${({ theme }) => theme.colors.davyGrey};
            font-style: normal;
            line-height: normal;
            font-size: 1.4rem;
            font-weight: 400;

            &.MuiInputLabel-shrink {
                color: ${({ theme }) => theme.colors.davyGrey};
            }

            &.Mui-focused {
                &.MuiInputLabel-shrink {
                    color: ${({ theme }) => theme.colors.artyClickCoolMagenta};
                    font-size: 1.4rem;
                    top: 0.5rem;
                }
            }
        }
        .MuiInputBase-root {
            border-radius: 1rem;
            padding: 7px 0px 7px 10px;

            input {
                font-size: 1.4rem;
            }

            .MuiChip-root {
                max-width: 9rem;
                border-radius: 0.4rem;
                background: rgba(117, 63, 234, 0.1);

                .MuiChip-label {
                    color: ${({ theme }) => theme.colors.davyGrey};
                    font-style: normal;
                    line-height: normal;
                    font-size: 1.4rem;
                    font-weight: 400;
                }
            }
        }

        .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before,
        .Mui-focused:after {
            border-bottom: 2px solid ${({ theme }) => theme.colors.artyClickCoolMagenta};
        }

        .MuiFormHelperText-root {
            font-size: 1.4rem;
            margin-left: 0;
        }
    }
`;

export { StyledMuiChipsInput };
export type { MuiChipsInputProps };
