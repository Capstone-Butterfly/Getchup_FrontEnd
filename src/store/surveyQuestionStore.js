import { create } from "zustand";

const surveyQuestionStore = create((set) => ({
  answers: [],
  currentQuestion: 0,
  setAnswers: (answers) => set({ answers }),
  setCurrentQuestion: (currentQuestion) => set({ currentQuestion  }),
}));

export default surveyQuestionStore;