import { useNavigate } from 'react-router-dom';
import { Button } from '@docAi-app/stories';

export const PageNotFound = () => {
    const navigation = useNavigate();
    return (
        <div className={'bg-primary5 h-[100vh] w-[100%]'}>
            <div className="text-center pt-[9rem]">
                <h1 className="text-[7rem] text-earthBlue m-0 p-0 font-[600]">404 Error</h1>
            </div>

            <div className="flex justify-center mt-[3rem]">
                <div className="w-[30%]">
                    <p className="text-[3rem] text-earthBlue leading-[1.2] relative top-[-0.9rem]">
                        Oops, Looks like you don’t have access or the page you are looking for is not available
                    </p>

                    <div className="text-center mt-[8rem]">
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
