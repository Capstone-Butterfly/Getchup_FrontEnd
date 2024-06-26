import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, Text, View, Platform } from 'react-native';
import Header from '../../components/Header';
import Greeting from '../../components/Greeting';
import WeeklyCalendar from '../../components/WeeklyCalendar2';
import { BASE_URL } from '../../config/apiConfig';
import { useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, schedulePushNotification } from '../../services/notificationService';

const userId = '6668b7f95dbce97bc28322d2';
const base_url = BASE_URL

const trigger = 2;

const HomeScreen = ({ navigation }) => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState([]);
    const [notification, setNotification] = useState(undefined);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    return (
        <SafeAreaView>
            <Header />
            <Greeting />
            <WeeklyCalendar userId={userId} />
            <Button title="Send push notification" onPress={async () => { await schedulePushNotification('Hello there', 'General Kenobi', trigger); }} />
        </SafeAreaView>
    );
};



export default HomeScreen;
