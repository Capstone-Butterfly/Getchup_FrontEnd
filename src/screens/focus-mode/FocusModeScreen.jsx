import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, ScrollView, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, Heading, AlertDialogBody, AlertDialogFooter, Button, ButtonText } from '@gluestack-ui/themed';
import { Accelerometer } from 'expo-sensors';
import StepScreen from '../task-steps/StepScreens';
import CustomProgressBar from '../../components/CustomProgressBarTabs';
import { defaultStyles } from '../../styles/styles';
import MusicPlayer from '../task-steps/MusicPlayer'; 
import ToggleSwitch from '../../components/ToggleSwitch';
import { config } from '../../styles/themeConfig';
import useTaskStore from '../../store/taskStore';
import { useFocusEffect } from '@react-navigation/native';

const FocusModeScreen = ({ route, navigation }) => {
    const { task } = route.params;
    //console.log("task is: ", task);
    const totalSteps = task.subtask.length;
    const [currentStep, setCurrentStep] = useState(1);
    const [isMovementEnabled, setIsMovementEnabled] = useState(false);
    const [isAlertShown, setIsAlertShown] = useState(false);

    const { isTaskInProgress, setIsTaskInProgress } = useTaskStore();

    const musicPlayerRef = useRef(null);

    const [isToggleShown, setIsToggleShown] = useState(true);

  const handleFlagChange = (newFlag) => {
    setIsToggleShown(newFlag);
  };

  useFocusEffect(
    React.useCallback(() => {
        return () => {
            if (musicPlayerRef.current) {
                musicPlayerRef.current.stopMusic();
            }
        };
    }, [])
);


    useEffect(() => {
        setCurrentStep(1);
    }, []);

    useEffect(() => {
        let subscription;
    
        if (isTaskInProgress && isMovementEnabled) {
            //console.log("movement tracking is started");
            subscription = Accelerometer.addListener(accelerometerData => {
                const accelerationMagnitude = Math.sqrt(
                    accelerometerData.x * accelerometerData.x +
                    accelerometerData.y * accelerometerData.y +
                    accelerometerData.z * accelerometerData.z
                );
    
                const movementThreshold = 1.5;
    
                if (accelerationMagnitude > movementThreshold && !isAlertShown) {
                    setIsAlertShown(true);
                    // Alert.alert('Reminder', 'Please take a moment to calm down and refocus on the task.', [
                    //     { text: 'OK', onPress: () => {
                    //         setTimeout(() => setIsAlertShown(false), 5000); // Set timeout for resetting isAlertShown
                    //     }}
                    // ]);
                }
            });
        }
    
        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [isTaskInProgress, isMovementEnabled, isAlertShown]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setIsMovementEnabled(false); 
            setIsTaskInProgress(false); 
        });

        return unsubscribe;
    }, [navigation]);
    

    const handleStepPress = (stepNumber) => {
        setCurrentStep(stepNumber);
    };

    const navigateToNextStep = () => {
        const nextStepNumber = currentStep + 1;
        if (nextStepNumber <= totalSteps) {
            setCurrentStep(nextStepNumber);
            //console.log("Playing new track for step: ", nextStepNumber);
            musicPlayerRef.current.stopMusic();
            musicPlayerRef.current.playNewTrack();
        } 
    };

    const navigateToPreviousStep = () => {
        const previousStepNumber = currentStep - 1;
        if (previousStepNumber >= 1) {
            setCurrentStep(previousStepNumber);
            musicPlayerRef.current.stopMusic();
        }
    };

    const toggleMovementSwitch = () => {
        setIsMovementEnabled(previousState => !previousState);
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomProgressBar
                    steps={totalSteps}
                    currentStep={currentStep}
                    onStepPress={handleStepPress}
                />

                {currentStep > 1 && (
                    <TouchableOpacity onPress={navigateToPreviousStep} style={styles.nextStep}>
                        <View style={[styles.stepInfo, defaultStyles.card]}>
                            <Text style={[styles.boldText, defaultStyles.TypographyBodySmall]}>Previous Step:</Text>
                            <Text style={defaultStyles.TypographyBodyHeavy}>{task.subtask[currentStep - 2].sub_title}</Text>
                        </View>
                    </TouchableOpacity>
                )}

                <StepScreen
                    navigation={navigation}
                    route={route}
                    stepNumber={currentStep}
                    stepDescription={task.subtask[currentStep - 1].sub_title}
                    totalSteps={totalSteps}
                    taskSubtasks={task.subtask}
                    task={task}
                    setCurrentStep={setCurrentStep}
                    navigateToNextStep={navigateToNextStep}
                    musicPlayerRef={musicPlayerRef}
                    handleFlagChange={handleFlagChange}
                    duration={parseInt(task.subtask[currentStep - 1].time) * 60 * 1000} 
                />

                {currentStep < totalSteps && (
                    <TouchableOpacity onPress={navigateToNextStep} style={styles.nextStep}>
                        <View style={[styles.stepInfo, defaultStyles.card]}>
                            <Text style={styles.boldText}>Next Step:</Text>
                            <Text style={defaultStyles.TypographyBodyHeavy}>{task.subtask[currentStep].sub_title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {isToggleShown && 
                <View style={styles.toggleContainer}>
                    <View style={[styles.toggleColumn, styles.toggleCard, { marginRight: 14 }]}>
                        <View style={styles.toggleRow}>
                            <Text style={[defaultStyles.TypographyBodySmall, styles.centerText]}>Music</Text>
                            <MusicPlayer ref={musicPlayerRef} />
                        </View>
                    </View>
                    <View style={[styles.toggleColumn, styles.toggleCard]}>
                        <View style={styles.toggleRow}>
                            <Text style={[defaultStyles.TypographyBodySmall, styles.centerText]}>Movement</Text>
                            <ToggleSwitch
                                value={isMovementEnabled}
                                onToggle={toggleMovementSwitch}
                            />
                        </View>
                    </View>
                </View>
                
}
            </ScrollView>
            <AlertDialog
            isOpen={isAlertShown}
            onClose={() => setIsAlertShown(false)}
            closeOnOverlayClick
            style={styles.alertDialog}
            >
                <AlertDialogBackdrop/>
                <AlertDialogContent>
                    <AlertDialogHeader style={styles.alertHeader}>
                        <Heading style={[defaultStyles.TypographyH2, styles.alertText]}>Hey there!</Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text style={[defaultStyles.TypographyBody, styles.alertText]}>Just a gentle reminder to stay still.</Text>
                        <Text style={[defaultStyles.TypographyBody, styles.alertText]}>It will help you focus better.</Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button style={defaultStyles.ButtonDefault} onPress={() => setIsAlertShown(false)}>
                            <ButtonText>OK</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    alertHeader: {
        padding: 0,
        paddingTop: 20,
        marginBottom: 14,
    },
    alertDialog: {
        borderRadius: 10,
        padding: 20,
    },
    alertText: {
        textAlign: "center",
        width: "100%",
    },
    nextStep: {
        marginHorizontal: 20
    },
    toggleCard: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        backgroundColor: config.tokens.colors.white,
    },
    boldText: {
        color: config.tokens.colors.neutralDark
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
    },
    toggleColumn: {
        flex: 1,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        marginRight: 10,
    },
});

export default FocusModeScreen;
