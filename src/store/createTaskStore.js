import { create } from "zustand";

const useCreateTaskStore = create((set) => ({
    title: "",
    date: "",
    is_repeated: false,
    notes: "",
    task_urgency: "medium",
    subTasks: [],
  
    // Setters
    setTitle: (title) => set({ title }),
    setDate: (date) => set({ date }),
    setIsRepeated: (is_repeated) => set({ is_repeated }),
    setNotes: (notes) => set({ notes }),
    setTaskUrgency: (task_urgency) => set({ task_urgency }),
  
    // Setters for subtasks
    addSubtask: (subtask) => set({ subTasks : subtask }),
    updateSubtask: (index, updatedSubtask) =>
      set((state) => ({
        subtasks: state.subtasks.map((subtask, i) =>
          i === index ? updatedSubtask : subtask
        ),
      })),
    removeSubtask: (index) =>
      set((state) => ({
        subtasks: state.subtasks.filter((_, i) => i !== index),
      })),
  }));

  export default useCreateTaskStore ;