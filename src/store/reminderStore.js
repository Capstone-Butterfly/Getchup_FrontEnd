import { create } from "zustand";

const useReminderStore = create((set) => ({
    taskReminder: true,
    movementReminder: true,
    notifications: true,
  
    // Setters
    setTaskReminder: (value) => set({ taskReminder : value }),
    setmovementReminder: (value) => set({ movementReminder : value }),
    setnotifications: (value) => set({ notifications : value }),
  }));

  export default useReminderStore ;