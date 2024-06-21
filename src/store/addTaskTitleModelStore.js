import { create } from "zustand";

const useAddTaskTitleModelStore = create((set) => ({
    activeTab: "CommonTasks",
   
    // Setters
    setActiveTab: (value) => set({ activeTab : value }),
  }));

  export default useAddTaskTitleModelStore ;