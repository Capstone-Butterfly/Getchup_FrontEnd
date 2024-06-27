import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';
import { Platform } from 'react-native';

const base_url = BASE_URL;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function scheduleNotification(task) {
    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: task.title,
            body: 'Let\'s start this task',
        },
        trigger: { seconds: convertToSeconds(task.start_date) },
    });
    
    console.log(notificationId)
    return notificationId
}

async function cancelNotification(notificationId) {

    await Notifications.cancelScheduledNotificationAsync(notificationId).then(

        console.log('notification cancelled')
    )
}

async function saveNotification(newNotification) {
    try {
      const { data } = await axios.post(`${base_url}/notifications/`, newNotification);
      return data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  async function getUnreadNotifications() {
    try {
        const notifications = await Notifications.getPresentedNotificationsAsync();
        console.log('Presented Notifications:', notifications);
        return notifications;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return []
    }
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            // console.log(token);
        } catch (e) {
            token = `${e}`;
        }
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

const formatNotificationDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const convertToSeconds = (timestamp) => {
    const targetDate = new Date(timestamp);
    const now = new Date();
    const differenceInMilliseconds = targetDate - now;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    return differenceInSeconds;
}

export { registerForPushNotificationsAsync, scheduleNotification, cancelNotification, saveNotification, getUnreadNotifications, formatNotificationDate };
