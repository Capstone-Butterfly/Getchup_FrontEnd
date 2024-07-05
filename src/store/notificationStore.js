
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

  // Fetch notifications by user ID
  userNotifications: [],
  setUserNotifications: (notifications) => set({ userNotifications: notifications }),
  fetchNotificationsByUserId: async (userId) => {
    const notifications = await fetchNotificationsByUserId(userId);
    set({ userNotifications: notifications });
  },

  //notification popover in the header:
  isOpen: false,
  openPopover: () => set({ isOpen: true }),
  closePopover: () => set({ isOpen: false }),
}));

export default useNotificationStore;
