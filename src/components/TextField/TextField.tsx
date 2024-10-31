import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { useState } from 'react';

interface TextFieldProps {
    label: string;
    register: UseFormRegisterReturn;
    error?: string;
    type?: string;
    isPrice?: boolean;
    onPriceChange?: (value: number) => void;
    setValue?: UseFormSetValue<any>;
    name?: string;
}

const TextField = ({ label, register, error, type = 'text', isPrice = false, setValue, name }: TextFieldProps) => {
    const [displayValue, setDisplayValue] = useState('');

    const handleDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        const numericValue = Number(rawValue) / 100;

        setDisplayValue(
            numericValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
        );

        setValue && setValue(name ? name : '', rawValue);
    };

    return (
        <div className='flex flex-col'>
            <input
                {...register}
                placeholder={label}
                className='flex-1 rounded-md border-2 border-gray-400/40 p-1'
                type={isPrice ? 'hidden' : type}
            />

            {isPrice && (
                <input
                    type='text'
                    placeholder={label}
                    value={displayValue}
                    onChange={handleDisplayChange}
                    className='flex-1 rounded-md border-2 border-gray-400/40 p-1'
                />
            )}

            {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
        </div>
    );
};

export default TextField;
