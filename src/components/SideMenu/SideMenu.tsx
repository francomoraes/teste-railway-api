import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import useUserStore from '../../store/useUserStore';
import useTenantStore from '@/store/useTenantsStore';

import { Dropdown } from '@/components';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
    const { user, setUser } = useUserStore();
    const [tenantsList, setTenantsList] = useState<string[]>([]);
    const { setTenants } = useTenantStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}tenants`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setTenants(data);
                        const tenants = data.map((tenant: any) => tenant.displayName);
                        setTenantsList(tenants);
                    }
                } else {
                    console.error(`Error: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.error('Failed to fetch tenants:', error);
            }
        };

        if (user) {
            fetchTenants();
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');

        setUser(null);

        navigate('/', { replace: true });

        window.location.reload();
    };

    if (!user) return null;

    return (
        <div className='flex h-full w-[300px] flex-col bg-gray-100 p-4'>
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
