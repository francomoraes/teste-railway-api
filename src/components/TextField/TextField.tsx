import { UseFormRegisterReturn } from 'react-hook-form';

interface TextFieldProps {
    label: string;
    register: UseFormRegisterReturn;
    error?: string;
    type?: string;
}

const TextField = ({ label, register, error, type = 'text' }: TextFieldProps) => (
    <div className='flex'>
        <input
            {...register}
            type={type}
            placeholder={label}
            className='flex-1 rounded-md border-2 border-gray-400/40 p-1'
        />
        {error && <p className='text-red-500'>{error}</p>}
    </div>
);

export default TextField;
