import { CheckboxLabelStyled, CheckboxStyled } from './Checkbox.styled';
import { CheckboxProps } from '@mui/material/Checkbox';

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
