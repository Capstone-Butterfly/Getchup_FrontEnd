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

  const fetchUserPushToken = async (userId) => {
    try {
      const response = await axios.get(`${base_url}/getUserDetails/${userId}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch user push token');
      }

      const push_token = response.data.user.push_token
      console.log(response.data.user.push_token);
      return push_token;
    } catch (error) {
      console.error('Error fetching user push token:', error);
    }
  };

  const sendNotification = async (userId) => {
    try {
      const pushToken = await fetchUserPushToken(userId);
      console.log('Sending push notification...');

      const message = {
        to: pushToken,
        sound: 'default',
        title: 'My first push notification',
        body: 'This is my first push notification made with expo',
      };

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          host: 'exp.host',
          accept: 'application/json',
          'accept-encoding': 'gzip, deflate',
          'content-type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

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

    if (Platform.OS === 'ios') {
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
    }

    if (Device.isDevice) {
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
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

export { fetchUserPushToken, sendNotification, registerForPushNotificationsAsync };
