import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useNotificationStore from '../store/notificationStore';
import { Divider, Heading } from '@gluestack-ui/themed';
import { fetchNotificationsByUserId, formatDateToString } from '../services/notificationService';
import { useQuery } from '@tanstack/react-query';
import NotificationCard from './NotificationCard';
import { useState } from 'react';

const NotificationsList = ({ userId, navigation }) => {

    const {notifications} = useNotificationStore()
    const [filteredNotifications, setFilteredNotifications] = useState([]);

    useEffect(() => {

        const today = new Date();

        // Filter notifications that haven't been sent yet
        const filtered = notifications.filter(notification => {
            const sentAtDate = new Date(notification.sent_at);
            return sentAtDate <= today;
        });

        setFilteredNotifications(filtered);
    }, [notifications]);
    

    return (
        <FlatList
            data={filteredNotifications}
            renderItem={({ item }) => (
                <>
                    <NotificationCard notification={item} navigation={navigation} userId={userId} />
                    <Divider style={styles.divider}/>
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
    divider: {
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    flatlist: {
        width: "100%",
    },
    flatlistContent: {
        paddingHorizontal: 0,
    },
});
