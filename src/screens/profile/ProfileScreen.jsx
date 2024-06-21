import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SurveyQuestionScreen from './SurveyQuestionScreen';
import ADHDCatScreen from './ADHDCatScreen'; // Import the ADHDCat screen

const Stack = createNativeStackNavigator();

const ProfileTab = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SurveyQuestionScreen" component={SurveyQuestionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ADHDCatScreen" component={ADHDCatScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default ProfileTab;