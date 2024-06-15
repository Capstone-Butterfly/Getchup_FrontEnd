import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgressScreen from '../screens/progress/ProgressScreen';

const Stack = createNativeStackNavigator();

const ProgressStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProgressScreen" component={ProgressScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default ProgressStack;
