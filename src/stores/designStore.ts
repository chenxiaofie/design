import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  nameZh: string;
  category: string;
  tags: string[];
  thumbnail: string;
  price: number;
}

interface DesignState {
  userMenuWidth: number;
  setUserMenuWidth: (width: number) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const useDesignStore = create<DesignState>((set) => ({
  userMenuWidth: 120,
  setUserMenuWidth: (width) => set({ userMenuWidth: width }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
