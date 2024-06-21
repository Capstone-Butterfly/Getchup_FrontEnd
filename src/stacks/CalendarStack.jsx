import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import AgendaScreen from '../screens/calendar/AgendaScreen';

const Stack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AgendaScreen" component={AgendaScreen} />
    </Stack.Navigator>
  );
}

export default CalendarStack;
