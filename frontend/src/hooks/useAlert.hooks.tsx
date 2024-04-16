import { Slide, ToastContentProps, ToastPosition, toast } from 'react-toastify';
import { ToastBody, ToastCloseIcon } from '@docAi-app/stories';
import { TIMEOUT } from '@docAi-app/utils/constants/common.constant';

type AlertType = 'info' | 'error' | 'success' | 'warning';

const useAlert = (
    type: AlertType,
    message: string,
    isFocusLoss = true,
    duration = TIMEOUT.TOAST,
    position: ToastPosition = 'top-right',
) => {
    toast.dismiss();
    return toast((props: ToastContentProps) => <ToastBody {...props} message={message} />, {
        type,
        position,
        autoClose: duration,
        transition: Slide,
        pauseOnFocusLoss: isFocusLoss,
        className: 'Toastify__toast--main',
        closeButton: ToastCloseIcon,
        hideProgressBar: true,
    });
};

export { useAlert as getAlert };
