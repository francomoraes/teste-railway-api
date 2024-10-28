import { create } from 'zustand';

export type Tenant = {
    id: number;
    uuid: string;
    displayName: string;
};

type TenantStore = {
    tenants: Tenant[] | null;
    setTenants: (tenants: Tenant[] | null) => void;
    selectedTenant: Tenant | null;
    setSelectedTenant: (tenant: Tenant | null) => void;
};

const useTenantStore = create<TenantStore>((set) => ({
    tenants: null,
    setTenants: (tenants: Tenant[] | null) => set({ tenants }),
    selectedTenant: null,
    setSelectedTenant: (tenant: Tenant | null) => set({ selectedTenant: tenant }),
}));

export default useTenantStore;
