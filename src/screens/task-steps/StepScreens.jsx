import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, ButtonText, HStack, Image } from '@gluestack-ui/themed';
import { updateTaskStartTime, updateTaskEndTime, pauseTask, manualCompleteTask } from '../../services/tasks';
import { defaultStyles } from '../../styles/styles';
import { config } from '../../styles/themeConfig';
import FirstStepSVG from '../../../assets/illustrations/1-first-step.svg';
import BetweenStepSVG from '../../../assets/illustrations/2-between-step.svg';
import LastStepSVG from '../../../assets/illustrations/3-last-step.svg';
import useTaskStore from '../../store/taskStore';
import queryClient from '../../services/QueryClient';
import { useMutation } from '@tanstack/react-query';

const StepScreen = ({ route, stepNumber, stepDescription, totalSteps, taskSubtasks, task, setCurrentStep, navigation, navigateToNextStep, musicPlayerRef, handleFlagChange }) => {
    const [isTaskStarted, setIsTaskStarted] = useState(false);
    const [isTaskCompleted, setIsTaskCompleted] = useState(false);
    const [isMovementEnabled, setIsMovementEnabled] = useState(false);
    const [isAlertShown, setIsAlertShown] = useState(false);
    const [showCompletionScreen, setShowCompletionScreen] = useState(false);
    const updateDataTask = useTaskStore(state => state.updateDataTask); 

    const { isTaskInProgress, setIsTaskInProgress } = useTaskStore();

    const toggleFlag = () => {
        handleFlagChange(false);
    };

    const updateTaskStatusMutation = useMutation({
        mutationFn: async (task) => await manualCompleteTask(task._id),
        onSuccess: async () => {
            queryClient.invalidateQueries(['tasks']); 
            console.log("update task: ", task);
            updateDataTask(task); 
            
        },
    });

    const handleBackToHome = async () => {
        try{
        if (musicPlayerRef.current) {
            musicPlayerRef.current.stopMusic(); 
        }
        navigation.navigate('HomeScreen'); 
        console.log("calling the mutation now: ");
            await updateTaskStatusMutation.mutateAsync(task);}
            catch (error) {
                console.error("Error marking task and subtasks as completed:", error);
            }
    };

    const extractMinutes = (timeString) => {
        const match = timeString.match(/\d+/);
        return match ? `${match[0]} min.` : timeString;
    };

    const handlePauseTask = async () => {
        try {
            const subtaskIndex = stepNumber - 1;
            const currentTimestamp = Date.now();
            if (!isTaskInProgress) {
                setIsTaskInProgress(true);
                const MAIN_STATUS = "progress";
                const STATUS = "progress";
                await pauseTask(task._id, currentTimestamp, MAIN_STATUS, STATUS, subtaskIndex);
            } else {
                setIsTaskInProgress(false);
                const MAIN_STATUS = "pause";
                const STATUS = "pause";
                await pauseTask(task._id, currentTimestamp, MAIN_STATUS, STATUS, subtaskIndex);
            }
        } catch (error) {
            console.error('Error pausing/resuming task:', error);
            setIsTaskInProgress(!isTaskInProgress);
        }
    };

    const toggleTaskStatus = async () => {
        try {
            const subtaskIndex = stepNumber - 1;
            const currentTimestamp = Date.now();
            const currentDateTime = new Date().toISOString();
    
            if (!isTaskInProgress) {
                setIsTaskInProgress(true);
                setIsTaskStarted(true);
    
                const start_date = currentDateTime;
                const mainTaskStartTime = currentTimestamp;
                const subtaskStartTime = currentTimestamp;
                const MAIN_STATUS = "progress";
                const STATUS = "progress";
    
                await updateTaskStartTime(task._id, start_date, mainTaskStartTime, subtaskStartTime, MAIN_STATUS, STATUS, subtaskIndex);
                if (task.movement_tracking && taskSubtasks[subtaskIndex].movement) {
                    setIsMovementEnabled(true);
                    console.log("Movement is enebled for the task");
                }
            } else {
                setIsTaskInProgress(false);
    
                const mainTaskEndTime = currentTimestamp;
                const subtaskEndTime = currentTimestamp;
                let MAIN_STATUS = "progress";
                let STATUS = "complete";
    
                if (stepNumber === totalSteps) {
                    setIsTaskCompleted(true);
                    MAIN_STATUS = "complete";
                    STATUS = "complete";
                    toggleFlag();
                }
    
                await updateTaskEndTime(task._id, mainTaskEndTime, subtaskEndTime, MAIN_STATUS, STATUS, subtaskIndex, stepNumber === totalSteps);
    
                if (stepNumber === totalSteps && isTaskCompleted) {
                    setShowCompletionScreen(true);
                } else {
                    navigateToNextStep();
                }
                setIsMovementEnabled(false);
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            setIsTaskInProgress(!isTaskInProgress); 
        }
    };

    const toggleMovementSwitch = () => {
        setIsMovementEnabled(previousState => !previousState);
    };

    const renderIllustration = () => {
        if (stepNumber === 1) {
            return <FirstStepSVG style={styles.icon} />;
        } else if (stepNumber < totalSteps) {
            return <BetweenStepSVG style={styles.icon} />;
        } else if (stepNumber === totalSteps) {
            return <LastStepSVG style={styles.icon} />;
        }
    };

    return (
        <View style={styles.mainCard}>
            {!isTaskCompleted ? (
                <View style={[styles.stepInfo, defaultStyles.card]}>
                    <HStack style={styles.hStack}>
                        <Text style={[styles.boldText, defaultStyles.TypographyBodyHeavy]}>Step {stepNumber}/{totalSteps}:</Text>
                        <Text style={[styles.boldText, defaultStyles.TypographyBodyHeavy]}>{extractMinutes(taskSubtasks[stepNumber - 1].time)}</Text>
                    </HStack>
                    <Text style={defaultStyles.TypographyH2}>{stepDescription}</Text>
                    {renderIllustration()}
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handlePauseTask} style={styles.button}>
                            <Text style={styles.buttonText}>{isTaskInProgress ? 'Pause' : 'Resume'}</Text>
                        </TouchableOpacity>
                        
                        <Button
                            onPress={toggleTaskStatus}
                            isDisabled={!isTaskStarted && isTaskInProgress}
                            style={[
                                styles.button,
                                { backgroundColor: isTaskInProgress ? config.tokens.colors.primaryDark : config.tokens.colors.brandingAccent }
                            ]}
                        >
                            {isTaskInProgress ? 
                                <ButtonText style={[defaultStyles.TypographyBodyHeavy, styles.buttonText]}>Done</ButtonText> 
                                : <ButtonText style={[defaultStyles.TypographyBodyHeavy, styles.buttonText, { color: config.tokens.colors.white }]}>Start</ButtonText>
                            }
                        </Button>
                        
                        <TouchableOpacity onPress={navigateToNextStep} style={styles.button}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={[styles.stepInfo, defaultStyles.card]}>
                    <Text style={[styles.boldText, defaultStyles.TypographyH2]}>{task.title} completed!</Text>
                    <Image source={require('../../../assets/illustrations/congrats.gif')} style={styles.image} alt="" />
                    <Button onPress={handleBackToHome} style={defaultStyles.buttonVariant3}>
                        <ButtonText style={{color: config.tokens.colors.primaryDark}}>Back to Home</ButtonText>
                    </Button>
                </View>
            )}

            
        </View>
    );
};

const styles = StyleSheet.create({
    mainCard: {
        marginHorizontal: 20
    },
    boldText: {
        textAlign:'center',
        color: config.tokens.colors.black,
        marginBottom: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    hStack: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 8,
    },
    icon: {
        width: 121.01,
        height: 200,
        alignSelf: 'center',
        marginVertical: 24,
    },
    image: {
        width: 200,
        height: 150,
        marginBottom: 16,
        alignSelf:'center'
    },
    
});

export default StepScreen;
