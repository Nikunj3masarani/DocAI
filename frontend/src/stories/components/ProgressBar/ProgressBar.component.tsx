//Import Third Party lib

//Import Storybook

//Import Component
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style

interface ProgressPros {
    type?: 'linear' | 'circular';
}

const ProgressBar = ({ type = 'circular', ...props }: ProgressPros) => {
    return <>{type === 'circular' ? <CircularProgress {...props} /> : <LinearProgress {...props} />}</>;
};

export { ProgressBar };
export type { ProgressPros };
