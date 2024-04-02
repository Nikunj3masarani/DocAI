import { Tooltip } from '../Tooltip'
import { StyledTextFieldComp, TextFieldProps } from './InputField.styled'

type InputField = TextFieldProps & { tooltip?: string; minheight?: string }

export const InputField = ({ ...props }: InputField) => {
  return (
    <Tooltip
      title={props?.tooltip}
      arrow={true}
      placement="top"
      disableInteractive
    >
      <StyledTextFieldComp {...props}></StyledTextFieldComp>
    </Tooltip>
  )
}
