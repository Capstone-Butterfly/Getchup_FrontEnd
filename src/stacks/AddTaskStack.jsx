import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTaskScreen from '../screens/add-task/AddTaskScreen';

const Stack = createNativeStackNavigator();

const AddTaskStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AddTaskStack;
