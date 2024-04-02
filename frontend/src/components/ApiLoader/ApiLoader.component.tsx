import { ProgressBar } from '@docAi-app/stories';
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
