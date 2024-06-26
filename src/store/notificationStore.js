
import { create } from 'zustand';

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

  //notification popover in the header:
  isPopoverOpen: false,
  openPopover: () => set({ isPopoverOpen: true }),
  closePopover: () => set({ isPopoverOpen: false }),
}));

export default useNotificationStore;
