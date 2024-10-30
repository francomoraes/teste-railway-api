import { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';

interface TextFieldProps {
    label: string;
    register: UseFormRegisterReturn;
    error?: string;
    type?: string;
    isPrice?: boolean;
    onPriceChange?: (value: number) => void;
}

const TextField = ({ label, register, error, type = 'text', isPrice = false, onPriceChange }: TextFieldProps) => {
    const [value, setValue] = useState('');

    const formatPriceToReais = (value: string) => {
        const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
        return `R$ ${(numericValue / 100).toFixed(2).replace('.', ',')}`;
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const numericValue = parseInt(rawValue.replace(/\D/g, '')) || 0;
        const formattedValue = formatPriceToReais(rawValue);
        setValue(formattedValue);
        if (onPriceChange) onPriceChange(numericValue);
    };

    return (
        <div className='flex'>
            <input
                {...register}
                type={type}
                placeholder={label}
                value={isPrice ? value : undefined}
                onChange={isPrice ? handlePriceChange : register.onChange}
                className='flex-1 rounded-md border-2 border-gray-400/40 p-1'
            />
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    );
};

export default TextField;
