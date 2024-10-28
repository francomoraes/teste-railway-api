import { ProductsTable, SpinnerLoader } from '@/components';
import useTenantStore from '@/store/useTenantsStore';
import { useFetchProducts } from './hooks/useFetchProducts';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const { selectedTenant } = useTenantStore();
    const { products, isLoading, error } = useFetchProducts(selectedTenant?.uuid);
    const navigate = useNavigate();

    const handleRowClick = (item: any) => {
        navigate(`/products/${item.id}?tenantUuid=${selectedTenant?.uuid}`);
    };

    if (isLoading) {
        return (
            <div className='flex h-[calc(100%-58px)] w-full flex-col items-center justify-center'>
                <div className='h-40 w-40'>
                    <SpinnerLoader />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <p className='text-red-500'>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className='flex h-[calc(100%-58px)] flex-col p-4'>
            <h2 className='custom-h2'>Produtos</h2>
            <div className='flex-grow'>
                <ProductsTable
                    data={products}
                    isLoading={isLoading}
                    handleRowClick={handleRowClick}
                />
            </div>
        </div>
    );
};

export default Products;
