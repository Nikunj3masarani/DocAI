import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AppDrawer } from '@docAi-app/stories';
import { ROUTE } from '@docAi-app/utils/constants/Route.constant';
import Icons from '@docAi-app/icons';
import Styles from './MainContainer.module.scss';
import { useEffect, useState } from 'react';

const sideNavigationItems = [
    {
        to: ROUTE.SEARCH,
        label: 'Home',
        icon: Icons.DraftPatent,
    },

    {
        to: ROUTE.MODELS,
        label: 'Brain Models',
        icon: Icons.PromptLibrary,
    },
];

const MainContainer = () => {
    const pathName = useLocation().pathname;
    useEffect(() => {}, [pathName]);
    const sideNavItem = sideNavigationItems.map((navigationItem, index) => {
        return (
            <li className="navItem" key={index}>
                <NavLink
                    to={navigationItem.to || ''}
                    className={({ isActive }) =>
                        isActive
                            ? 'navLink active flex gap-[1rem] items-center'
                            : 'navLink flex gap-[1rem] items-center'
                    }
                >
                    <navigationItem.icon />
                    {navigationItem.label}
                </NavLink>
            </li>
        );
    });

    return (
        <div className={Styles.container}>
            <AppDrawer drawerItem={sideNavItem} />
            <div className={Styles.container__body}>
                <div className={Styles.container__children}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export { MainContainer };
