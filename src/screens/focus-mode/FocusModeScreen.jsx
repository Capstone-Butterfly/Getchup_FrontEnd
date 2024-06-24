import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StepScreen from '../task-steps/StepScreens';
import { Button, ButtonText, SafeAreaView } from '@gluestack-ui/themed/build';
import { Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const Tab = createMaterialTopTabNavigator();

const FocusModeScreen = ({ navigation }) => {
  const taskData = [
    {
      sub_title: "Make the bed",
      time: "5 minutes",
      movement: true,
      status: "new"
    },
    {
      sub_title: "Dust surfaces",
      time: "10 minutes",
      movement: true,
      status: "new"
    },
    {
      sub_title: "Vacuum the floor",
      time: "15 minutes",
      movement: true,
      status: "new"
    }
  ];
  const totalSteps = taskData.length;

  const [isTaskInProgress, setIsTaskInProgress] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false); 

  useEffect(() => {
    let subscription;

    if (isTaskInProgress) {
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
  }, [isTaskInProgress, isAlertShown]); 

  const toggleTaskStatus = () => {
    setIsTaskInProgress(prevState => !prevState);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false, 
        }}
      >
        {taskData.map((task, index) => (
          <Tab.Screen
            key={index} 
            name={`Step ${index + 1}`}
            component={StepScreen}
            initialParams={{
              stepNumber: index + 1,
              stepDescription: task.sub_title, 
              imageSource: null, 
              time: task.time,
              totalSteps: totalSteps,
            }}
          />
        ))}
      </Tab.Navigator>
      <Button
        onPress={toggleTaskStatus}
        style={{ backgroundColor: 'green', color: 'white' }}
      >
        <ButtonText>
          {isTaskInProgress ? 'Stop Task' : 'Start Task'}
        </ButtonText>
      </Button>
    </SafeAreaView>
  );
};




export default FocusModeScreen;
