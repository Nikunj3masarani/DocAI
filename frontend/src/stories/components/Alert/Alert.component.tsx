

//Import Third Party lib
import { ComponentProps } from 'react';
import { toast, ToastContentProps, ToastPosition, Slide, CloseButton } from 'react-toastify';
import { useTheme } from '@mui/material';

//Import Storybook
import { Button } from '../Button';

//Import Component
import { StyleCloseIconContainer, StyledToastContainer } from './Alert.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import Icons from '@docAi-app/icons';

//Import Api

//Import Assets
import Success from '../../../../public/assets/images/success.svg';
import Warning from '../../../../public/assets/images/warning.svg';
import Info from '../../../../public/assets/images/info.svg';
import ErrorIcon from '../../../../public/assets/images/error.svg';

//Import Style

type AlertType = 'info' | 'error' | 'success' | 'warning' | 'default';
type AlertValue = { icon: string; title: string };

type IconMapType = Record<AlertType, AlertValue>;

const IconMap: IconMapType = {
    success: {
        icon: Success,
        title: '',
    },
    warning: {
        icon: Warning,
        title: '',
    },
    info: {
        icon: Info,
        title: '',
    },
    error: {
        icon: ErrorIcon,
        title: '',
    },
    default: {
        icon: Info,
        title: '',
    },
};

type AlertProps = {
    /**
     * Type of message you want to convey to the user
     */
    type: AlertType;
    /**
     * Number of miliseconds you want to show alert
     */
    duration: number;
    /**
     *  Message that you want to convey
     */
    message: string;
    /**
     * Position of the toast
     */
    position: ToastPosition;
};

interface CustomToastBodyProps extends ToastContentProps {
    message: string;
}

const ToastBody = (props: CustomToastBodyProps): JSX.Element => {
    return (
        <div className="toast-body">
            <div className="toast-body__icon">
                <img src={IconMap[props.toastProps.type]?.icon} alt="" />
            </div>
            <div className="toast-body__msg">
                <h4>{IconMap[props.toastProps.type]?.title}</h4>
                <p>{props.message}</p>
            </div>
        </div>
    );
};

const ToastCloseIcon = ({ closeToast }: ComponentProps<typeof CloseButton>): JSX.Element => {
    const theme = useTheme();

    return (
        <StyleCloseIconContainer>
            <button className="closeIcon" onClick={(e) => closeToast(e)}>
                <Icons.Close stroke={theme.colors.black} />
            </button>
        </StyleCloseIconContainer>
    );
};

const Alert = ({
    type = 'info',
    duration = 5000,
    message = 'Please fill password in password field',
    position = 'top-right',
}: AlertProps) => {
    const notify = () =>
        toast((props: ToastContentProps) => <ToastBody {...props} message={message} />, {
            type,
            autoClose: duration,
            position,
            transition: Slide,
            className: 'Toastify__toast--main',
            closeButton: ToastCloseIcon,
            hideProgressBar: true,
        });

    return (
        <Button variant="contained" onClick={notify}>
            Click to show alert
        </Button>
    );
};

export { Alert, toast, ToastBody, Slide, ToastCloseIcon, StyledToastContainer };
export type { ToastPosition };
