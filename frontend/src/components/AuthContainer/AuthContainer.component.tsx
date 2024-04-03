//Import Third Party lib

import { Outlet } from 'react-router-dom';

//Import Storybook

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import Logo from '@docAi-app/../public/assets/images/logo.svg';

//Import Api

//Import Assets

//Import Style
import Styles from './AuthContainer.module.scss';

const AuthContainer = () => {
    // useRef
    // useState
    // Variables Dependent upon State

    // Api Calls

    // Event Handlers

    // Helpers

    // JSX Methods

    // Your component logic here

    return (
        <div className={Styles.container}>
            <div className={Styles['container__content']}>
                <div className={Styles['container__logo']}>
                    <img src={Logo} alt="basf logo" />
                    <h1>Talk to DocAi</h1>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export { AuthContainer };
