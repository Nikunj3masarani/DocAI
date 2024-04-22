//Import Third Party lib

//Import Storybook

//Import Component
import { FormControl, SelectProps as MuiSelectProps } from '@mui/material';
import { InputLabelStyle, MenuItemStyle, SelectStyle } from './Select.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { Item } from '@docAi-app/types';

//Import Util, Helper , Constant
import { isEmptyValue } from '@docAi-app/utils/helper';

//Import Icon

//Import Api

//Import Assets

//Import Style

type SelectProps = MuiSelectProps & {
    options: Item[];
};

const Select = ({ options, ...props }: SelectProps) => {
    return (
        <FormControl fullWidth>
            <InputLabelStyle id={`${props.id}-label`}>{props?.label}</InputLabelStyle>
            <SelectStyle {...props} labelId={`${props.id}-label`}>
                {!isEmptyValue(options)
                    ? options.map((option) => {
                          return (
                              <MenuItemStyle key={option.value} value={option.value}>
                                  {option.label}
                              </MenuItemStyle>
                          );
                      })
                    : null}
            </SelectStyle>
        </FormControl>
    );
};

export { Select };
