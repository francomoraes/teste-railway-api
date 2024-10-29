import { AddProductFormData } from '../types';

export const addProduct = async (data: AddProductFormData, tenantUuid: string | undefined, token: string | null) => {
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

    return response.json();
};
