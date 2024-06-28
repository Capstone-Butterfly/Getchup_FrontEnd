import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConvertTimeStamp from '../utils/ConvertTimeStamp';

const TaskCard = ({ task, navigation }) => {
    const formatEstimateStartTime = (time) => {
        if (time === 0 || time === null) {
            return '';
        }
        return ConvertTimeStamp.convertMillisecondsToTimeString(time);
    };
    return (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('TaskDetailScreen', { task })}
        >
            <Text>{task.title}</Text>
            {/* <Text>{new Date(task.estimate_start_date).toLocaleString('en-CA').split(',')[0]} {ConvertTimeStamp.convertMillisecondsToTimeString(task.estimate_start_time)}</Text> */}
            {/* <Text>{task.estimate_start_date.split('T')[0]} {ConvertTimeStamp.convertMillisecondsToTimeString(task.estimate_start_time)}</Text> */}
            <Text>{task.estimate_start_date.split('T')[0]} {formatEstimateStartTime(task.estimate_start_time)}</Text>
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
