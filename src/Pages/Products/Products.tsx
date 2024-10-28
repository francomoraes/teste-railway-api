import { ProductsTable } from '@/components';
import useTenantStore from '@/store/useTenantsStore';
import { useEffect, useState } from 'react';

type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
};

const Products = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { selectedTenant } = useTenantStore();

    useEffect(() => {
        setIsLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}products?tenantUuid=${selectedTenant?.uuid}&page=0&limit=100`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        console.log('data', data);
                        setProducts(
                            data.map((product: ProductType) => ({
                                id: product.id,
                                name: product.name,
                                description: product.description,
                                price: product.price,
                            }))
                        );
                        setIsLoading(false);
                    }
                } else {
                    console.error(`Error: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [selectedTenant]);

    return (
        <div className='flex h-[calc(100%-58px)] flex-col p-4'>
            <h2 className='custom-h2'>Produtos</h2>
            <div className='flex-grow'>
                <ProductsTable
                    data={products}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default Products;
