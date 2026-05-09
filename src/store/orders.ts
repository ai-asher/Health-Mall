import { create } from 'zustand';

export type OrderItem = {
  productId: string;
  qty: number;
  spec?: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: '待发货' | '已发货' | '已完成';
  createdAt: string;
  address: string;
};

type OrdersState = {
  orders: Order[];
  createOrder: (items: OrderItem[], total: number, address: string) => Order;
};

const formatNow = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const useOrders = create<OrdersState>((set) => ({
  orders: [
    {
      id: 'ORD2026042001',
      items: [{ productId: 'p1', qty: 2 }],
      total: 118.0,
      status: '已发货',
      createdAt: '2026-04-20 14:23',
      address: '北京市朝阳区...',
    },
    {
      id: 'ORD2026041501',
      items: [{ productId: 'p2', qty: 1 }, { productId: 'p7', qty: 2 }],
      total: 111.9,
      status: '已完成',
      createdAt: '2026-04-15 09:42',
      address: '北京市朝阳区...',
    },
  ],
  createOrder: (items, total, address) => {
    const order: Order = {
      id: 'ORD' + Date.now(),
      items,
      total,
      status: '待发货',
      createdAt: formatNow(),
      address,
    };
    set((s) => ({ orders: [order, ...s.orders] }));
    return order;
  },
}));
