// store/poiStore.ts
import { create } from "zustand";

export const usePoiStore = create<{
  selectedId: string | null;
  select: (id: string | null) => void;
}>((set) => ({ selectedId: null, select: (id) => set({ selectedId: id }) }));
