import React from 'react';
import { View, Text } from 'react-native';

const StepScreen = ({ route }) => {
  const { stepNumber, stepDescription, imageSource, time, totalSteps } = route.params;

  const hasNextStep = (currentStep, totalSteps) => {
    return currentStep < totalSteps;
  };

  const hasPreviousStep = (currentStep) => {
    return currentStep > 1;
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {hasPreviousStep(stepNumber) && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Previous Step:</Text>
          <Text>Step {stepNumber - 1}: Previous Step Description</Text>
        </View>
      )}

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Step {stepNumber}:</Text>
        <Text>{stepDescription}</Text>
      </View>

      {hasNextStep(stepNumber, totalSteps) && (
        <View>
          <Text style={{ fontWeight: 'bold' }}>Next Step:</Text>
          <Text>Step {stepNumber + 1}: Next Step Description</Text>
        </View>
      )}
    </View>
  );
};

export default StepScreen;
