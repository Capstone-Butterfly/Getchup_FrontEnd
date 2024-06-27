import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StepScreen from '../task-steps/StepScreens';
import { SafeAreaView } from '@gluestack-ui/themed';

const Tab = createMaterialTopTabNavigator();

const FocusModeScreen = ({ route, navigation }) => {
    const { task } = route.params; 

    const totalSteps = task.subtask.length;

    const handleNextStep = (currentStep) => {
        const nextStep = currentStep + 1;
        if (nextStep <= totalSteps) {
            navigation.push('StepScreen', {
                stepNumber: nextStep,
                stepDescription: task.subtask[nextStep - 1].sub_title,
                imageSource: require('../../../assets/task-image-png.png'),
                imageAlt: `Image description for step ${nextStep}`,
                totalSteps: totalSteps,
                taskSubtasks: task.subtask,
                task: task,
            });
        } 
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                }}
            >
                {task.subtask.map((subtask, index) => (
                    <Tab.Screen
                        key={index}
                        name={`Step ${index + 1}`}
                        component={StepScreen}
                        initialParams={{
                            stepNumber: index + 1,
                            stepDescription: subtask.sub_title,
                            imageSource: require('../../../assets/task-image-png.png') ,
                            imageAlt:  'Image description for step 1' ,
                            time: subtask.time,
                            totalSteps: totalSteps,
                            taskSubtasks: task.subtask,
                            task: task,
                            goToNextStep: handleNextStep,
                        }}
                    />
                ))}
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default FocusModeScreen;

