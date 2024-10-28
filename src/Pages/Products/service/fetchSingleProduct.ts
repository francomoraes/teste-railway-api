export const fetchSingleProduct = async (productId: string, tenantUuid: string) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}products/${productId}?tenantUuid=${tenantUuid}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching product');
        }

        const product = await response.json();

        return product;
    } catch (error) {
        console.error('Error fetching product', error);
    }
};
