import { fetchUserData } from '@/Pages/Login/helpers/fetchUserData';

export const getUser = async (accessToken: string | null) => {
    if (!accessToken) return null;
    try {
        return await fetchUserData(accessToken);
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};
