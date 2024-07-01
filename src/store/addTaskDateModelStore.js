import { create } from "zustand";

const useAddTaskDateModelStore = create((set) => ({
  dateLabel: "Today",
  timeLabel: "Anytime",

  // Setter
  setDateLabel: (value) => set({ dateLabel: value }),
  setTimeLabel: (value) => set({ timeLabel: value }),

  clearAddTaskDateModelStore: () =>
    set({
      setDateLabel: "",
      setTimeLabel: "",
    }),
}));

export default useAddTaskDateModelStore;
