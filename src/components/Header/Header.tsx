import { useFetchProducts } from '@/Pages/Products/hooks/useFetchProducts';
import useTenantStore from '@/store/useTenantsStore';
import useUserStore from '@/store/useUserStore';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Header = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();
    const { selectedTenant } = useTenantStore();
    const { products } = useFetchProducts(selectedTenant?.uuid);
    const location = useLocation();

    const showBackButton = productId || location.pathname.includes('add-product');

    const handleClick = () => {
        navigate(-1);
    };
    let selectedProduct;

    if (productId) {
        selectedProduct = products.find((product) => product.id === +productId);
    }

    if (!user) return null;

    return (
        <div
            className={`flex w-full items-center border-b border-gray-300 bg-gray-50 p-4 shadow-sm ${showBackButton ? 'justify-between' : 'justify-end'}`}
        >
            {showBackButton && (
                <>
                    <button
                        onClick={handleClick}
                        className='flex items-center gap-2 rounded-full bg-gray-200 px-3 py-2 font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-300 hover:text-gray-800'
                    >
                        <IoMdArrowRoundBack className='h-5 w-5' />
                    </button>
                    <span className='rounded-full bg-gray-200 px-3 py-2 font-medium text-gray-600'>
                        {selectedProduct ? selectedProduct?.name : 'Criar um produto'}
                    </span>
                </>
            )}

            <span className='px-3 py-2 text-lg font-semibold text-gray-700'>Olá, {user?.firstName}</span>
        </div>
    );
};

export default Header;
