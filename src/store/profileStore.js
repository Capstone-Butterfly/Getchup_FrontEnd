import { create } from "zustand";

const profileStore = create((set) => ({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    userId: '',
    token: '',
    notification: false,
    movement_reminder: false,
    task_reminder: false,
    survey_done: false,
    current_question: 0,
    answers: '',
    user_type: '',
  
    setSurveyDone: (survey_done) => set((state) => ({ ...state, survey_done })),
    setFirstName: (first_name) => set((state) => ({ ...state, first_name })),
    setLastName: (last_name) => set((state) => ({ ...state, last_name })),
    setEmail: (email) => set((state) => ({ ...state, email })),
    setPhone: (phone) => set((state) => ({ ...state, phone })),
    setPassword: (password) => set((state) => ({ ...state, password })),
    setUserId: (userId) => set((state) => ({ ...state, userId })),
    setToken: (token) => set((state) => ({ ...state, token })),
    setNotification: (notification) => set((state) => ({ ...state, notification })),
    setMovementReminder: (movement_reminder) => set((state) => ({ ...state, movement_reminder })),
    setTaskReminder: (task_reminder) => set((state) => ({ ...state, task_reminder })),
    setCurrentQuestion: (current_question) => set((state) => ({ ...state, current_question })),
    setAnswers: (answers) => set((state) => ({ ...state, answers })),
    setUserType: (user_type) => set((state) => ({ ...state, user_type })),
  
    clearToken: () => set((state) => ({ ...state, token: '' })),
    clearUserId: () => set((state) => ({ ...state, userId: '' })),
    
    
}));

export default profileStore;


