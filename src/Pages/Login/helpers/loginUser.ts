import { LoginFormData } from '../types';

export const loginUser = async (data: LoginFormData) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
};
