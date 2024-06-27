import { create } from "zustand";
import DateFormatter from "../utils/DateFormatter";


const useTaskStore = create((set) => ({
  tasks: [],
  selectedDate: DateFormatter(new Date()),
  setTasks : (tasks) => set ({tasks}),
  setSelectedDate: (date) => set({ selectedDate: date }),
  addDataTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] })),
  removeDataTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task._id !== id),
  })),
}));

export default useTaskStore ;
