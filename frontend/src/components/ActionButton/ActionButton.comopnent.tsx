import { IconButton, Tooltip } from '@docAi-app/stories';

type ActionButtonProps = {
    title: string;
    icon: JSX.Element;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    className?: string;
    wrapperClassName?: string;
};

export const ActionButton = ({
    icon,
    onClick,
    title,
    className = '',
    disabled = false,
    wrapperClassName = '',
}: ActionButtonProps) => {
    return (
        <Tooltip title={title}>
            <div className={wrapperClassName}>
                <IconButton disabled={disabled} onClick={onClick} className={`backgroundIconButton ${className}`}>
                    {icon}
                </IconButton>
            </div>
        </Tooltip>
    );
};
