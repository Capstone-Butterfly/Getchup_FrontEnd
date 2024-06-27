import React, {useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import useNotificationStore from '../store/notificationStore';
import { Heading } from '@gluestack-ui/themed';
// import { getUnreadNotifications } from '../services/notificationService';

import { formatNotificationDate } from '../services/notificationService';

const NotificationsList = () => {
    const { notifications, fetchNotifications } = useNotificationStore();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const renderItem = ({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            {/* <Text>Date: {new Date(item.date).toLocaleString()}</Text> */}
            <Heading>{item.request.content.title}</Heading>
            <Text>{item.request.content.body}</Text>
            <Text>{formatNotificationDate(item.date)}</Text>
            {/* <Text>Message: {item.request.content.body}</Text> */}
        </View>
    );

    return (
        <FlatList
            data={notifications}
            keyExtractor={(item) => item.request.content.identifier}
            renderItem={renderItem}
        />
    );
};

export default NotificationsList;
