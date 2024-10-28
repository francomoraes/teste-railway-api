import { Header, SideMenu } from '@/components';
import { Outlet } from 'react-router-dom';

const Layout = () => {
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
