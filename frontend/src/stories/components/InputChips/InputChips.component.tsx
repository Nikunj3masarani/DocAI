import { StyledMuiChipsInput, MuiChipsInputProps } from './InputChips.styled'

type InputChipsPros = MuiChipsInputProps & { tooltip?: string }

export const InputChips = (props: InputChipsPros) => {
  return (
    // @ts-ignore
      <StyledMuiChipsInput {...props} />
  )
}
