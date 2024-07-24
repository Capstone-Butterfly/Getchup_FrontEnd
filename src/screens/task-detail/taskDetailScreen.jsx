import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonText, ImageBackground, SafeAreaView } from '@gluestack-ui/themed';
import TaskDetails from '../../components/TaskDetails';
import Subtasks from '../../components/Subtasks';
import { manualCompleteTask, markSubtaskAsComplete } from '../../services/tasks';
import useTaskStore from '../../store/taskStore'; 
import { config } from '../../styles/themeConfig';
import { defaultStyles } from '../../styles/styles';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../../services/QueryClient';
import { ScrollView } from 'react-native-gesture-handler';


const image = require('../../../assets/background/background.png');

const TaskDetailScreen = ({ route, navigation }) => {
    const { task } = route.params;
    const [subtaskList, setSubtaskList] = useState(task.subtask);
    const updateDataTask = useTaskStore(state => state.updateDataTask);

    useEffect(() => {
        setSubtaskList(task.subtask);
    }, [task.subtask]);

    const updateTaskStatusMutation = useMutation({
        mutationFn: async (task) => await manualCompleteTask(task._id),
        onSuccess: async () => {
            queryClient.invalidateQueries(['tasks']); 
            console.log("uodate task: ", task);
            updateDataTask(task); 
        },
    });

    const handleMarkAsCompleted = async () => {
        try {
            console.log("calling the mutation now: ");
            await updateTaskStatusMutation.mutateAsync(task);
            const updatedSubtasks = subtaskList.map((subtask) => ({
                ...subtask,
                status: 'complete',
                end_time: new Date().getTime() 
            }));

            setSubtaskList(updatedSubtasks);

            await Promise.all(updatedSubtasks.map((subtask, index) =>
                markSubtaskAsComplete(
                    task._id,
                    subtask.end_time,
                    'complete',
                    index,
                    updatedSubtasks.length
                )
            ));

            updateDataTask({
                ...task,
                status: 'complete',
                subtasks: updatedSubtasks
            });

            console.log("Task and subtasks marked as completed");
        } catch (error) {
            console.error("Error marking task and subtasks as completed:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
                <ScrollView>
                    <View style={styles.container}>
                        <TaskDetails task={task} />
                        <Subtasks subtasks={subtaskList} taskId={task._id} />
                        <Button style={[styles.focusButton, defaultStyles.ButtonDefault]} onPress={() => navigation.navigate('FocusModeScreen', { task })}>
                            <ButtonText style={[styles.defaultButtonText, defaultStyles.TypographyBodyHeavy]}>Start Focus Mode</ButtonText>
                        </Button>
                        <Button style={[styles.completeButton, defaultStyles.buttonVariant3]} onPress={handleMarkAsCompleted}>
                            <ButtonText style={[styles.buttonText, defaultStyles.TypographyBodyHeavy]}>Mark as Completed</ButtonText>
                        </Button>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: 0,
    },
    imageBackground: {
        flex: 1,
    },
    container: {
        padding: 20,
    },
    focusButton: {
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    completeButton: {
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 16,
    },
    defaultButtonText: {
        color: config.tokens.colors.white,
    },
    buttonText: {
        color: config.tokens.colors.primaryDark,
    },
});

export default TaskDetailScreen;
