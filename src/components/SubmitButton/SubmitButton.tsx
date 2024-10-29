const SubmitButton = ({ text = 'Login' }: { text?: string }) => {
    return (
        <button
            type='submit'
            className='flex-1 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700'
        >
            {text}
        </button>
    );
};

export default SubmitButton;
