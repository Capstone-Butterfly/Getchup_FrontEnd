import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import FocusModeScreen from '../screens/focus-mode/FocusModeScreen';
import TaskDetailScreen from '../screens/task-detail/taskDetailScreen';
import ChevronLeftIcon from '../../assets/icons/chevron-left.svg'
import { HStack, Text } from '@gluestack-ui/themed';
import { defaultStyles } from '../styles/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} options={({ navigation }) => ({
        headerTitle: '', headerBackTitleVisible: false, headerLeft: () => (
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
      })} />
      <Stack.Screen name="FocusModeScreen" component={FocusModeScreen} options={({ route, navigation }) => ({
        headerTitle: '', headerLeft: () => (
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
      })} />
    </Stack.Navigator>
  );
}

export default HomeStack;
