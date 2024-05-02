import theme from '@docAi-app/theme';
import { IconType } from '@docAi-app/types';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
const ArrowCircleUp = ({ fontSize = 'small', fill = theme.colors.secondary, stroke, ...props }: IconType) => {
    return <ArrowCircleUpIcon fontSize={fontSize} fill={fill} viewBox="0 0 24 24" stroke={stroke} {...props} />;
};

export default ArrowCircleUp;
