import { create } from 'zustand';

type UserState = {
  name: string;
  userId: string;
  coins: number;
  walletBalance: number;
  unusedCoupons: number;
  usedCoupons: number;
  consumeCoins: (n: number) => void;
  addCoins: (n: number) => void;
};

export const useUser = create<UserState>((set) => ({
  name: '苹果用户7360',
  userId: '4056899579',
  coins: 20,
  walletBalance: 0,
  unusedCoupons: 0,
  usedCoupons: 0,
  consumeCoins: (n) => set((s) => ({ coins: Math.max(0, s.coins - n) })),
  addCoins: (n) => set((s) => ({ coins: s.coins + n })),
}));
