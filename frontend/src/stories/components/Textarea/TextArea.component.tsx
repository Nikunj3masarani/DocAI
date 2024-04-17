import { Tooltip } from '../Tooltip'
import { StyledTextArea, TextAreaProps } from './TextArea.styled'

type TextAreaCustomProps = TextAreaProps & { tooltip?: string }

export const TextArea = ({ ...props }: TextAreaCustomProps) => {
  return (
    <Tooltip
      title={props?.tooltip}
      arrow={true}
      placement="top"
      disableInteractive
    >
      <StyledTextArea {...props}> </StyledTextArea>
    </Tooltip>
  )
}
