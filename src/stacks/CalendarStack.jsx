import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import AgendaScreen from '../screens/calendar/AgendaScreen';
import TaskDetailScreen from '../screens/task-detail/taskDetailScreen';
import FocusModeScreen from '../screens/focus-mode/FocusModeScreen';

const CStack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <CStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: 'transparent' },
      // headerTransparent: true,
      // headerTintColor: '#fff', 
    }}>
      <CStack.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: false }} />
      <CStack.Screen name="AgendaScreen" component={AgendaScreen} options={{ headerTitle: '', headerBackTitle:'Schedule' }}/>
      <CStack.Screen name="TaskDetailScreen" component={TaskDetailScreen} options={{ headerTitle: '', headerBackTitleVisible: false }} />
      <CStack.Screen name="FocusModeScreen" component={FocusModeScreen} options={({ route }) => ({ headerTitle: route.params.task.title })} />
    </CStack.Navigator>
  );
}

export default CalendarStack;
