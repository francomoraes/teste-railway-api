const PasswordInput = ({ register, errors }: any) => {
    return (
        <label
            htmlFor='password'
            className='flex flex-col rounded-md bg-gray-200 p-2'
        >
            Password
            <input
                type='password'
                id='password'
                className='flex-1 rounded-md p-1'
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must have at least 6 characters',
                    },
                })}
            />
            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
        </label>
    );
};

export default PasswordInput;
