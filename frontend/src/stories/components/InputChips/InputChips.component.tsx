//Import Third Party lib

//Import Storybook

//Import Component
import { StyledMuiChipsInput, MuiChipsInputProps } from './InputChips.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style

type InputChipsPros = MuiChipsInputProps & { tooltip?: string };

const InputChips = (props: InputChipsPros) => {
    return <StyledMuiChipsInput {...props} />;
};
export { InputChips };
