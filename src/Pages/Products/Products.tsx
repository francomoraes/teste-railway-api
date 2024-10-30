import { ProductsTable, SpinnerLoader } from '@/components';
import useTenantStore from '@/store/useTenantsStore';
import { useFetchProducts } from './hooks/useFetchProducts';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { TfiReload } from 'react-icons/tfi';

const Products = () => {
    const { selectedTenant } = useTenantStore();
    const { products, isLoading, error, refetch } = useFetchProducts(selectedTenant?.uuid);
    const navigate = useNavigate();

    const handleRowClick = (item: any) => {
        navigate(`/products/${item.id}?tenantUuid=${selectedTenant?.uuid}`);
    };

    const handleAddClick = () => {
        navigate('/products/add-product');
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
        <div className='flex h-[calc(100%-58px)] flex-col bg-gray-50 p-6'>
            <div className='my-4 flex justify-end gap-4 rounded-lg bg-white p-2 shadow-md'>
                <button
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600'
                    onClick={handleAddClick}
                >
                    <FaPlus className='h-5 w-5' />
                </button>
                <button
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300'
                    onClick={refetch}
                >
                    <TfiReload className='h-5 w-5 text-gray-600' />
                </button>
            </div>
            <div className='flex-grow rounded-lg bg-white p-4 shadow-md'>
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
