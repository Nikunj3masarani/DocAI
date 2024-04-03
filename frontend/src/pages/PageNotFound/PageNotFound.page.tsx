import { useNavigate } from 'react-router-dom';
import { Button } from '@docAi-app/stories';
import Styles from './PageNotFound.module.scss';

export const PageNotFound = () => {
    const navigation = useNavigate();
    return (
        <div className={Styles.container}>
            <div className={Styles.container__header}>
                <h1 className={Styles.title}>404 Error</h1>
            </div>

            <div className={Styles.container__body}>
                <div className={Styles.wrapper}>
                    <p>Oops, Looks like you don’t have access or the page you are looking for is not available</p>

                    <div className={Styles.container__body__actionButton}>
                        <Button
                            variant="contained"
                            onClick={() => navigation('/')}
                            type="submit"
                            color="primary"
                            data-testid="backToHome"
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
