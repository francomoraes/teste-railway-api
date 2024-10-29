import { Header, SideMenu } from '@/components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchUserData } from '../Login/helpers/fetchUserData';
import useUserStore from '@/store/useUserStore';
import useTenantStore from '@/store/useTenantsStore';
import { useSSEPolyfill } from '@/hooks/useSSEPolyfill';
import NotificationDisplay from '@/components/NotificationDisplay/NotificationDisplay';

const Layout = () => {
    const { setUser } = useUserStore();
    const { selectedTenant } = useTenantStore();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken) {
            fetchUserData(accessToken)
                .then((user) => setUser(user))
                .catch((error) => console.error('error:', error));
        }
    }, []);

    const notifications = useSSEPolyfill(selectedTenant?.uuid, accessToken);

    return (
        <div className='flex h-full'>
            <SideMenu />
            <main className='flex-1'>
                <Header />
                <Outlet />
            </main>
            <NotificationDisplay notifications={notifications} />
        </div>
    );
};

export default Layout;
