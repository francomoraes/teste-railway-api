const SpinnerLoader = () => {
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <div className='h-full w-full animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500'></div>
        </div>
    );
};

export default SpinnerLoader;
