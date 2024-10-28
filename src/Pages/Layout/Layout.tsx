import { Header, SideMenu } from '@/components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchUserData } from '../Login/helpers/fetchUserData';
import useUserStore from '@/store/useUserStore';

const Layout = () => {
    const { setUser } = useUserStore();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            fetchUserData(accessToken)
                .then((user) => setUser(user))
                .catch((error) => console.error('error:', error));
        }
    }, []);

    return (
        <div className='flex h-full'>
            <SideMenu />
            <main className='flex-1'>
                <Header />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
