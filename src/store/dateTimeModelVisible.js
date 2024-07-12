import {create} from 'zustand';

const useDateTimeModelVisibleStore = create((set) => ({
    isAnyModalVisible: false,
    setIsAnyModalVisible: (value) => set({ isAnyModalVisible :value }),
}));

export default useDateTimeModelVisibleStore;
