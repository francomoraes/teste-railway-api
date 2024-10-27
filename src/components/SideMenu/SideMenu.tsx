import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import useUserStore, { User } from '../../store/useUserStore';

const SideMenu = () => {
    const { user, setUser } = useUserStore();

    return (
        <div className='flex h-full w-[300px] flex-col bg-gray-200 p-4'>
            <div>
                <Dropdown />
            </div>
            <div className='mt-10 flex h-full flex-col gap-2'>
                {user && user?.name && (
                    <>
                        <Link
                            to='/'
                            className='custom-link'
                        >
                            Home
                        </Link>
                        <Link
                            to='products'
                            className='custom-link'
                        >
                            Products
                        </Link>
                        <Link
                            to='#'
                            className='custom-link mb-0 mt-auto'
                            onClick={() => setUser({} as User)}
                        >
                            Sair
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default SideMenu;
