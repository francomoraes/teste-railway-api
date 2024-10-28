export const fetchUserData = async (accessToken: string) => {
    const userResponse = await fetch(`${import.meta.env.VITE_BASE_URL}auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userResponse.ok) throw new Error('User fetch failed');
    return userResponse.json();
};
