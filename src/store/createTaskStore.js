import { create } from "zustand";

const useCreateTaskStore = create((set) => ({
    createTask: [],
    title: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    is_repeated: false,
    notes: "",
    task_urgency: "",
    user_estimate_duration: "",
    subTasks: [],
  
    // Setters
    setTitle: (title) => set({ title }),
    setStartDate: (date) => set({ start_date : date }),
    setEndDate: (date) => set({ end_date : date }),
    setStartTime: (time) => set({ start_time : time }),
    setEndTime: (time) => set({ end_time : time }),
    setIsRepeated: (is_repeated) => set({ is_repeated }),
    setNotes: (notes) => set({ notes }),
    setTaskUrgency: (task_urgency) => set({ task_urgency }),
    setUserEstimateDuration: (time) => set({ user_estimate_duration : time }),

    addCreateTask: (task) => set((state) => ({ 
      tasks: [...state.createTask, task] })),

    // Setters for subtasks
    addSubtask: (subtask) => set({ subTasks : subtask }),
    updateSubtask: (index, updatedSubtask) =>
      set((state) => ({
        subTasks: state.subTasks.map((subtask, i) =>
          i === index ? updatedSubtask : subtask
        ),
      })),
    removeSubtask: (index) =>
      set((state) => ({
        subTasks: state.subTasks.filter((_, i) => i !== index),
      })),

    clearCreateTaskStore: () => set({
      title: "",
      date: "",
      is_repeated: false,
      notes: "",
      task_urgency: "medium",
      subTasks: [],
    }),
  }));

  export default useCreateTaskStore ;