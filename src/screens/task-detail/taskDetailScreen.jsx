import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonText, ImageBackground, SafeAreaView } from '@gluestack-ui/themed';
import TaskDetails from '../../components/TaskDetails';
import Subtasks from '../../components/Subtasks';
import { manualCompleteTask, markSubtaskAsComplete } from '../../services/tasks';
import { config } from '../../styles/themeConfig';
import { defaultStyles } from '../../styles/styles';

const image = require('../../../assets/background/background.png');

const TaskDetailScreen = ({ route, navigation }) => {
    const { task } = route.params;
    const [subtaskList, setSubtaskList] = useState(task.subtask);

    useEffect(() => {
        setSubtaskList(task.subtask);
    }, [task.subtask]);

    const handleMarkAsCompleted = async () => {
        try {
            await manualCompleteTask(task._id);

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

            console.log("Task and subtasks marked as completed");
        } catch (error) {
            console.error("Error marking task and subtasks as completed:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
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
        marginTop: 10,
    },
    completeButton: {
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    defaultButtonText: {
        color: config.tokens.colors.white,
       
    },
    buttonText: {
       color: config.tokens.colors.primaryDark,
    },
});

export default TaskDetailScreen;
