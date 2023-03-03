import { create } from 'zustand';

interface BearState {
    bears: number;
    getToken: () => string | null;
}

export const useUserStore = create<BearState>((set) => ({
    bears: 0,
    getToken: () => {
        return localStorage.getItem('jwt');
    },
}));
