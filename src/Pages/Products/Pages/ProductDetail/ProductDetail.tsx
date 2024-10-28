import { SpinnerLoader } from '@/components';
import { fetchSingleProduct } from '@/Pages/Products/service/fetchSingleProduct';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams<{ productId: string }>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tenantUuid = searchParams.get('tenantUuid');

    const [product, setProduct] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!tenantUuid || !productId) return;
            try {
                const productData = await fetchSingleProduct(productId, tenantUuid);
                if (productData) {
                    setProduct(productData);
                } else {
                    setError('Failed to fetch product details.');
                }
            } catch (err) {
                setError('Error fetching product details');
                console.error(err);
            }
        };

        fetchProduct();
    }, [productId, tenantUuid]);

    if (!product && !error) {
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
                <p className='text-red-500'>Erro: {error}</p>
            </div>
        );
    }

    return (
        <div className='m-4 mt-10 flex-1 rounded-lg border-2 border-gray-500/10 bg-white p-8 shadow-md'>
            <h2 className='mb-4 text-2xl font-bold text-gray-800'>Detalhes do produto</h2>
            <div className='space-y-2 text-gray-700'>
                <p className='font-semibold'>
                    <span className='text-gray-900'>Nome:</span> {product.name}
                </p>
                <p className='font-semibold'>
                    <span className='text-gray-900'>Descrição:</span> {product.description}
                </p>
                <p className='font-semibold'>
                    <span className='text-gray-900'>Preço:</span> {product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductDetail;
