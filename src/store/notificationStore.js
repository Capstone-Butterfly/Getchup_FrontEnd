
import { create } from 'zustand';

export const usePushTokenStore = create((set) => ({
    expoPushToken: '',
    setExpoPushToken: (token) => set({ expoPushToken: token }),
  }));

// const useFetchTasks = userId => {
//     const setTasks = useTaskStore(state => state.setTasks);
//     return useQuery(['tasks', userId], () => fetchTasks(userId), {
//         onSuccess: data => setTasks(data),
//     });
// };

export {usePushTokenStore};
