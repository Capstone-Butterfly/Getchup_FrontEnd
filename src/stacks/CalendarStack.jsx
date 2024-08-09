import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import AgendaScreen from '../screens/calendar/AgendaScreen';
import TaskDetailScreen from '../screens/task-detail/taskDetailScreen';
import FocusModeScreen from '../screens/focus-mode/FocusModeScreen';
import { HStack, Text } from '@gluestack-ui/themed';
import { defaultStyles } from '../styles/styles';
import ChevronLeftIcon from '../../assets/icons/chevron-left.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CStack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <CStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'transparent' },
        headerTransparent: true,
        headerTintColor: '#fff',
      }}>
      <CStack.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: false }} />
      <CStack.Screen
        name="AgendaScreen"
        component={AgendaScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          // headerBackTitle: 'Schedule',
          headerLeft: () => (
            <HStack alignItems="center">
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                <ChevronLeftIcon
                  size={24}
                  style={{ marginRight: 27 }}
                />
              </TouchableOpacity>
              <Text style={defaultStyles.TypographyH2}>Schedule</Text>
            </HStack>
          ),
        })}
      />
      <CStack.Screen
        name="TaskDetailScreen"
        component={TaskDetailScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <HStack alignItems="center">
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                <ChevronLeftIcon
                  size={24}
                  onPress={() => navigation.goBack()}
                  style={{ marginRight: 27 }}
                />
              </TouchableOpacity>

              <Text style={[defaultStyles.TypographyH2]}>Task</Text>
            </HStack>
          ),
        })}
      />

      <CStack.Screen
        name="FocusModeScreen"
        component={FocusModeScreen}
        options={({ route, navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <HStack alignItems="center">

              <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>

                <ChevronLeftIcon
                  size={24}
                  onPress={() => navigation.goBack()}
                  style={{ marginRight: 27 }}
                />
              </TouchableOpacity>
              <Text style={[defaultStyles.TypographyH2]}>{route.params.task.title}</Text>
            </HStack>
          ),
        })}
      />
    </CStack.Navigator>

  );
}

export default CalendarStack;
