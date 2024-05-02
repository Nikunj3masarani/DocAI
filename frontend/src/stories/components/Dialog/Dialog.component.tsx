//Import Third Party lib
import { useEffect, useState } from 'react';

//Import Storybook

//Import Component
import { DialogContentStyled, DialogMainStyled, DialogTitleStyled } from './Dialog.styled';

//Import Page

//Import Hook

//Import Context

//Import Model Type

//Import Util, Helper , Constant

//Import Icon
import CloseIcon from '@mui/icons-material/Close';

//Import Api

//Import Assets

//Import Style

interface DialogTitleProps {
    open: boolean;
    title?: string;
    children?: React.ReactNode;
    minWidth?: string;
    onClose: (param: boolean) => void;
}

const DialogComp = ({ open, title, children, onClose, minWidth, ...props }: DialogTitleProps) => {
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
            <DialogMainStyled
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
                minWidth={minWidth}
            >
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
