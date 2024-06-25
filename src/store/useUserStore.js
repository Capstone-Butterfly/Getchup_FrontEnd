import { create } from "zustand";

const useUserStore = create((set) => ({
  userInfo: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    notification: false,
    movement_reminder: false,
    task_reminder: false
  },
  setUserInfo: (userInfo) => set((state) => ({ userInfo: { ...state.userInfo, ...userInfo } })),
  editableField: null,
  setEditableField: (editableField) => set({ editableField }),

}));

export default useUserStore;