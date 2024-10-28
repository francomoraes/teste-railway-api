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

    return (
        <div className='flex w-full justify-between border border-black p-4'>
            {showBackButton && (
                <button
                    onClick={handleClick}
                    className='rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700'
                >
                    Voltar
                </button>
            )}
            <span className='ml-auto mr-0'>Olá, {user?.firstName}</span>
        </div>
    );
};

export default Header;
