import { create } from "zustand";
import DateFormatter from "../utils/DateFormatter";

const useTaskStore = create((set, get) => ({
  tasks: [],
  selectedDate: DateFormatter(new Date()),
  isTaskInProgress: false,
  isTaskCompleted: false,
  setIsTaskInProgress: (status) => set({ isTaskInProgress: status }),
  setIsTaskCompleted: (status) => set({ isTaskCompleted: status }),
  setTasks: (tasks) => set({ tasks }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  addDataTask: (task) => set((state) => {
    //if (!task.due_date) throw new Error('Task must have a valid due date');
    return { tasks: [...state.tasks, task] };
  }),
  removeDataTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task._id !== id),
  })),
  updateDataTask: (updatedTask) => set((state) => {
   // if (!updatedTask.due_date) throw new Error('Updated task must have a valid due date');
    return { tasks: state.tasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    )};
  }),
  tasksForSelectedDate: (date) => {
    const { tasks } = get();
    //console.log("tasks in store are: ", tasks);
    const formattedDate = DateFormatter(date);
    return tasks.filter((task) => DateFormatter(task.due_date) === formattedDate);
  },
  
}));

export default useTaskStore;