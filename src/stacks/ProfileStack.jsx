
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/profile/SignInScreen';
import SignUpScreen from '../screens/profile/SignUpScreen';
import SurveyQuestionScreen from '../screens/profile/SurveyQuestionScreen';
import ADHDCatScreen from '../screens/profile/ADHDCatScreen';
import ProfileHomeScreen from '../screens/profile/ProfileHomeScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import UserSettingsScreen from '../screens/profile/UserSettingsScreen';
import ConfirmLogoutScreen from '../screens/profile/ConfirmLogoutScreen';
import profileStore from '../store/profileStore';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    const { is_login, survey_done } = profileStore((state) => state);

    return (
        <>
            {is_login ? (
                <Stack.Navigator initialRouteName={survey_done ? "ProfileHome" : "SurveyQuestionScreen"}>
                    <Stack.Screen name="ProfileHome" component={ProfileHomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="UserSettings" component={UserSettingsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ConfirmLogout" component={ConfirmLogoutScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SurveyQuestionScreen" component={SurveyQuestionScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ADHDCatScreen" component={ADHDCatScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName="SignIn">
                    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            )}
        </>
    );
};

export default ProfileStack;