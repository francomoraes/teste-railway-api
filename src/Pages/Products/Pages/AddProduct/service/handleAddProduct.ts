// services/addProductHandler.ts

import { AddProductFormData } from '../types';

export const handleAddProduct = async (
    data: AddProductFormData,
    tenantUuid: string | undefined,
    token: string | null,
    setIsLoading: (loading: boolean) => void,
    setSuccessMessage: (message: string | null) => void,
    setError: (error: string | null) => void,
    reset: () => void
) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}products?tenantUuid=${tenantUuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar produto');
        }

        const parsedData = await response.json();
        setSuccessMessage(
            `Produto cadastrado com sucesso! ${parsedData.name} - R$ ${(parsedData.price / 100).toLocaleString(
                'pt-br',
                {
                    style: 'currency',
                    currency: 'BRL',
                }
            )}`
        );

        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);

        reset();
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        setError('Erro ao cadastrar produto');
    } finally {
        setIsLoading(false);
    }
};
