
import { create } from 'zustand';
import { getUnreadNotifications } from '../services/notificationService';
import { getSortedNotificationsByUserId } from '../services/notificationService';

const useNotificationStore = create(set => ({

	//push notifications:
	expoPushToken: '',
	setExpoPushToken: (token) => set({ expoPushToken: token }),
	channels: [],
	setChannels: (channels) => set({ channels }),
	notification: undefined,
	setNotification: (notification) => set({ notification }),

	//define notifications array and setter
	notifications: [],
	setNotifications: (notifications) => set({ notifications }),

	//unread notifications from the notification tray:
	fetchNotificationsFromTray: async () => {
		const notifications = await getUnreadNotificationsFromTray();
		set({ notifications });
	},

	refetchNotifications: async (userId) => {
        const notifications = await getSortedNotificationsByUserId(userId);
        set({ notifications });
    },

	//notification popover in the header:
	isOpen: false,
	openPopover: () => set({ isOpen: true }),
	closePopover: () => set({ isOpen: false }),
}));

export default useNotificationStore;
