import { MutableRefObject } from 'react';

export const handleClickOutside = (ref: MutableRefObject<HTMLElement | null>, isOpen: boolean, onClose: () => void) => {
    return (event: MouseEvent) => {
        if (isOpen && ref.current && !ref.current.contains(event.target as Node)) {
            onClose();
        }
    };
};
