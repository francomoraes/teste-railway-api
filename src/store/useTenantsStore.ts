import { create } from 'zustand';

export type Tenant = {
    id: number;
    uuid: string;
    displayName: string;
};

type TenantStore = {
    tenantsList: string[];
    setTenantsList: (tenants: string[]) => void;
    tenants: Tenant[] | null;
    setTenants: (tenants: Tenant[] | null) => void;
    selectedTenant: Tenant | null;
    setSelectedTenant: (tenant: Tenant | null) => void;
};

const useTenantStore = create<TenantStore>((set) => ({
    tenantsList: [],
    setTenantsList: (tenants: string[]) => set({ tenantsList: tenants }),
    tenants: null,
    setTenants: (tenants: Tenant[] | null) => set({ tenants }),
    selectedTenant: null,
    setSelectedTenant: (tenant: Tenant | null) => set({ selectedTenant: tenant }),
}));

export default useTenantStore;
