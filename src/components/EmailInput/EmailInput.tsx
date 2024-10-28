const EmailInput = ({ register, errors }: any) => {
    return (
        <label
            htmlFor='email'
            className='flex flex-col rounded-md bg-gray-200 p-2'
        >
            E-mail
            <input
                type='email'
                id='email'
                className='flex-1 rounded-md p-1'
                {...register('email', {
                    required: 'E-mail is required',
                    pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: 'Invalid e-mail',
                    },
                })}
            />
            {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
        </label>
    );
};

export default EmailInput;
