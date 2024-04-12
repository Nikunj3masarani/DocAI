import { StyledContainer, StyledList, StyledHeader } from './AppDrawer.styled';
import Logo from '@docAi-app/../public/assets/images/logo.svg';
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
