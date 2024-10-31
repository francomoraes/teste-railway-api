import { useNavigate } from 'react-router-dom';

import useUserStore from '../../store/useUserStore';
import useTenantStore from '@/store/useTenantsStore';

import { Dropdown } from '@/components';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
    const { user, setUser } = useUserStore();
    const { tenantsList } = useTenantStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');

        setUser(null);

        navigate('/', { replace: true });

        window.location.reload();
    };

    if (!user) return null;

    return (
        <div className={`relative flex h-full w-[300px] flex-col bg-gray-100 p-4`}>
            <div>
                <Dropdown data={tenantsList} />
            </div>
            <div className='font-confortaa mt-10 flex h-full flex-col gap-2 transition-all'>
                <NavLink
                    to='/'
                    className={({ isActive }) => {
                        return isActive
                            ? 'custom-link pointer-events-none !cursor-none !bg-gray-500 !pl-4 font-bold text-white transition-all'
                            : 'custom-link font-light';
                    }}
                >
                    Página Inicial
                </NavLink>
                <NavLink
                    to='products'
                    className={({ isActive }) => {
                        return isActive
                            ? 'custom-link pointer-events-none !cursor-none !bg-gray-500 !pl-4 font-bold text-white transition-all'
                            : 'custom-link font-light';
                    }}
                >
                    Produtos
                </NavLink>
                <NavLink
                    to='#'
                    className='custom-link mb-0 mt-auto'
                    onClick={handleLogout}
                >
                    Sair
                </NavLink>
            </div>
        </div>
    );
};

export default SideMenu;
