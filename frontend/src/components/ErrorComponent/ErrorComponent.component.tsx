import { Button } from '@docAi-app/stories';
import Styles from './ErrorComponent.module.scss';

export const ErrorComponent = () => {
    const onRefreshHandler = () => {
        location.reload();
    };
    
    return (
        <div className={Styles.errorContainer}>
            <p className={Styles['errorContainer__message']}>
                Oops, <br />
                Something went wrong, please try again
            </p>

            <div className={Styles['errorContainer__actions']}>
                <Button onClick={onRefreshHandler} variant="contained" color="primary" type="submit">
                    Refresh
                </Button>
            </div>
        </div>
    );
};
