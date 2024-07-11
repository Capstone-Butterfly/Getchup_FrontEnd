import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { Button, ButtonText, HStack, Image } from '@gluestack-ui/themed';
import { Accelerometer } from 'expo-sensors';
import { updateTaskStartTime, updateTaskEndTime, pauseTask } from '../../services/tasks';
import MusicPlayer from './MusicPlayer';
import { defaultStyles } from '../../styles/styles';
import { config } from '../../styles/themeConfig';

import FirstStepSVG from '../../../assets/illustrations/1-first-step.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';


const StepScreen = ({ route, stepNumber, stepDescription, imageSource, imageAlt, totalSteps, taskSubtasks, task, setCurrentStep }) => {
    const [isTaskInProgress, setIsTaskInProgress] = useState(false);
    const [isTaskCompleted, setIsTaskCompleted] = useState(false);
    const [isTaskStarted, setIsTaskStarted] = useState(false);
    const [isMovementEnabled, setIsMovementEnabled] = useState(false);
    const [isAlertShown, setIsAlertShown] = useState(false);
    const musicPlayerRef = useRef(null);


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
                // Task is not in progress, so start it
                setIsTaskInProgress(true);
                setIsTaskStarted(true);
    
                const start_date = currentDateTime;
                const mainTaskStartTime = currentTimestamp;
                const subtaskStartTime = currentTimestamp;
                const MAIN_STATUS = "progress";
                const STATUS = "progress";
    
                await updateTaskStartTime(task._id, start_date, mainTaskStartTime, subtaskStartTime, MAIN_STATUS, STATUS, subtaskIndex);
            } else {
                // Task is in progress, so pause it
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
            setIsTaskInProgress(!isTaskInProgress); // Revert state if there's an error
        }
    };
    

    const handleBackToHome = () => {
        if (musicPlayerRef.current) {
            musicPlayerRef.current.stopMusic();
        }
        navigation.navigate('HomeScreen');
    };

    const toggleMovementSwitch = () => {
        setIsMovementEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.mainCard}>
            {!isTaskCompleted ? (
                <View style={[styles.stepInfo, defaultStyles.card]}>
                    <HStack style={styles.hStack}>
                    <Text style={[styles.boldText, defaultStyles.TypographyBodyHeavy ]}>Step {stepNumber}/{totalSteps}:</Text>
                    <Text style={[styles.boldText, , defaultStyles.TypographyBodyHeavy]}>{extractMinutes(taskSubtasks[stepNumber - 1].time)}</Text>
                    </HStack>
                    <Text style={defaultStyles.TypographyH2}>{stepDescription}</Text>
                    <FirstStepSVG style={styles.icon}/>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handlePauseTask} disabled={!isTaskStarted && !isTaskInProgress} style={styles.button}>
                            <Text style={styles.buttonText}>{isTaskInProgress ? 'Pause' : 'Resume'}</Text>
                        </TouchableOpacity>
                        <Button onPress={toggleTaskStatus} isDisabled={!isTaskStarted && isTaskInProgress} style={styles.button}>
                        {isTaskInProgress ? 
                            <ButtonText style={[defaultStyles.TypographyBodyHeavy,styles.buttonText]}>Done</ButtonText> 
                            
                        : <ButtonText style={[defaultStyles.TypographyBodyHeavy, styles.buttonText]}>Start</ButtonText>
                        }
                            
                        </Button>
                        <TouchableOpacity onPress={handlePauseTask} disabled={!isTaskStarted && !isTaskInProgress} style={styles.button}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>
            ) : (
                <View style={[styles.stepInfo, defaultStyles.card]}>
                    <Text style={styles.boldText}>All steps completed!</Text>
                    <Button onPress={handleBackToHome}>
                        <ButtonText>Back to Home</ButtonText>
                    </Button>
                </View>
            )}
            
            
            {/* {!isTaskCompleted && (
                <View style={styles.toggleContainer}>
                    <View style={[styles.toggleColumn, styles.card]}>
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleLabel}>Music</Text>
                            <MusicPlayer ref={musicPlayerRef} />
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
            )}  */}
                
            
        </View>
    );
};

const styles = StyleSheet.create({
    mainCard: {
        marginHorizontal: 20
    },
    
    boldText: {
        color: config.tokens.colors.neutralDark
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        
        
    },
    button: {
        width: 80,
    height: 80,
    borderRadius: 40,
       
    },
    // buttonText: {
    //     paddingVertical:21,
    // },
    
    movementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16,
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
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    toggleColumn: {
        flex: 1,
        marginRight: 14
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    toggleLabel: {
        fontSize: 14,
    },
});

export default StepScreen;
