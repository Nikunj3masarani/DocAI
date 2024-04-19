import React, { MouseEvent, useState } from 'react';
import { Item } from '@docAi-app/types';
import Icons from '@docAi-app/icons';
import { StyledMenu, StyledMenuItem, StyledStatus } from './SortBy.styled';

export type SortByProps = {
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

export { SortBy };
