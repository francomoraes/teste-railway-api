import { useEffect, useState } from 'react';
import { ProductType } from '../types';
import { fetchProducts } from '../service/fetchProducts';

export const useFetchProducts = (tenantUuid: string | undefined) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!tenantUuid) return;

        const loadProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchProducts(tenantUuid);
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch products');
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, [tenantUuid]);

    return { products, isLoading, error };
};
