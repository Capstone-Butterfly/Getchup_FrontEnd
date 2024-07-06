import React, { useState, useEffect } from 'react';
import { Button, Text, View, Platform, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Greeting from '../../components/Greeting';
import WeeklyCalendar from '../../components/WeeklyCalendar';
import { useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, scheduleNotification, cancelNotification, getUnreadNotifications } from '../../services/notificationService';
import useNotificationStore from '../../store/notificationStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import profileStore from '../../store/profileStore';
import { ImageBackground } from '@gluestack-ui/themed';

const image = require('../../../assets/background/background.png');

const HomeScreen = ({ navigation }) => {
    const { expoPushToken, setExpoPushToken, channels, setChannels, notification, setNotification } = useNotificationStore();
    const notificationListener = useRef();
    const responseListener = useRef();

    const { first_name, userId } = profileStore((state) => ({
        first_name: state.first_name,
        userId: state.userId
    }));

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
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Header />
                <Greeting name={first_name} />
                <View style={styles.calendarContainer}>
                    <WeeklyCalendar userId={userId} navigation={navigation} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    calendarContainer: {
        flex: 1,
    },
});
