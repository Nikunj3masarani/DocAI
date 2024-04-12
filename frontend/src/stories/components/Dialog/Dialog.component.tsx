import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContentStyled, DialogMainStyled, DialogTitleStyled } from './Dialog.styled';

interface DialogTitleProps {
    open: boolean;
    title?: string;
    children?: React.ReactNode;
    onClose: (param: boolean) => void;
}

const DialogComp = ({ open, title, children, onClose, ...props }: DialogTitleProps) => {
    const [openDialog, setOpen] = useState(open);

    useEffect(() => {
        setOpen(open);
    }, [open]);

    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

    return (
        <>
            <DialogMainStyled onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
                <DialogTitleStyled sx={{ m: 0, p: 2 }} {...props}>
                    <p>{title}</p>
                    {openDialog ? (
                        <button aria-label="close" onClick={handleClose}>
                            <CloseIcon />
                        </button>
                    ) : null}
                </DialogTitleStyled>

                <DialogContentStyled>{children}</DialogContentStyled>
            </DialogMainStyled>
        </>
    );
};

export { DialogComp };
export type { DialogTitleProps };
