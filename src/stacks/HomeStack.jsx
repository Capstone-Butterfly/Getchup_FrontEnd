import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import FocusModeScreen from '../screens/focus-mode/FocusModeScreen';
import TaskDetailScreen from '../screens/task-detail/taskDetailScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} options={{ headerTitle: '', headerBackTitleVisible: false }} />
      <Stack.Screen name="FocusModeScreen" component={FocusModeScreen} options={({ route }) => ({ headerTitle: route.params.task.title })} />
    </Stack.Navigator>
  );
}

export default HomeStack;
