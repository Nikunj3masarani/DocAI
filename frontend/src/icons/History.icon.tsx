import theme from '@docAi-app/theme';
import { IconType } from '@docAi-app/types';
import HistoryIcon from '@mui/icons-material/History';
const History = ({ fontSize = 'small', fill = theme.colors.secondary, stroke, ...props }: IconType) => {
    return <HistoryIcon fontSize={fontSize} fill={fill} viewBox="0 0 24 24" stroke={stroke} {...props} />;
};

export { History };
