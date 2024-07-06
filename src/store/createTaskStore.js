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
    task_reminder: false,
    movement_reminder: false,
  
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
    setTaskReminder: (task_reminder) => set({task_reminder}),
    setMovementReminder: (movement_reminder) => set({movement_reminder}),

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
      task_urgency: "",
      subTasks: [],
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      user_estimate_duration: "",
      task_reminder: false,
      movement_reminder: false
    }),
  }));

  export default useCreateTaskStore ;