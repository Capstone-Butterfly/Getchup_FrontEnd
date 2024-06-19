import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskCard = ({ title, created_datetime, totalSubtasks, completedSubtasks }) => {
    return (
        <View style={styles.card}>
            <Text>{title}</Text>
            <Text>{new Date(created_datetime).toLocaleString()}</Text>
            <Text>Total Subtasks: {totalSubtasks}</Text>
            <Text>Completed Subtasks: {completedSubtasks}</Text>
        </View>
    );
};

export default TaskCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        elevation: 3,
    },
});
