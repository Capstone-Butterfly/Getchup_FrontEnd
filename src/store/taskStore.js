import {create} from 'zustand';
import axios from 'axios';

const useTaskStore = create((set) => ({
    tasks: [],
    loading: true,
    error: null,
    selectedDate: new Date(),
    fetchTasks: async (userId) => {
        try {
            const response = await axios.get('http://52.55.48.104:8080/api/v1/tasks');
            const userTasks = response.data.filter(task => task.user_id === userId);
            set({ tasks: userTasks, loading: false, error: null });
        } catch (error) {
            set({ error, loading: false });
        }
    },
    setSelectedDate: (date) => set({ selectedDate: date })
}));

export default useTaskStore;
