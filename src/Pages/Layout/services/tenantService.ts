export const fetchTenants = async (accessToken: string | null) => {
    if (!accessToken) return null;
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}tenants`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch tenants:', error);
        return null;
    }
};
