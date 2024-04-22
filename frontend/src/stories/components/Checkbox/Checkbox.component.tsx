//Import Third Party lib
import { CheckboxProps } from '@mui/material/Checkbox';

//Import Storybook

//Import Component
import { CheckboxLabelStyled, CheckboxStyled } from './Checkbox.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style


type CheckboxCompProps = CheckboxProps & {
    label: React.ReactNode | string;
};

const CheckboxComp = ({ label, ...props }: CheckboxCompProps) => {
    return (
        <CheckboxLabelStyled>
            <CheckboxStyled {...props} />
            {label}
        </CheckboxLabelStyled>
    );
};

export { CheckboxComp };
