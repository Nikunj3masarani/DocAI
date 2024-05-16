import theme from '@docAi-app/theme';
import { IconType } from '@docAi-app/types';
import PortraitIcon from '@mui/icons-material/Portrait';

const Portrait = ({ fontSize = 'small', fill = theme.colors.secondary, stroke, ...props }: IconType) => {
    return <PortraitIcon fontSize={fontSize} fill={fill} viewBox="0 0 24 24" stroke={stroke} {...props} />;
};

export default Portrait;
