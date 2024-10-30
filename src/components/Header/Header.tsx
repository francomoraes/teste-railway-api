import useUserStore from '@/store/useUserStore';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Header = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();
    const location = useLocation();

    const showBackButton = productId || location.pathname.includes('add-product');

    const handleClick = () => {
        navigate(-1);
    };

    if (!user) return null;

    return (
        <div className='flex w-full items-center justify-between border-b border-gray-200 bg-gray-200 p-4 shadow-md'>
            {showBackButton && (
                <button
                    onClick={handleClick}
                    className='rounded-lg bg-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-400 hover:text-gray-900'
                >
                    Voltar
                </button>
            )}
            <span className='ml-auto mr-0 text-lg font-medium text-gray-800'>Olá, {user?.firstName}</span>
        </div>
    );
};

export default Header;
