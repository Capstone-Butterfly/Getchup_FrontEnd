import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView, ScrollView } from '@gluestack-ui/themed';
import { Accelerometer } from 'expo-sensors'; // Import Accelerometer from expo-sensors
import StepScreen from '../task-steps/StepScreens';
import CustomProgressBar from '../../components/CustomProgressBarTabs';
import { defaultStyles } from '../../styles/styles';
import MusicPlayer from '../task-steps/MusicPlayer'; // Import MusicPlayer component

const FocusModeScreen = ({ route, navigation }) => {
    const { task } = route.params;
    const totalSteps = task.subtask.length;
    const [currentStep, setCurrentStep] = useState(1);
    const [isMovementEnabled, setIsMovementEnabled] = useState(false);
    const [isAlertShown, setIsAlertShown] = useState(false);

    useEffect(() => {
        setCurrentStep(1);
    }, []);

    useEffect(() => {
        let accelerometerSubscription;

        const startAccelerometer = () => {
            accelerometerSubscription = Accelerometer.addListener(handleMovement);
        };

        const stopAccelerometer = () => {
            if (accelerometerSubscription) {
                accelerometerSubscription.remove();
            }
        };

        if (isMovementEnabled) {
            startAccelerometer();
        } else {
            stopAccelerometer();
        }

        return () => {
            stopAccelerometer();
        };
    }, [isMovementEnabled]);

    const handleMovement = (accelerometerData) => {
        console.log("movement is being tracked");
        const accelerationMagnitude = Math.sqrt(
            accelerometerData.x * accelerometerData.x +
            accelerometerData.y * accelerometerData.y +
            accelerometerData.z * accelerometerData.z
        );
        const movementThreshold = 1.5;
        if (accelerationMagnitude > movementThreshold && !isAlertShown) {
            setIsAlertShown(true);
            console.log("movement issue was triggered");
            Alert.alert('Reminder', 'Please take a moment to calm down and refocus on the task.', [
                { text: 'OK', onPress: () => setIsAlertShown(false) }
            ]);
            setTimeout(() => setIsAlertShown(false), 1000);
        }
    };

    const handleStepPress = (stepNumber) => {
        setCurrentStep(stepNumber);
    };

    const navigateToNextStep = () => {
        const nextStepNumber = currentStep + 1;
        if (nextStepNumber <= totalSteps) {
            setCurrentStep(nextStepNumber);
        } else {
            navigation.navigate('HomeScreen');
        }
    };

    const navigateToPreviousStep = () => {
        const previousStepNumber = currentStep - 1;
        if (previousStepNumber >= 1) {
            setCurrentStep(previousStepNumber);
        }
    };

    const toggleMovementSwitch = () => {
        setIsMovementEnabled(previousState => !previousState);
    };

    return (
        <SafeAreaView >
            <ScrollView>
            <CustomProgressBar
                steps={totalSteps}
                currentStep={currentStep}
                onStepPress={handleStepPress}
            />

            {currentStep > 1 && (
                <TouchableOpacity onPress={navigateToPreviousStep} style={styles.nextStep}>
                    <View style={[styles.stepInfo, defaultStyles.card]}>
                        <Text style={styles.boldText}>Previous Step:</Text>
                        <Text>{task.subtask[currentStep - 2].sub_title}</Text>
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
            />

            {currentStep < totalSteps && (
                <TouchableOpacity onPress={navigateToNextStep} style={styles.nextStep}>
                    <View style={[styles.stepInfo, defaultStyles.card]}>
                        <Text style={styles.boldText}>Next Step:</Text>
                        <Text>{task.subtask[currentStep].sub_title}</Text>
                    </View>
                </TouchableOpacity>
            )}

            <View style={styles.toggleContainer}>
                <View style={[styles.toggleColumn, defaultStyles.card]}>
                    <View style={styles.toggleRow}>
                        <Text style={styles.toggleLabel}>Music</Text>
                        <MusicPlayer />
                    </View>
                </View>
                <View style={[styles.toggleColumn, defaultStyles.card]}>
                    <View style={styles.toggleRow}>
                        <Text style={styles.toggleLabel}>Movement</Text>
                        <Switch
                            onValueChange={toggleMovementSwitch}
                            value={isMovementEnabled}
                        />
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    nextStep: {
        marginHorizontal: 20
    },
    
    boldText: {
        fontWeight: 'bold',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: 16,
        marginHorizontal: 20,
    },
    toggleColumn: {
        flex: 1,
        
        // marginRight: 14
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleLabel: {
        fontSize: 14,
    },
});

export default FocusModeScreen;
