import { SpinnerLoader } from '@/components';
import useTenantStore from '@/store/useTenantsStore';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddProductFormData } from './types';
import { handleAddProduct } from './service/handleAddProduct';
import TextField from '@/components/TextField/TextField';

const AddProducts = () => {
    const { selectedTenant } = useTenantStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [priceInCents, setPriceInCents] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AddProductFormData>();

    const onSubmit: SubmitHandler<AddProductFormData> = async (data) => {
        console.log('data', data);
        const accessToken = localStorage.getItem('accessToken');
        if (selectedTenant) {
            const formData = { ...data, price: priceInCents } as AddProductFormData;
            handleAddProduct(
                formData,
                selectedTenant?.uuid,
                accessToken,
                setIsLoading,
                setSuccessMessage,
                setError,
                reset
            );
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
        <div className='mt-10 flex flex-col items-center justify-center p-4'>
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
                        required: 'Preço é obrigatório',
                        valueAsNumber: true,
                        min: { value: 0.01, message: 'O preço deve ser maior que zero' },
                    })}
                    error={errors.price?.message}
                    isPrice={true}
                    onPriceChange={(valueInCents) => setPriceInCents(valueInCents)}
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
                        className='flex-1 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700'
                    >
                        Salvar
                    </button>
                </div>
            </form>
            {successMessage && <p className='pt-10 text-green-500'>{successMessage}</p>}
        </div>
    );
};

export default AddProducts;
