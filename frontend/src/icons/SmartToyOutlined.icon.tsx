import theme from '@docAi-app/theme/index';

import { IconType } from '@docAi-app/types';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

const SmartToyOutlined = ({ fill = theme.colors.secondary, stroke, ...props }: IconType) => {
    return <SmartToyOutlinedIcon fontSize={'small'} fill={fill} viewBox="0 0 24 24" stroke={stroke} {...props} />;
};

export { SmartToyOutlined };
