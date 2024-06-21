import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  selectedDate: new Date(),
  setTasks : (tasks) => set ({tasks}),
  setSelectedDate: (date) => set({ selectedDate: date }),
  addDataTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] })),
  removeDataTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task._id !== id),
  })),
}));

export default useTaskStore ;
