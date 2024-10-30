import useUserStore from '@/store/useUserStore';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { loginUser } from './helpers/loginUser';
import { fetchUserData } from './helpers/fetchUserData';

import { LoginFormData } from './types';

import { EmailInput, PasswordInput, SpinnerLoader, SubmitButton } from '@/components';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useUserStore();

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const { accessToken } = await loginUser(data);
            localStorage.setItem('accessToken', accessToken);
            const user = await fetchUserData(accessToken);
            setUser(user);
        } catch (error) {
            console.error('error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading)
        return (
            <div className='flex w-full flex-1 flex-col items-center justify-center'>
                <div className='h-40 w-40'>
                    <SpinnerLoader />
                </div>
            </div>
        );

    return (
        <div className='flex flex-1 flex-col items-center justify-center'>
            <form
                className='flex w-[300px] flex-col gap-4 rounded-sm border-2 border-gray-200/20 p-6 shadow-md'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className='custom-h2'>Login</h2>
                <EmailInput
                    register={register}
                    errors={errors}
                />
                <PasswordInput
                    register={register}
                    errors={errors}
                />
                <SubmitButton />
            </form>
        </div>
    );
};

export default Login;
