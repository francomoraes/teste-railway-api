import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu/SideMenu';
import Header from '../components/Header/Header';

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
