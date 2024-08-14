import { create } from "zustand";

const profileStore = create((set) => ({
    // initial state
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    userId: '',
    token: '',
    profile_img: 'https://getchupprofile.s3.us-east-2.amazonaws.com/Beaimage.jpg',
    notification: false,
    movement_reminder: false,
    task_reminder: false,
    survey_done: false,
    current_question: 0,
    is_login: false,
    answers: '',
    user_type: '',
  
    // setters
    setSurveyDone: (survey_done) => set((state) => ({ ...state, survey_done })),
    setFirstName: (first_name) => set((state) => ({ ...state, first_name })),
    setLastName: (last_name) => set((state) => ({ ...state, last_name })),
    setEmail: (email) => set((state) => ({ ...state, email })),
    setPhone: (phone) => set((state) => ({ ...state, phone })),
    setPassword: (password) => set((state) => ({ ...state, password })),
    setUserId: (userId) => set((state) => ({ ...state, userId })),
    setToken: (token) => set((state) => ({ ...state, token })),
    setProfileImg: (profile_img) => set((state) => ({ ...state, profile_img })),
    setNotification: (notification) => set((state) => ({ ...state, notification })),
    setMovementReminder: (movement_reminder) => set((state) => ({ ...state, movement_reminder })),
    setTaskReminder: (task_reminder) => set((state) => ({ ...state, task_reminder })),
    setCurrentQuestion: (current_question) => set((state) => ({ ...state, current_question })),
    setAnswers: (answers) => set((state) => ({ ...state, answers })),
    setUserType: (user_type) => set((state) => ({ ...state, user_type })),
    setIsLogin: (is_login) => set((state) => ({ ...state, is_login })),
  
    clearProfileImg: () => set((state) => ({ ...state, profile_img: '' })),
    clearToken: () => set((state) => ({ ...state, token: '' })),
    clearUserId: () => set((state) => ({ ...state, userId: '' })),
}));

export default profileStore;
