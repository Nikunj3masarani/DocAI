//Import Third Party lib

//Import Storybook
import { Tooltip } from '../Tooltip';

//Import Component
import { StyledTextFieldComp, TextFieldProps } from './InputField.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style

type InputFieldProps = TextFieldProps & { tooltip?: string; minheight?: string };

const InputField = ({ ...props }: InputFieldProps) => {
    return (
        <Tooltip title={props?.tooltip} arrow={true} placement="top" disableInteractive>
            <StyledTextFieldComp {...props}></StyledTextFieldComp>
        </Tooltip>
    );
};

export { InputField };
