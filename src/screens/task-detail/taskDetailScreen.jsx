import { Button, ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskDetails from '../../components/TaskDetails';
import Subtasks from '../../components/Subtasks';

const TaskDetailScreen = ({ route, navigation }) => {
    const { task } = route.params;

    return (
        <View style={styles.container}>
            <TaskDetails task={task} />
            <Subtasks subtasks={task.subtask} />
            <Button style={styles.focusButton} onPress={() => navigation.navigate('FocusModeScreen', { task })}>
                <ButtonText style={styles.buttonText}>Start Focus Mode</ButtonText>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    focusButton: {
        backgroundColor: '#2E7D32',
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TaskDetailScreen;

