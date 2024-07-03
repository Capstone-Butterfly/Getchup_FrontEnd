import create from 'zustand';

const useGreetingStore = create((set) => ({
    greeting: '',
    setGreeting: (greeting) => set({ greeting }),
}));

export default useGreetingStore;
