
import { create } from 'zustand';
import { getUnreadNotifications } from '../services/notificationService';

const useNotificationStore = create(set => ({
  expoPushToken: '',
  setExpoPushToken: (token) => set({ expoPushToken: token }),
  channels: [],
  setChannels: (channels) => set({ channels }),
  notification: undefined,
  setNotification: (notification) => set({ notification }),

  //unread notifications from the notification tray:
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  fetchNotifications: async () => {
    const notifications = await getUnreadNotifications();
    set({ notifications });
  },

  //notification popover in the header:
  isOpen: false,
  openPopover: () => set({ isOpen: true }),
  closePopover: () => set({ isOpen: false }),
}));

export default useNotificationStore;
