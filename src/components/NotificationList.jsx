import React from 'react';
import { View, Text, FlatList } from 'react-native';
import useNotificationsStore from '../store/notificationsStore';

const NotificationsList = () => {
    const notifications = useNotificationsStore((state) => state.notifications);

    const renderItem = ({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>Date: {new Date(item.date).toLocaleString()}</Text>
            <Text>Identifier: {item.request.identifier}</Text>
            <Text>Message: {item.request.content.body}</Text>
        </View>
    );

    return (
        <FlatList
            data={notifications}
            keyExtractor={(item) => item.request.identifier}
            renderItem={renderItem}
        />
    );
};

export default NotificationsList;
