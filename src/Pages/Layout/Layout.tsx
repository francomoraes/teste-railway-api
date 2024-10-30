import { Header, SideMenu } from '@/components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchUserData } from '../Login/helpers/fetchUserData';
import useUserStore from '@/store/useUserStore';
import useTenantStore from '@/store/useTenantsStore';
import { useSSEPolyfill } from '@/hooks/useSSEPolyfill';
import NotificationDisplay from '@/components/NotificationDisplay/NotificationDisplay';

const Layout = () => {
    const { user, setUser } = useUserStore();
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
            {user && <SideMenu />}
            <main className='flex flex-1 flex-col'>
                <Header />
                <Outlet />
            </main>
            <NotificationDisplay notifications={notifications} />
        </div>
    );
};

export default Layout;
