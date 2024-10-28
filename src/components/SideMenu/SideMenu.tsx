import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

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

    return (
        <div className='flex h-full w-[300px] flex-col bg-gray-200 p-4'>
            <div>
                <Dropdown data={tenantsList} />
            </div>
            <div className='mt-10 flex h-full flex-col gap-2'>
                {user && (
                    <>
                        <NavLink
                            to='/'
                            className={({ isActive }) => {
                                return isActive ? 'custom-link !bg-gray-500 text-white' : 'custom-link';
                            }}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to='products'
                            className={({ isActive }) => {
                                return isActive ? 'custom-link !bg-gray-500 text-white' : 'custom-link';
                            }}
                        >
                            Produtos
                        </NavLink>
                        <NavLink
                            to='#'
                            className='custom-link mb-0 mt-auto'
                            onClick={() => {
                                localStorage.removeItem('accessToken');
                                navigate('/');
                                setUser(null);
                            }}
                        >
                            Sair
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default SideMenu;
