import { create } from "zustand";

const useProgressDateRangeStore = create((set) => ({
  activeDateRangeTab: 'Day', 

  setActiveDateRangeTab: (value) => set({ activeDateRangeTab: value }),
}));

export default useProgressDateRangeStore;