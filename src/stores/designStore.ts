import { create } from 'zustand';

interface DesignState {
  userMenuWidth: number;
  setUserMenuWidth: (width: number) => void;
}

export const useDesignStore = create<DesignState>((set) => ({
  userMenuWidth: 120,
  setUserMenuWidth: (width) => set({ userMenuWidth: width }),
}));
