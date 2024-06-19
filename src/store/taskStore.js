import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  selectedDate: new Date(),
  setTasks : (tasks) => set ({tasks}),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useTaskStore ;
