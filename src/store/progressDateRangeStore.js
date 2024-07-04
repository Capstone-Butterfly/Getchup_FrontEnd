import { create } from "zustand";
import dayjs from 'dayjs';

const useProgressDateRangeStore = create((set) => ({
  activeDateRangeTab: 'Day', 
  chartSelectedStartDate: dayjs().format('YYYY-MM-DD'),
  chartSelectedEndDate: dayjs().format('YYYY-MM-DD'),

  setActiveDateRangeTab: (value) => set({ activeDateRangeTab: value }),
  setchartSelectedStartDate: (date) => set({ chartSelectedStartDate : date }),
  setchartSelectedEndDate: (date) => set({ chartSelectedEndDate : date }),
}));

export default useProgressDateRangeStore;