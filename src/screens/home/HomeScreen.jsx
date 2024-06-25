import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, Text, View, Platform } from 'react-native';
import Header from '../../components/Header';
import Greeting from '../../components/Greeting';
import WeeklyCalendar from '../../components/WeeklyCalendar2';
import { registerForPushNotificationsAsync, sendNotification } from '../../services/notificationService';
import { BASE_URL } from '../../config/apiConfig';

const userId = '667a15822ecae2cb2e981c78';
const base_url = BASE_URL

const HomeScreen = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    console.log('Registering for push notifications');
    registerForPushNotificationsAsync().then(token => {
      console.log('token: ', token);
      setExpoPushToken(token);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  registerForPushNotificationsAsync()

  return (
    <SafeAreaView>
      <Header />
      <Greeting />
      <WeeklyCalendar userId={userId} />
      <Button title="Send push notification" onPress={() => sendNotification(userId)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
