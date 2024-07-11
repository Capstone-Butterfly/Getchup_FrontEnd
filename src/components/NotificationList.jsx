import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useNotificationStore from '../store/notificationStore';
import { Divider, Heading } from '@gluestack-ui/themed';
import { fetchNotificationsByUserId, formatDateToString } from '../services/notificationService';
import { useQuery } from '@tanstack/react-query';
import NotificationCard from './NotificationCard';

const NotificationsList = ({ userId, navigation }) => {
    // const { notifications, setNotifications } = useNotificationStore((state) => ({
    //     notifications: state.notifications,
    //     setNotifications: state.setNotifications
    // }));

    // const { data: fetchedNotification, isLoading, error, refetch } = useQuery({
    //     queryKey: ['notifications', userId],
    //     queryFn: () => fetchNotificationsByUserId(userId),
    //     refetchOnMount: true,
    //     refetchOnReconnect: true,
    // });

    // useEffect(() => {
    //     if (fetchedNotification) {
    //         setNotifications(fetchedNotification);
    //     }
    // }, [fetchedNotification]);

    const {notifications} = useNotificationStore()

    return (
        <FlatList
            data={notifications}
            renderItem={({ item }) => (
                <>
                    <NotificationCard notification={item} navigation={navigation} userId={userId} />
                    <Divider />
                </>
            )}
            keyExtractor={(item) => item.identifier}
            style={styles.flatlist}
            contentContainerStyle={styles.flatlistContent}
            nestedScrollEnabled={true}
            scrollEnabled={false}
        />
    );
};

export default NotificationsList;

const styles = StyleSheet.create({
    flatlist: {
        width: "100%",
    },
    flatlistContent: {
        paddingHorizontal: 0, // Ensure no horizontal padding
    },
});
