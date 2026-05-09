import { create } from 'zustand';
import { products } from '../mock/products';

export type CartItem = {
  productId: string;
  qty: number;
  spec?: string;
};

type CartState = {
  items: CartItem[];
  add: (productId: string, spec?: string, qty?: number) => void;
  remove: (productId: string) => void;
  changeQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (productId, spec, qty = 1) =>
    set((s) => {
      const existing = s.items.find((i) => i.productId === productId && i.spec === spec);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i === existing ? { ...i, qty: i.qty + qty } : i,
          ),
        };
      }
      return { items: [...s.items, { productId, spec, qty }] };
    }),
  remove: (productId) =>
    set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
  changeQty: (productId, qty) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.productId === productId ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    })),
  clear: () => set({ items: [] }),
  count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
  total: () => {
    const items = get().items;
    return items.reduce((sum, i) => {
      const product = products.find((p) => p.id === i.productId);
      return sum + (product ? product.price * i.qty : 0);
    }, 0);
  },
}));
