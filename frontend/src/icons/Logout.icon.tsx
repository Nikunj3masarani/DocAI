import theme from '@docAi-app/theme';
import { IconType } from '@docAi-app/types';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = ({ fontSize = 'small', fill = theme.colors.secondary, stroke, ...props }: IconType) => {
    return <LogoutIcon fontSize={fontSize} fill={fill} viewBox="0 0 24 24" stroke={stroke} {...props} />;
};

export default Logout;
