import React from 'react'; import { Image } from '@gluestack-ui/themed';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SecondPage from './src/screens/SecondPage';

const Stack = createStackNavigator();

const App = () => {
    return <GluestackUIProvider>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SecondPage" component={SecondPage} />
        </Stack.Navigator>
        </NavigationContainer>
    </GluestackUIProvider>;
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