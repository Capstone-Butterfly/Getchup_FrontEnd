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
    profile_img: 'https://s3-alpha-sig.figma.com/img/62a0/a6a0/8592ca584b0351d615004dc4d9cfca77?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SG0poJUVFT0BVy2cf9El4-vcvumc6M~5HKaG9VgtybaR2FAtR-arGhedOCWizPv5ZJ7hQAu5FjVuAWf4cTi2Ca2GN2xD74JtoUwJ3sCJIRubyA8DkVNUxfZW~ux7bmdrZFLpfZV0qwB-7w6eqSVukswLrnp4nlCAwx-JHt~EAA9~-0At7I59rof00OzqlC9xn9JGq~KjokYaUcqHOtICgvMLn38iR04gnSjGvmndFyycuk~arjhVgzFEk9oCTbzCNolYtMMA1GYmGD2~9ZHELItWV-Bq1xtJY9ie1G-zt4qq2xNl-N0prehbAobjfoGnPE5b-n-FcKEbr3~UYObe6w__',
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