import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '../Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import { DOWNLOAD_MENU_OPTIONS } from '@foster/util/constants';
import { StyledMenuMain, StyledMenu, StyledMenuChild, StyledMenuItem, StyledMenuItemBtn } from './Menu.styled';

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
    header: string;
    subTitle: string;
};

const ThreeDotItemMenu = ({ menuItems, handleItemClick, header, subTitle }: MenuItemsProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorElMenu, setAnchorElMenu] = React.useState<HTMLLIElement | null>(null);
    const [exportType, setExportType] = React.useState('CSV');

    // const topMenuItems = DOWNLOAD_MENU_OPTIONS.filter((menuItem) => menuItem.Top);

    const open = Boolean(anchorEl);
    const openMenu = Boolean(anchorElMenu);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onItemClick = (event: React.MouseEvent<HTMLLIElement>, item: itemsProps) => {
        if (item && item.value === 'DOWNLOAD') {
            setAnchorElMenu(event.currentTarget);
        } else {
            handleItemClick(item);
            handleClose();
        }
    };

    const handleDownload = () => {
        setAnchorEl(null);
        setAnchorElMenu(null);
        handleItemClick({ export_type: exportType });
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorElMenu(null);
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
