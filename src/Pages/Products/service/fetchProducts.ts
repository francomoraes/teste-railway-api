import { ProductType } from '../types';

export const fetchProducts = async (tenantUuid: string | undefined): Promise<ProductType[]> => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}products?tenantUuid=${tenantUuid}&page=0&limit=100`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((product: ProductType) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
    }));
};
