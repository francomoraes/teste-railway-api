import { create } from 'zustand';

export type User = {
    name: string;
    email: string;
};

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
};

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
}));

export default useUserStore;
