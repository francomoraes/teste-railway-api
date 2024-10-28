import { create } from 'zustand';

export type User = {
    avatarUrl: string;
    configs: {
        backgroundColor: string;
        primaryColor: string;
        secondaryColor: string;
    };
    email: string;
    firstName: string;
    id: number;
    lastName: string;
};

type UserStore = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
}));

export default useUserStore;
