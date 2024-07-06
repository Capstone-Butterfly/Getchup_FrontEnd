import { GestureHandlerRootView } from 'react-native-gesture-handler'; // THIS HAS TO BE AT LINE NUMBER 1
import React from 'react';
import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { config } from '@gluestack-ui/config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/services/QueryClient';
import profileStore from './src/store/profileStore';
import SignInScreen from './src/screens/profile/SignInScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import SignUpScreen from './src/screens/profile/SignUpScreen';
import Navigator from './src/navigation/Navigator';
import SurveyQuestionScreen from './src/screens/profile/SurveyQuestionScreen';
import ADHDCatScreen from './src/screens/profile/ADHDCatScreen';
import { Archivo_400Regular, Archivo_600SemiBold } from '@expo-google-fonts/archivo';
import { WorkSans_700Bold, WorkSans_600SemiBold } from '@expo-google-fonts/work-sans';
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SurveyQuestionScreen" component={SurveyQuestionScreen} />
        <Stack.Screen name="ADHDCatScreen" component={ADHDCatScreen} />
    </Stack.Navigator>
);

const App = () => {
    const { is_login } = profileStore((state) => state);

    const [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_600SemiBold,
        WorkSans_700Bold,
        WorkSans_600SemiBold
      });

      if (!fontsLoaded) {
        return <Text>Loading...</Text>;
      }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <GluestackUIProvider config={config}>
                            <StatusBar bg='#2c3e50' />
                            {is_login ? (
                                <Navigator />
                            ) : (
                                <AppNavigator />
                            )}
                        </GluestackUIProvider>
                    </SafeAreaProvider>
                </NavigationContainer>
            </QueryClientProvider>
        </GestureHandlerRootView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100
    },

    image: {
        flex: 1,
        justifyContent: 'center',
      },
});

export default App;