import { ProductType } from '../types';

export const fetchProducts = async (
    tenantUuid: string | undefined,
    accessToken: string | null
): Promise<ProductType[]> => {
    if (!tenantUuid || !accessToken) throw new Error('Tenant UUID or access token is missing.');

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}products?tenantUuid=${tenantUuid}&page=0&limit=100`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);

    const data = await response.json();
    return data.map((product: ProductType) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
    }));
};
