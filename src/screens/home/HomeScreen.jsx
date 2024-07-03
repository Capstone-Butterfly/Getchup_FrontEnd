
import React, { useState, useEffect } from 'react';
import { Button, Text, View, Platform } from 'react-native';
import Header from '../../components/Header';
import Greeting from '../../components/Greeting';
import WeeklyCalendar from '../../components/WeeklyCalendar2';
import { useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, scheduleNotification, cancelNotification, getUnreadNotifications } from '../../services/notificationService';
import useNotificationStore from '../../store/notificationStore';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const userId = '6668b7f95dbce97bc28322d2';

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

        </SafeAreaView>
    );
};



export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});