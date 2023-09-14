import { StateCreator } from 'zustand';

export interface DashboardSlice {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const createDashboardSlice: StateCreator<DashboardSlice> = (set, _) => ({
  isOpen: true,
  setOpen: (isOpen: boolean) => set({ isOpen })
});
