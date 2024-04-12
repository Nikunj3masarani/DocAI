import { styled } from '@mui/material/styles'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'

const CheckboxLabelStyled = styled('div')`
  color: ${({ theme }) => theme.palette.secondary.black};
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  a {
    font-size: 1.8rem;
  }
  span {
    color: ${({ theme }) => theme.palette.secondary.gray1};
    font-size: 1.5rem;
  }
`

const CheckboxStyled = styled(Checkbox)`
  &.MuiButtonBase-root {
    padding: 0;

    .MuiSvgIcon-root {
      width: 2.5rem;
      height: 2.5rem;

      path {
        fill: ${({ theme }) => theme.palette.secondary.gray2};
      }
    }

    &.Mui-checked {
      .MuiSvgIcon-root {
        path {
          fill: ${({ theme }) => theme.palette.primary.mediumBlue};
        }
      }
    }
  }
`

export { CheckboxLabelStyled, CheckboxStyled }
export type { CheckboxProps }
