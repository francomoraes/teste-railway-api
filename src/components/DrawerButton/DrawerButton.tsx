import { IoMenu } from 'react-icons/io5';

const DrawerButton = ({ toggleDrawer }: { toggleDrawer: () => void }) => (
    <button
        className='absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-black/20 text-2xl text-white lg:hidden'
        onClick={toggleDrawer}
    >
        <IoMenu />
    </button>
);

export default DrawerButton;
