import React, {useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import useNotificationStore from '../store/notificationStore';
import { Heading } from '@gluestack-ui/themed';

const NotificationsList = () => {
    const { notifications, fetchNotifications } = useNotificationStore();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const renderItem = ({ item }) => (
        <View key={item.request.identifier} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Heading>{item.request.content.title}</Heading>
            <Text>{item.request.content.body}</Text>
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
