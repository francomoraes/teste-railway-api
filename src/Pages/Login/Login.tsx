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
            <div className='flex h-[calc(100%-58px)] w-full flex-col items-center justify-center'>
                <div className='h-40 w-40'>
                    <SpinnerLoader />
                </div>
            </div>
        );

    return (
        <div className='mt-10 flex flex-col items-center justify-center'>
            <h2 className='custom-h2'>Login</h2>
            <form
                className='flex w-[300px] flex-col gap-4'
                onSubmit={handleSubmit(onSubmit)}
            >
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
