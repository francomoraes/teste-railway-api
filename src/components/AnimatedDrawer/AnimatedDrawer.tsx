import { motion } from 'framer-motion';
import SideMenu from '../SideMenu/SideMenu';
const AnimatedDrawer = ({ sideMenuRef }: { sideMenuRef: React.RefObject<HTMLDivElement> }) => (
    <motion.div
        className='absolute inset-0 z-[9999] bg-black/20'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div
            ref={sideMenuRef}
            className='h-full max-w-min'
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
        >
            <SideMenu />
        </motion.div>
    </motion.div>
);

export default AnimatedDrawer;
