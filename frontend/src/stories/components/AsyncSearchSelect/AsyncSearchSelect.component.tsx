//Import Third Party lib
import { MenuPlacement, components } from 'react-select';

//Import Storybook
import { Tooltip } from '../Tooltip';
import { CheckboxComp } from '../Checkbox';

//Import Component
import {
    AsyncCreatableStyled,
    AsyncSearchSelectContainerStyled,
    AsyncSearchSelectLabelStyled,
    AsyncSearchSelectStyled,
    CustomOptionStyled,
} from './AsyncSearchSelect.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant
import theme from '@docAi-app/theme';

//Import Icon
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@docAi-app/icons/Search.icon';

//Import Api

//Import Assets

//Import Style

export interface AsyncSelectDataType {
    value: string;
    label: string;
    color?: string;
    isFixed?: boolean;
    isDisabled?: boolean;
}

interface AsyncSearchSelectCompProps {
    debounceTimeout?: number;
    loadOptions: any;
    placeholder?: string;
    label?: string;
    isMulti?: boolean;
    isClearable?: boolean;
    isDisabled?: boolean;
    menuPlacement?: MenuPlacement | undefined;
    value?: AsyncSelectDataType | null;
    defaultValue?: AsyncSelectDataType | null;
    isCustomOption?: boolean;
    customOptionLabel?: string;
    emptyOptionMessage?: string;
    isCreation?: boolean;
    tooltip?: string;
    required?: boolean;
    onChange?: (newValue: unknown) => void;
    onOptionChange?: (newValue: unknown) => void;
    onCustomHandler?: () => void;
    hideSelectedOptions?: boolean;
    createLabel?: string;
    additional: { page: number };
}

const AsyncSearchSelect = ({
    debounceTimeout,
    loadOptions,
    menuPlacement = 'bottom',
    label = '',
    placeholder = 'Select value',
    isMulti = false,
    isCustomOption = false,
    isCreation = false,
    required = false,
    customOptionLabel = 'Create resource',
    emptyOptionMessage = '',
    hideSelectedOptions = true,
    onCustomHandler,
    onOptionChange,
    createLabel = '',
    additional,
    ...props
}: AsyncSearchSelectCompProps) => {
    const Menu = (props: any) => {
        return (
            <components.Menu {...props}>
                <CustomOptionStyled>
                    {isCustomOption && (
                        <button onClick={onCustomHandler}>
                            {customOptionLabel} <AddCircleIcon />
                        </button>
                    )}

                    <div>{props.children}</div>
                </CustomOptionStyled>
            </components.Menu>
        );
    };

    const Option = (props: any) => {
        return (
            <div>
                <components.Option {...props}>
                    {props.isMulti ? (
                        <CheckboxComp
                            label={props.label}
                            checked={props.isSelected}
                            onChange={() => {}}
                            sx={{
                                padding: '1.4rem 2rem',
                                backgroundColor: 'transparent',
                                ':hover': {
                                    borderRadius: isMulti ? '0rem' : '0.8rem',
                                    backgroundColor: theme.colors.primary,
                                },
                            }}
                        />
                    ) : (
                        <label>{props.label}</label>
                    )}
                </components.Option>
            </div>
        );
    };

    const NoOptionsMessage = (props: any) => {
        return (
            <components.NoOptionsMessage {...props}>
                <span>{emptyOptionMessage}</span>
            </components.NoOptionsMessage>
        );
    };
    return (
        <Tooltip title={props?.tooltip} arrow={true} placement="top" disableInteractive>
            <AsyncSearchSelectContainerStyled>
                {label.length > 0 ? (
                    <AsyncSearchSelectLabelStyled isRequired={required}>{label}</AsyncSearchSelectLabelStyled>
                ) : null}
                {isCreation ? (
                    <AsyncCreatableStyled
                        {...props}
                        maxMenuHeight={360}
                        styles={{
                            container: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    fontSize: '1.4rem',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.02em',
                                };
                            },
                            menu: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    padding: isMulti ? '0.5rem 0rem' : '1.6rem 0.6rem',
                                    border: `1px solid ${theme.colors.black10}`,
                                    marginTop: '0.2rem',
                                    zIndex: 10000,
                                    color: theme.colors.davyGrey,
                                    backgroundColor: theme.colors.white,
                                };
                            },
                            menuList: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    overflow: 'scroll',
                                    fontSize: '1.4rem',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.02em',
                                    marginBottom: '4rem',
                                    zIndex: '1000000',

                                    ':first-of-type': {
                                        paddingTop: '0rem',
                                    },
                                    ':last-of-type': {
                                        marginBottom: '0rem',
                                    },
                                    '::-webkit-scrollbar': {
                                        width: '4px',
                                        height: '4px',
                                    },
                                    '::-webkit-scrollbar-track': {
                                        background: 'transparent',
                                    },
                                    '::-webkit-scrollbar-thumb': {
                                        background: theme.colors.black10,
                                    },
                                    '::-webkit-scrollbar-thumb:hover': {
                                        background: theme.colors.black10,
                                    },
                                };
                            },
                            control: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    height: '3rem',
                                    background: `${theme.colors.white}`,
                                    color: `${theme.colors.davyGrey}`,
                                    borderRadius: '8rem',
                                    padding: '4rem 5rem',
                                };
                            },
                            valueContainer: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    marginTop: '-1rem',
                                    paddingInline: '0.2rem',
                                    // display: 'inline-block',
                                };
                            },
                            input: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    color: `${theme.colors.davyGrey}`,
                                    padding: '0.2rem 0',
                                    margin: '0.2rem',
                                };
                            },
                            placeholder: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    fontSize: '1.4rem',
                                    lineHeight: '1.2',
                                    color: theme.colors.black10,
                                };
                            },
                            option: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    padding: '2.6rem 3rem',
                                    display: 'block',
                                    fontSize: '1.4rem',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.02em',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    ':hover': {
                                        borderRadius: isMulti ? '0rem' : '2rem',
                                        backgroundColor: theme.colors.white,
                                        color: theme.colors.primary,
                                    },
                                };
                            },
                            indicatorsContainer: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    ...(isMulti
                                        ? {
                                              marginTop: '-1rem',
                                          }
                                        : {}),
                                };
                            },
                        }}
                        debounceTimeout={debounceTimeout}
                        placeholder={placeholder}
                        closeMenuOnSelect={!isMulti}
                        isMulti={isMulti}
                        formatCreateLabel={(userInput) => `${createLabel} ${userInput}`}
                        defaultOptions
                        loadOptions={loadOptions}
                        menuPlacement={menuPlacement}
                        additional={additional}
                        // menuPortalTarget={document.body}
                        onChange={(v) => {
                            if (onOptionChange) onOptionChange(v);
                            if (props.onChange) {
                                props.onChange(v);
                            }
                        }}
                        components={{
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => <SearchIcon sx={{ width: '5rem', height: '5rem' }} />,
                            Menu,
                            Option,
                            NoOptionsMessage,
                        }}
                        hideSelectedOptions={hideSelectedOptions}
                    />
                ) : (
                    <AsyncSearchSelectStyled
                        {...props}
                        maxMenuHeight={150}
                        styles={{
                            container: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    height: 'auto',
                                };
                            },
                            menu: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    padding: isMulti ? '0.5rem 0rem' : '1rem',
                                    boxShadow: 'none',
                                    borderRadius: '6rem',
                                    zIndex: 10000,
                                    border: `1px solid ${theme.colors.black10}`,
                                    marginTop: '0.2rem',
                                    color: theme.colors.davyGrey,
                                    backgroundColor: theme.colors.white,
                                };
                            },
                            menuList: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    overflow: 'scroll',

                                    marginBottom: '1rem',
                                    ':first-of-type': {
                                        paddingTop: '0rem',
                                    },
                                    ':last-of-type': {
                                        marginBottom: '0rem',
                                    },
                                    '::-webkit-scrollbar': {
                                        width: '4px',
                                        height: '4px',
                                    },
                                    '::-webkit-scrollbar-track': {
                                        background: 'transparent',
                                    },
                                    '::-webkit-scrollbar-thumb': {
                                        background: theme.colors.black10,
                                    },
                                    '::-webkit-scrollbar-thumb:hover': {
                                        background: theme.colors.black10,
                                    },
                                };
                            },
                            control: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    height: 'auto',
                                    borderRadius: '1rem',
                                    background: `${theme.colors.white}`,
                                    color: `${theme.colors.davyGrey}`,
                                    ...(isMulti
                                        ? {
                                              paddingBottom: '0rem !important',
                                          }
                                        : {}),
                                };
                            },
                            valueContainer: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    ...(isMulti
                                        ? {
                                              flexDirection: 'row',
                                              flexWrap: 'nowrap',
                                              overflowX: 'scroll',
                                              marginTop: '-0.4rem',
                                              padding: '0.2rem 0rem',
                                              gap: '0.4rem',
                                              lineHeight: '1.2rem',

                                              '::-webkit-scrollbar': {
                                                  width: '4px',
                                                  height: '4px',
                                              },
                                              '::-webkit-scrollbar-track': {
                                                  background: 'transparent',
                                              },
                                              '::-webkit-scrollbar-thumb': {
                                                  background: theme.colors.black10,
                                              },
                                              '::-webkit-scrollbar-thumb:hover': {
                                                  background: theme.colors.black10,
                                              },
                                          }
                                        : {}),
                                };
                            },
                            multiValue: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    ...(isMulti
                                        ? {
                                              margin: '0rem',
                                              minWidth: 'fit-content',
                                              borderRadius: '3rem',
                                              backgroundColor: theme.colors.white,
                                          }
                                        : {}),
                                };
                            },
                            multiValueLabel: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    color: 'inherit',
                                    padding: '0.8rem 0.4rem 0.8rem 0.8rem',
                                };
                            },
                            multiValueRemove: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    cursor: 'pointer',
                                    paddingRight: '0.8rem',
                                    color: theme.colors.error,
                                    ':hover': {
                                        backgroundColor: 'transparent',
                                    },
                                };
                            },
                            input: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    color: `${theme.colors.davyGrey}`,
                                };
                            },
                            placeholder: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    fontSize: '1.4rem',
                                    lineHeight: '1.2',
                                    color: theme.colors.black10,
                                };
                            },
                            option: (defaultStyles) => {
                                return {
                                    ...defaultStyles,
                                    padding: '1.6rem 0.6rem',
                                    display: 'block',
                                    fontSize: '1.4rem',
                                    lineHeight: '1.2',
                                    letterSpacing: '-0.02em',
                                    cursor: 'pointer',
                                    ':hover': {
                                        color: theme.colors.primary,
                                    },
                                };
                            },
                            indicatorsContainer: (defaultStyles) => {
                                return {
                                    ...defaultStyles,

                                    ...(isMulti
                                        ? {
                                              marginTop: '-1rem',
                                          }
                                        : {}),
                                };
                            },
                        }}
                        placeholder={placeholder}
                        closeMenuOnSelect={!isMulti}
                        isMulti={isMulti}
                        defaultOptions
                        loadOptions={loadOptions}
                        menuPlacement={menuPlacement}
                        // menuPortalTarget={document.body}
                        components={{
                            DropdownIndicator: () => <ArrowDropDownIcon />,
                            IndicatorSeparator: () => null,
                            Menu,
                            Option,
                        }}
                        additional={additional}
                        hideSelectedOptions={hideSelectedOptions}
                    />
                )}
            </AsyncSearchSelectContainerStyled>
        </Tooltip>
    );
};

export { AsyncSearchSelect };
export type { AsyncSearchSelectCompProps };
