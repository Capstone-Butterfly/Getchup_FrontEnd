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
import { ImageBackground, FlatList } from '@gluestack-ui/themed';

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

    const data = [
        { key: 'header', component: <Header userId={userId}/> },
        { key: 'greeting', component: <Greeting name={first_name} /> },
        { key: 'calendar', component: <WeeklyCalendar userId={userId} navigation={navigation} /> },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => item.component}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={styles.listContainer}
                />
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
    listContainer: {
        flexGrow: 1,
    },
});
