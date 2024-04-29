import theme from '@docAi-app/theme';
import { IconType } from '@docAi-app/types';
import PersonIcon from '@mui/icons-material/Person';

const Person = ({ fontSize = 'small', fill = theme.colors.secondary, stroke, ...props }: IconType) => {
    return <PersonIcon fontSize={fontSize} fill={fill} viewBox="0 0 24 24" stroke={stroke} {...props} />;
};

export { Person };
