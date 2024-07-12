import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import HomeTab from './HomeTab';
import CalendarTab from './CalendarTab';
import AddTaskTab from './AddTaskTab';
import ProgressTab from './ProgressTab';
import ProfileTab from './ProfileTab';

import HomeIcon from './../../assets/icons/home.svg';
import CalendarIcon from './../../assets/icons/calendar.svg';
import AddTaskIcon from './../../assets/icons/plus-circle.svg';
import ProgressIcon from './../../assets/icons/progress.svg';
import ProfileIcon from './../../assets/icons/profile.svg';

const Tab = createBottomTabNavigator();

const IconWithLabel = ({ IconComponent, label, focused, color, size, isAddTask }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
    <IconComponent width={isAddTask ? size * 2 : size} height={isAddTask ? size * 2 : size} fill={color} />
    {!isAddTask && <Text style={{ color, fontSize: 12, marginTop: 4 }}>{label}</Text>}
  </View>
);

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          let label;
          let isAddTask = false;

          switch (route.name) {
            case 'Home':
              IconComponent = HomeIcon;
              label = 'Home';
              break;
            case 'Calendar':
              IconComponent = CalendarIcon;
              label = 'Calendar';
              break;
            case 'Add Task':
              IconComponent = AddTaskIcon;
              label = 'Add Task';
              isAddTask = true; 
              break;
            case 'Progress':
              IconComponent = ProgressIcon;
              label = 'Progress';
              break;
            case 'Profile':
              IconComponent = ProfileIcon;
              label = 'Profile';
              break;
            default:
              IconComponent = HomeIcon;
              label = 'Home';
          }
          return <IconWithLabel IconComponent={IconComponent} label={label} focused={focused} color={focused ? 'red' : 'gray'} size={size} isAddTask={isAddTask} />;
        },
        tabBarActiveTintColor: 'red', 
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 10, 
          height: 70, 
        },
        tabBarLabel: () => null, 
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Calendar" component={CalendarTab} options={{ headerShown: false }} />
      <Tab.Screen name="Add Task" component={AddTaskTab} options={{ headerShown: false }} />
      <Tab.Screen name="Progress" component={ProgressTab} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileTab} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default MyTabs;