import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { Button, ButtonText, Image } from '@gluestack-ui/themed';
import { Accelerometer } from 'expo-sensors';
import { updateTaskStartTime, updateTaskEndTime, pauseTask } from '../../services/tasks';
import { useNavigation } from '@react-navigation/native';

const StepScreen = ({ route }) => {
    const navigation = useNavigation();
    const [isTaskInProgress, setIsTaskInProgress] = useState(false);
    const [isTaskCompleted, setIsTaskCompleted] = useState(false);
    const [isTaskStarted, setIsTaskStarted] = useState(false); // Track if the task has started
    const { stepNumber, stepDescription, imageSource, imageAlt, totalSteps, taskSubtasks, task } = route.params;

    const hasNextStep = (currentStep, totalSteps) => currentStep < totalSteps;
    const hasPreviousStep = (currentStep) => currentStep > 1;

    const [isMusicEnabled, setIsMusicEnabled] = useState(false);
    const [isMovementEnabled, setIsMovementEnabled] = useState(false);
    const [isAlertShown, setIsAlertShown] = useState(false);

    const toggleMusicSwitch = () => setIsMusicEnabled(previousState => !previousState);
    const toggleMovementSwitch = () => setIsMovementEnabled(previousState => !previousState);

    useEffect(() => {
        let subscription;

        if (isTaskInProgress && isMovementEnabled) {
            console.log("movement tracking is started");
            subscription = Accelerometer.addListener(accelerometerData => {
                const accelerationMagnitude = Math.sqrt(
                    accelerometerData.x * accelerometerData.x +
                    accelerometerData.y * accelerometerData.y +
                    accelerometerData.z * accelerometerData.z
                );

                const movementThreshold = 1.5;

                if (accelerationMagnitude > movementThreshold && !isAlertShown) {
                    setIsAlertShown(true);
                    Alert.alert('Reminder', 'Please take a moment to calm down and refocus on the task.', [
                        { text: 'OK', onPress: () => setIsAlertShown(false) }
                    ]);
                    setTimeout(() => setIsAlertShown(false), 1000);
                }
            });
        }

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [isTaskInProgress, isMovementEnabled, isAlertShown]);

    const handlePauseTask = async () => {
        try {
            const subtaskIndex = stepNumber - 1;
            const currentTimestamp = Date.now();

            if (!isTaskInProgress) {
                // Resume Task
                setIsTaskInProgress(true);
                const MAIN_STATUS = "progress";
                const STATUS = "progress";

                await pauseTask(task._id, currentTimestamp, MAIN_STATUS, STATUS, subtaskIndex);
            } else {
                // Pause Task
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
                // Start Task
                setIsTaskInProgress(true);
                setIsTaskStarted(true);
                const start_date = currentDateTime;
                const mainTaskStartTime = currentTimestamp;
                const subtaskStartTime = currentTimestamp;
                const MAIN_STATUS = "progress";
                const STATUS = "progress";

                await updateTaskStartTime(task._id, start_date, mainTaskStartTime, subtaskStartTime, MAIN_STATUS, STATUS, subtaskIndex);
            } else {
                // Stop Task
                setIsTaskInProgress(false);
                const mainTaskEndTime = currentTimestamp;
                const subtaskEndTime = currentTimestamp;
                let MAIN_STATUS = "progress";
                let STATUS = "complete";

                if (stepNumber === totalSteps) {
                    setIsTaskCompleted(true); 
                    MAIN_STATUS = "complete";
                    STATUS = "complete";
                }
                await updateTaskEndTime(task._id, mainTaskEndTime, subtaskEndTime, MAIN_STATUS, STATUS, subtaskIndex, stepNumber === totalSteps);
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            setIsTaskInProgress(false);
        }
    };

    const handleBackToHome = () => {
        navigation.navigate('HomeScreen'); 
    };

    const navigateToNextStep = () => {
        const nextStepNumber = stepNumber + 1;
        navigation.navigate(`Step ${nextStepNumber}`);
    };

    return (
        <View style={styles.container}>
            {hasPreviousStep(stepNumber) && (
                <View style={[styles.stepInfo, styles.card]}>
                    <Text style={styles.boldText}>Previous Step:</Text>
                    <Text>{taskSubtasks[stepNumber - 2].sub_title}</Text>
                </View>
            )}

            {!isTaskCompleted ? (
                <View style={[styles.stepInfo, styles.card]}>
                    <Text style={styles.boldText}>Step {stepNumber}:</Text>
                    <Text>{stepDescription}</Text>
                    <View style={styles.imgAndButton}>
                        {imageSource && (
                            <View style={styles.imageContainer}>
                                <Image source={imageSource} style={styles.image} accessibilityLabel={imageAlt} alt={imageAlt} />
                            </View>
                        )}
                        <View style={styles.buttonContainer}>
                            {isTaskStarted && ( 
                                <Button style={styles.buttonColumn} onPress={handlePauseTask}>
                                    <ButtonText style={styles.smallButtonText}>{isTaskInProgress ? 'Pause' : 'Resume'}</ButtonText>
                                </Button>
                            )}
                            <Button
                                onPress={toggleTaskStatus}
                                style={[styles.circularButton, { backgroundColor: isTaskInProgress ? 'red' : 'green' }, styles.buttonColumn]}
                            >
                                <ButtonText>
                                    {isTaskInProgress ? 'Done' : 'Start'}
                                </ButtonText>
                            </Button>
                            
                            {hasNextStep(stepNumber, totalSteps) && (
                                <Button style={styles.buttonColumn} onPress={navigateToNextStep} >
                                    <ButtonText style={styles.smallButtonText}>
                                        Next
                                    </ButtonText>
                                </Button>
                            )}
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.congratulationsContainer}>
                    <View style={[styles.stepInfo, styles.card]}>
                        <Text style={styles.boldText}>Congratulations!</Text>
                        <Text>You have accomplished the task.</Text>
                    </View>
                    <Button onPress={handleBackToHome}>
                        <ButtonText>Back To Home</ButtonText>
                    </Button>
                </View>
            )}

            {hasNextStep(stepNumber, totalSteps) && (
                <View style={[styles.stepInfo, styles.card]}>
                    <Text style={styles.boldText}>Next Step:</Text>
                    <Text>{taskSubtasks[stepNumber].sub_title}</Text>
                </View>
            )}

            {!isTaskCompleted && (
                <View style={styles.toggleContainer}>
                    <View style={[styles.toggleColumn, styles.card]}>
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleLabel}>Music</Text>
                            <Switch
                                onValueChange={toggleMusicSwitch}
                                value={isMusicEnabled}
                            />
                        </View>
                    </View>
                    <View style={[styles.toggleColumn, styles.card]}>
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleLabel}>Movement</Text>
                            <Switch
                                onValueChange={toggleMovementSwitch}
                                value={isMovementEnabled}
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    stepInfo: {
        marginBottom: 20,
    },
    boldText: {
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    imgAndButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    toggleColumn: {
        flex: 1,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleLabel: {
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonColumn: {
        flex: 1,
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'transparent'
    },
    congratulationsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallButtonText: {
        fontSize: 14,  
    },
});

export default StepScreen;
