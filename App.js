import 'react-native-gesture-handler'; //THIS HAS TO BE AT LINE NUMBER 1
import React from 'react';
import { Image } from '@gluestack-ui/themed';
import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './src/navigation/Navigator';
import { config } from '@gluestack-ui/config';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App = () => {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
               <GluestackUIProvider config={config}>
                    {/* <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SecondPage" component={SecondPage} />
        </Stack.Navigator> */}
        <StatusBar bg='#2c3e50' />
                    <Navigator />
                </GluestackUIProvider>
            </SafeAreaProvider>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default App