import { useState, useEffect } from 'react';
import useTenantStore from '@/store/useTenantsStore';
import { ProductType } from '../types';
import { fetchProducts } from '../services/fetchProducts';

export const useProducts = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { selectedTenant } = useTenantStore();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const loadProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const products = await fetchProducts(selectedTenant?.uuid, accessToken);
                setProducts(products);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        if (selectedTenant) loadProducts();
    }, [selectedTenant]);

    return { products, isLoading, error };
};
