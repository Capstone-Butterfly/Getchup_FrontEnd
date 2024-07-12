import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { config } from '../styles/themeConfig';

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
        marginHorizontal: 10,
        marginVertical: 16,
    },
    progressSegment: {
        flex: 1,
        height: 8,
        backgroundColor: config.tokens.colors.white,
        marginHorizontal: 2,
        borderRadius: 4,
    },
    activeSegment: {
        backgroundColor: config.tokens.colors.primary,
    },
});

export default CustomProgressBar;
