import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from '../screens/profile/SignInScreen';
import SignUpScreen from '../screens/profile/SignUpScreen';
import SurveyQuestionScreen from '../screens/profile/SurveyQuestionScreen';
import ADHDCatScreen from '../screens/profile/ADHDCatScreen';
import ProfileHomeScreen from '../screens/profile/ProfileHomeScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import UserSettingsScreen from '../screens/profile/UserSettingsScreen';
import ConfirmLogoutScreen from '../screens/profile/ConfirmLogoutScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userID = await AsyncStorage.getItem('userId');
      setIsUserLoggedIn(!!userID);
    };

    checkUserLoggedIn();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called every time the component comes into focus
      const refreshData = async () => {
        // You can perform any refresh logic here
        const userID = await AsyncStorage.getItem('userId');
        setIsUserLoggedIn(!!userID);
      };

      refreshData();
    }, [])
  );

  return (
    <>
      {
        isUserLoggedIn ?
          <Stack.Navigator initialRouteName={"ProfileHome"}>
            <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserSettings" component={UserSettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ConfirmLogout" component={ConfirmLogoutScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        :
        <Stack.Navigator initialRouteName={"SignIn"}>
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SurveyQuestionScreen" component={SurveyQuestionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ADHDCatScreen" component={ADHDCatScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      }
    </>
  );
};

export default ProfileStack;
