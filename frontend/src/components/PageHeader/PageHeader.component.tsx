//Import Third Party lib

//Import Storybook
import { Button } from '@docAi-app/stories';

//Import Component

//Import Page

//Import Hook

//Import Context

//Import Model Type
import { HeaderAction } from '@docAi-app/types';

//Import Util, Helper , Constant

//Import Icon
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';

//Import Api

//Import Assets

//Import Style
import Style from './PageHeader.module.scss';

interface PageHeaderProps {
    title: string;
    showDialogue: boolean;
    handleButtonClick: (title: HeaderAction) => void;
    children: React.ReactNode;
}

const PageHeader = ({ title, showDialogue, handleButtonClick, children }: PageHeaderProps) => {
    return (
        <div className={Style.wrapper}>
            <div className={Style.container}>
                <div className={Style.container__header}>
                    <h1>{title}</h1>
                </div>
                {showDialogue ? (
                    <div className={Style.container__body}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleButtonClick('Create Brain');
                            }}
                        >
                            <PsychologyOutlinedIcon />
                            Create Brain
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                handleButtonClick('Add Knowledge');
                            }}
                        >
                            Add Knowledge
                        </Button>
                    </div>
                ) : null}
            </div>
            <div className={Style.children}>{children}</div>
        </div>
    );
};

export { PageHeader };
