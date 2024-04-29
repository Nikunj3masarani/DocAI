//Import Third Party lib

//Import Storybook

//Import Component
import { StyledContainer, StyledList, StyledHeader, StyledListItem } from './AppDrawer.styled';

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
    topItem: React.ReactNode;
    bottomItem: React.ReactNode;
}

const AppDrawer = ({ topItem, bottomItem }: AppDrawerProps) => {
    return (
        <StyledContainer>
            <StyledList>
                <div className={Styles.container}>
                        <StyledHeader>
                            <img src={Logo} />
                        </StyledHeader>
                        <StyledListItem >
                            <div>{topItem}</div>
                            <div>{bottomItem}</div>
                        </StyledListItem>
                </div>
            </StyledList>
        </StyledContainer>
    );
};

export { AppDrawer };
export type { AppDrawerProps };
