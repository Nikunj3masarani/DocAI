//Import Third Party lib
import * as React from 'react';

//Import Storybook

//Import Component
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { StyledMenuMain, StyledMenu } from './Menu.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import MoreVertIcon from '@mui/icons-material/MoreVert';

//Import Api

//Import Assets

//Import Style

const ITEM_HEIGHT = 48;

export type itemsProps = {
    id: number;
    value: string | number;
    label: React.ReactNode;
    disabled?: boolean;
};

type MenuItemsProps = {
    menuItems: itemsProps[];
    handleItemClick: (item: itemsProps) => void;
};

const ThreeDotItemMenu = ({ menuItems, handleItemClick }: MenuItemsProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onItemClick = (event: React.MouseEvent<HTMLLIElement>, item: itemsProps) => {
        handleItemClick(item);
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <StyledMenuMain>
            <IconButton aria-label="more" id="long-button" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.id} onClick={(event) => onItemClick(event, item)}>
                        {item?.label}
                    </MenuItem>
                ))}
            </StyledMenu>
        </StyledMenuMain>
    );
};

export { ThreeDotItemMenu };
