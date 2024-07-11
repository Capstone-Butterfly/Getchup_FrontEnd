import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const CustomProgressBar = ({ steps, currentStep, onStepPress }) => {
    const renderSegments = () => {
        return Array.from({ length: steps }).map((_, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.progressSegment,
                    index < currentStep && styles.activeSegment,
                ]}
                onPress={() => onStepPress(index + 1)} // Adjust index to step number
            />
        ));
    };
    return (
        <View style={styles.progressBarContainer}>
            {renderSegments()}
        </View>
    );
};

const styles = StyleSheet.create({
    progressBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    progressSegment: {
        flex: 1,
        height: 4,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 2,
        borderRadius: 2,
    },
    activeSegment: {
        backgroundColor: '#4CAF50',
    },
});

export default CustomProgressBar;
