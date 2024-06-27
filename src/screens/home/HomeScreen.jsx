
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Platform } from 'react-native';
import Header from '../../components/Header';
import Greeting from '../../components/Greeting';
import WeeklyCalendar from '../../components/WeeklyCalendar2';
import { useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, scheduleNotification, cancelNotification, getUnreadNotifications } from '../../services/notificationService';
import useNotificationStore from '../../store/notificationStore';

const userId = '6668b7f95dbce97bc28322d2';

// const task = {
//     title: 'Task test - title',
//     body: 'Task test - body',
//     trigger: 5,
//     notificationId: '5f374f5e-08c8-4976-9e66-fdbf3b48a7aa'
// }

const HomeScreen = ({ navigation }) => {

    const { expoPushToken, setExpoPushToken, channels, setChannels, notification, setNotification } = useNotificationStore();
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            console.log(notification)
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
        <SafeAreaView style={styles.container}>
            <Header />
            <Greeting />
            <WeeklyCalendar userId={userId} navigation={navigation}/>
            {/* <Button title="Schedule notification" onPress={async () => { await scheduleNotification(task); }} /> */}
            {/* <Button title="Cancel notification" onPress={async () => { await cancelNotification(task); }} /> */}
            {/* <Button title="Get unread notifications" onPress={async () => { await getUnreadNotifications(); }} /> */}

        </SafeAreaView>
    );
};



export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});