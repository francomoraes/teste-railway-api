import useUserStore from '@/store/useUserStore';
import { useNavigate, useParams } from 'react-router-dom';

const Header = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <div className='flex w-full justify-between border border-black p-4'>
            {productId && (
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
