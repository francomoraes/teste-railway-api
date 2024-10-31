import useTenantStore from '@/store/useTenantsStore';
import { useEffect, useState } from 'react';
import { CgChevronDown } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = ({ data = [] }: { data?: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(data[0]);
    const { tenants, setSelectedTenant } = useTenantStore();
    let isDisabled = data.length === 0;

    const handleClickOutside = (event: MouseEvent) => {
        const dropdownElement = document.querySelector('#dropdown-container');
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectTenant = (item: string) => {
        const tenant = tenants?.find((tenant) => tenant.displayName === item);
        if (tenant) {
            setSelectedTenant(tenant);
            setSelected(item);
        }
    };

    return (
        <div
            id='dropdown-container'
            className={`relative ${isDisabled ? 'pointer-events-none opacity-50' : 'pointer-events-auto'}`}
        >
            <button
                className='flex w-full items-center rounded-md bg-gray-200 px-4 py-2 text-left font-medium text-gray-700 shadow-sm transition duration-200 hover:bg-gray-300'
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected || 'Select'}
                <CgChevronDown className={`ml-auto mr-0 inline-block transition-all ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className='absolute mt-2 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg'
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                        {data.map((item) => (
                            <li
                                key={item}
                                className='cursor-pointer px-4 py-2 text-gray-600 transition duration-150 hover:bg-blue-100 hover:text-gray-800'
                                onClick={() => {
                                    setIsOpen(false);
                                    handleSelectTenant(item);
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;
