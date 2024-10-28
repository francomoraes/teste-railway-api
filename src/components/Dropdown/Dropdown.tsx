import useTenantStore from '@/store/useTenantsStore';
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        if (data) {
            handleSelectTenant(data[0]);
        }

        return () => {
            setSelectedTenant(null);
        };
    }, [data]);

    return (
        <div
            id='dropdown-container'
            className={`relative ${isDisabled ? 'pointer-events-none opacity-40' : 'pointer-events-auto'}`}
        >
            <button
                className='w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected || 'Select'}
            </button>
            {isOpen && (
                <ul className='absolute mt-2 w-full rounded border border-gray-300 bg-white'>
                    {data.map((item) => (
                        <li
                            key={item}
                            className='cursor-pointer px-4 py-2 hover:bg-gray-100'
                            onClick={() => {
                                setIsOpen(false);
                                handleSelectTenant(item);
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
