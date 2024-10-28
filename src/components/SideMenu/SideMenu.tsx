import { Link } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import Dropdown from '../Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import useTenantStore from '@/store/useTenantsStore';

const SideMenu = () => {
    const { user, setUser } = useUserStore();
    const [tenantsList, setTenantsList] = useState<string[]>([]);
    const { setTenants } = useTenantStore();

    useEffect(() => {
        const fetchTenants = async () => {
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
                            Produtos
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
