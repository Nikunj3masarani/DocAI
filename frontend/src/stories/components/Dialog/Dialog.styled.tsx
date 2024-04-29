import { styled } from '@mui/material/styles';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

type DialogMainStyledProps = DialogProps & {
    minWidth?: string;
};
const DialogMainStyled = styled(Dialog)<DialogMainStyledProps>`
    .MuiPaper-root {
        min-width: ${({ minWidth }) => minWidth ?? '100rem'};
        margin: 0;
        padding: 3rem 0rem 0rem 0rem;
        border-radius: 2rem;
    }
`;

const DialogTitleStyled = styled(DialogTitle)`
    &.MuiDialogTitle-root {
        display: flex;
        justify-content: space-between;
        padding: 0 3rem;

        h3 {
            color: ${({ theme }) => theme.colors.secondary};
            display: flex;
            justify-content: space-between;
            align-items: self-end;
            padding: 0;
            gap: 2rem;
            margin: 0;
            width: 90%;
            font-weight: 700;
            font-size: 2.2rem;
        }

        button {
            cursor: pointer;
            background: transparent;
            border: 0;

            .MuiSvgIcon-root {
                fill: ${({ theme }) => theme.colors.davyGrey};
                width: 2.5rem;
                height: 2.5rem;
            }
        }
    }
`;
const DialogContentStyled = styled(DialogContent)`
    padding: 2rem 0;
`;

const DialogActionsStyled = styled(DialogActions)`
    justify-content: center;
`;

export { DialogMainStyled, DialogTitleStyled, DialogContentStyled, DialogActionsStyled };
export type { DialogMainStyledProps };
