import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Image } from '@gluestack-ui/themed';

const StepScreen = ({ route }) => {
    const { stepNumber, stepDescription, imageSource, imageAlt, time, totalSteps, taskSubtasks } = route.params;

    const hasNextStep = (currentStep, totalSteps) => currentStep < totalSteps;
    const hasPreviousStep = (currentStep) => currentStep > 1;

    const [isMusicEnabled, setIsMusicEnabled] = useState(false);
    const [isMovementEnabled, setIsMovementEnabled] = useState(false);

    const toggleMusicSwitch = () => setIsMusicEnabled(previousState => !previousState);
    const toggleMovementSwitch = () => setIsMovementEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            {hasPreviousStep(stepNumber) && (
                <View style={[styles.stepInfo, styles.card]}>
                    <Text style={styles.boldText}>Previous Step:</Text>
                    <Text>Step {stepNumber - 1}: {taskSubtasks[stepNumber - 2].sub_title}</Text>
                </View>
            )}

            <View style={[styles.stepInfo, styles.card]}>
                <Text style={styles.boldText}>Step {stepNumber}:</Text>
                <Text>{stepDescription}</Text>
                {imageSource && (
                    <View style={styles.imageContainer}>
                        <Image source={imageSource} style={styles.image} accessibilityLabel={imageAlt} />
                    </View>
                )}
            </View>

            {hasNextStep(stepNumber, totalSteps) && (
                <View style={[styles.stepInfo, styles.card]}>
                    <Text style={styles.boldText}>Next Step:</Text>
                    <Text>Step {stepNumber + 1}: {taskSubtasks[stepNumber].sub_title}</Text>
                </View>
            )}

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
    card: {
        backgroundColor: '#fff',
        padding: 20,
        margin:10,
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
});

export default StepScreen;
