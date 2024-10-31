import { Header, SideMenu } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useUserStore from '@/store/useUserStore';
import useTenantStore, { Tenant } from '@/store/useTenantsStore';
import { useSSEPolyfill } from '@/hooks/useSSEPolyfill';
import NotificationDisplay from '@/components/NotificationDisplay/NotificationDisplay';
import { AnimatePresence } from 'framer-motion';
import { fetchTenants } from './services/tenantService';
import { getUser } from './services/userService';
import { handleClickOutside } from './helpers/handleClickOutside';
import DrawerButton from '@/components/DrawerButton/DrawerButton';
import AnimatedDrawer from '@/components/AnimatedDrawer/AnimatedDrawer';

const Layout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user, setUser } = useUserStore();
    const { selectedTenant, tenants, setTenantsList, setTenants, setSelectedTenant } = useTenantStore();
    const accessToken = localStorage.getItem('accessToken');
    const sideMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initTenants = async () => {
            const tenants = await fetchTenants(accessToken);
            if (tenants) {
                setTenants(tenants);
                const tenantsList = tenants.map((tenant: Tenant) => tenant.displayName);
                setTenantsList(tenantsList);
            }
        };

        if (user) initTenants();
    }, [user, setTenants, setTenantsList, accessToken]);

    useEffect(() => {
        if (accessToken) {
            getUser(accessToken).then(setUser);
        }
    }, [setUser, accessToken]);

    useEffect(() => {
        if (tenants && !selectedTenant) setSelectedTenant(tenants[0]);
    }, [tenants, selectedTenant, setSelectedTenant]);

    const notifications = useSSEPolyfill(selectedTenant?.uuid, accessToken);

    useEffect(() => {
        const handleOutsideClick = handleClickOutside(sideMenuRef, drawerOpen, () => setDrawerOpen(false));
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [drawerOpen]);

    const isMobile = window.screen.width < 1024;
    const shouldDisplaySideMenu = user && drawerOpen && isMobile;

    return (
        <div className='relative flex h-full'>
            {isMobile && <DrawerButton toggleDrawer={() => setDrawerOpen((prev) => !prev)} />}
            {user && !isMobile && <SideMenu />}
            <AnimatePresence>{shouldDisplaySideMenu && <AnimatedDrawer sideMenuRef={sideMenuRef} />}</AnimatePresence>
            <main className='flex flex-1 flex-col'>
                <Header />
                <Outlet />
            </main>
            <NotificationDisplay notifications={notifications} />
        </div>
    );
};

export default Layout;
