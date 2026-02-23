import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductType } from '@/types/product';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productType?: ProductType;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product) => {
        const items = get().items;
        const isDigital = product.productType && product.productType !== 'PHYSICAL';
        const existingItem = items.find((item) => item.productId === product.productId);

        if (existingItem) {
          // Digital products: quantity stays at 1
          if (isDigital) return;
          set({
            items: items.map((item) =>
              item.productId === product.productId
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: isDigital ? 1 : (product.quantity || 1) }] });
        }
      },
      removeItem: (productId) =>
        set({
          items: get().items.filter((item) => item.productId !== productId),
        }),
      updateQuantity: (productId, quantity) => {
        const item = get().items.find((i) => i.productId === productId);
        // Digital products: quantity fixed at 1
        if (item?.productType && item.productType !== 'PHYSICAL') return;
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      setOpen: (isOpen) => set({ isOpen }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);
