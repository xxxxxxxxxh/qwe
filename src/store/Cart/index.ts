import type { Product } from '@/interfaces';
import { StateCreator } from 'zustand';

export interface CartSlice {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  cart: [],
  addToCart: (product: Product) => {
    const cart = get().cart;
    const findProduct = cart.find((p: Product) => p.id === product.id);
    if (findProduct) return;
    cart.push({
      ...product
    });
    set({ cart });
  },
  removeFromCart: (productId: string) => {
    set({
      cart: get().cart.filter((product) => product.id !== productId)
    });
  },
  clearCart: () => set({ cart: [] })
});
