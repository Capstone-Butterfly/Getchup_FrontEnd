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

function convertToSecondsFromNow(start_date, start_time) {
    const startDate = new Date(`${start_date}T${start_time}`);
    const now = Date.now();
    const intervalInSeconds = Math.floor((startDate - now) / 1000);
    return intervalInSeconds;
}

async function scheduleNotification(task) {

    const interval = convertToSecondsFromNow(task.start_date, task.start_time)

    console.log('interval:', interval)
    let defaultTrigger = 45 * 60 // 45 minutes

    let trigger;

    if (interval <= defaultTrigger) { //if start time is more than 45 minutes away
        trigger = 10
    } else {
        trigger = interval - defaultTrigger // if more than 45 minutes, set reminder for 45 minutes before task starts
    }

    try {
        const notificationContent = {
            title: 'Reminder!',
            body: `${task.title} at ${task.start_time}`,
        };

        // Schedule notification using Expo Notifications module
        const identifier = await Notifications.scheduleNotificationAsync({
            content: notificationContent,
            trigger: { seconds: trigger },
        });

        console.log('Notification scheduled with ID:', identifier);
        return identifier;
    } catch (error) {
        console.error('Error scheduling notification:', error);
        throw error; // Propagate the error further if needed
    }
}

async function cancelNotification(identifier) {

    await Notifications.cancelScheduledNotificationAsync(identifier).then(

        console.log('notification cancelled')
    )
}

const fetchNotificationsByUserId = async (userId) => {
    console.log("fetch notifications from axios!!!");
    const { data } = await axios.get(`${base_url}/notifications/user/${userId}`);
    return data;
};

const saveNotification = async (newNotification) => {
    try {
      const { data } = await axios.post(`${base_url}/notifications/`, newNotification);
      return data;
    } catch (error) {
      console.error("Error adding notification:", error);
      throw error;
    }
  };

async function getUnreadNotifications() { //fetches from the notification tray
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

export { registerForPushNotificationsAsync, scheduleNotification, cancelNotification, saveNotification, getUnreadNotifications, formatNotificationDate, fetchNotificationsByUserId };
