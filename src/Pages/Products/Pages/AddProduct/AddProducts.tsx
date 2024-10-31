import { SpinnerLoader } from '@/components';
import useTenantStore from '@/store/useTenantsStore';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddProductFormData } from './types';
import { handleAddProduct } from './service/handleAddProduct';
import TextField from '@/components/TextField/TextField';
import { motion } from 'framer-motion';

const AddProducts = () => {
    const { selectedTenant } = useTenantStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<AddProductFormData>();

    const onSubmit: SubmitHandler<AddProductFormData> = async (data) => {
        const accessToken = localStorage.getItem('accessToken');
        if (selectedTenant) {
            console.log('data', data);
            // handleAddProduct(data, selectedTenant?.uuid, accessToken, setIsLoading, setSuccessMessage, setError, reset);
        }
    };

    if (isLoading)
        return (
            <div className='flex h-[calc(100%-58px)] w-full flex-col items-center justify-center'>
                <div className='h-40 w-40'>
                    <SpinnerLoader />
                </div>
            </div>
        );

    if (error) return <p className='text-red-500'>Erro: {error}</p>;

    return (
        <motion.div
            className='mt-10 flex flex-col items-center justify-center p-4'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <form
                className='flex w-[300px] flex-col gap-4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    label='Nome do produto'
                    register={register('name', { required: 'Nome é obrigatório' })}
                    error={errors.name?.message}
                />
                <TextField
                    label='Descrição do produto'
                    register={register('description', { required: 'Descrição é obrigatória' })}
                    error={errors.description?.message}
                />
                <TextField
                    label='Preço do produto'
                    register={register('price', {
                        required: 'Preço é obrigatório e deve ser maior do que zero',
                        valueAsNumber: true,
                        min: { value: 0.01, message: 'O preço deve ser maior que zero' },
                    })}
                    isPrice
                    name='price'
                    setValue={setValue}
                    error={errors.price?.message}
                />
                <div className='flex w-full gap-2'>
                    <button
                        type='button'
                        className='flex-1 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700'
                        onClick={() => reset()}
                    >
                        Cancelar
                    </button>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='flex-1 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                    >
                        Salvar
                    </button>
                </div>
            </form>
            {successMessage && <p className='pt-10 text-blue-500'>{successMessage}</p>}
        </motion.div>
    );
};

export default AddProducts;
