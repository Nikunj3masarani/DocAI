//Import Third Party lib

//Import Storybook

//Import Component
import { StyledContainer, StyledList, StyledHeader } from './AppDrawer.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets
import Logo from '@docAi-app/../public/assets/images/logo.svg';

//Import Style
import Styles from './AppDrawer.module.scss';

interface AppDrawerProps {
    drawerItem: React.ReactNode;
}

const AppDrawer = ({ drawerItem }: AppDrawerProps) => {
    return (
        <StyledContainer>
            <StyledList>
                <div className={Styles.container}>
                    <div>
                        <StyledHeader>
                            <img src={Logo} />
                        </StyledHeader>
                        <div>{drawerItem}</div>
                    </div>
                </div>
            </StyledList>
        </StyledContainer>
    );
};

export { AppDrawer };
export type { AppDrawerProps };
