//Import Third Party lib
import React, { MouseEvent, useState } from 'react';

//Import Storybook

//Import Component
import { StyledMenu, StyledMenuItem, StyledStatus } from './SortBy.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { Item } from '@docAi-app/types';

//Import Util, Helper , Constant

//Import Icon
import Icons from '@docAi-app/icons';

//Import Api

//Import Assets

//Import Style

type SortByProps = {
    items: Item[];
    value?: Item;
    onItemClick: (item: Item, e: MouseEvent) => void;
    className?: string;
    sortByLabel?: string;
};

const SortBy = ({ items, value, onItemClick, className = '' }: SortByProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };

    const handleClose = (e: MouseEvent, item?: Item) => {
        setAnchorEl(null);
        if (item) {
            onItemClick(item, e);
        }
        e.stopPropagation();
    };

    return (
        <>
            <StyledStatus onClick={handleClick} id="status-text">
                <div>{value?.label}</div>
                <Icons.DownArrow />
            </StyledStatus>
            <StyledMenu
                id="sort-by-menu"
                anchorEl={anchorEl}
                className={className}
                open={open}
                onClose={(e: MouseEvent) => handleClose(e)}
                MenuListProps={{
                    sx: { width: '210px' },
                    'aria-labelledby': 'status-text',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {items.map((option) => (
                    <StyledMenuItem
                        key={option.value}
                        selected={option.value === value?.value}
                        onClick={(e: MouseEvent) => handleClose(e, option)}
                    >
                        {option.label}
                    </StyledMenuItem>
                ))}
            </StyledMenu>
        </>
    );
};

export { SortBy, type SortByProps };
