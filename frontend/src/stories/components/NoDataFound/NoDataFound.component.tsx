type NoDataFoundProps = {
    message: string;
    className?: string;
};

export const NoDataFound = ({ message = 'No Data Found', className = '' }: NoDataFoundProps) => {
    return (
        <div className={`flex flex-col h-[100%] justify-center ${className}`}>
            <h1 className="text-center m-0 mt-[4rem] text-[20px] font-bold">{message}</h1>
        </div>
    );
};
