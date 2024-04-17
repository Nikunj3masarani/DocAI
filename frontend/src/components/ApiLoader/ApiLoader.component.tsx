//Import Third Party lib

//Import Storybook
import { ProgressBar } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon

//Import Api

//Import Assets

//Import Style
import Styles from './ApiLoader.module.scss';

interface ApiLoaderProps {
    type?: 'circular' | 'linear';
}

const ApiLoader = ({ type = 'linear' }: ApiLoaderProps) => {
    return (
        <div className="apiLoader hidden">
            <div className={Styles.progressBarWrapper}>
                <ProgressBar type={type} />
            </div>
        </div>
    );
};

export { ApiLoader };
