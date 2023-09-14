import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartSlice, DashboardSlice } from '@/store';
import { createCartSlice, createDashboardSlice } from '@/store';

type StoreState = CartSlice & DashboardSlice;
export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createCartSlice(...a),
      ...createDashboardSlice(...a)
    }),
    { name: 'app-store' }
  )
);
