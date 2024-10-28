import { Link } from 'react-router-dom';
import useUserStore, { User } from '../../store/useUserStore';
import Dropdown from '../Dropdown/Dropdown';

const SideMenu = () => {
    const { user, setUser } = useUserStore();

    return (
        <div className='flex h-full w-[300px] flex-col bg-gray-200 p-4'>
            <div>
                <Dropdown />
            </div>
            <div className='mt-10 flex h-full flex-col gap-2'>
                {user && (
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
                            onClick={() => setUser(null)}
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
