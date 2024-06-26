//Import Third Party lib

//Import Storybook
import { IconButton } from '@docAi-app/stories';

//Import Component
import { StyledSearchInput, TextFieldProps } from './SearchInput.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import SearchIcon from '@docAi-app/icons/Search.icon';

//Import Api

//Import Assets

//Import Style

interface CustomSearchTextFieldProp {
    onClearClick: () => void;
}

const SearchInput = ({ onClearClick, ...props }: TextFieldProps & CustomSearchTextFieldProp) => {
    return (
        <StyledSearchInput
            variant="outlined"
            margin="dense"
            placeholder="Search data"
            fullWidth
            size="medium"
            InputProps={{
                ...{
                    endAdornment: (
                        <IconButton onClick={onClearClick} isbordered={false}>
                            <SearchIcon width={18} height={18} />
                        </IconButton>
                    ),
                },
            }}
            {...props}
        />
    );
};

export { SearchInput };
