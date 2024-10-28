import useUserStore from '@/store/useUserStore';

const Header = () => {
    const { user } = useUserStore();
    return (
        <div className='flex w-full justify-end border border-black p-4'>
            <span>Olá, {user?.firstName}</span>
        </div>
    );
};

export default Header;
