import { StyledSearchInput, TextFieldProps } from './SearchInput.styled';
import SearchIcon from '@docAi-app/icons/Search.icon';
import { IconButton } from '@docAi-app/stories';

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
                            <SearchIcon width={24} height={24} />
                        </IconButton>
                    ),
                },
            }}
            {...props}
        />
    );
};

export { SearchInput };
