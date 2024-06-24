import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskCard = ({ task, navigation }) => {
    return (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('TaskDetailScreen', { task })}
        >
            <Text>{task.title}</Text>
            <Text>{new Date(task.created_datetime).toLocaleString()}</Text>
            <Text>Total Subtasks: {task.subtask.length}</Text>
            <Text>Completed Subtasks: {task.subtask.filter(subtask => subtask.status === 'complete').length}</Text>
        </TouchableOpacity>
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
