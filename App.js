import {GestureHandlerRootView} from 'react-native-gesture-handler'; //THIS HAS TO BE AT LINE NUMBER 1
import React from 'react';
import { Image } from '@gluestack-ui/themed';
import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './src/navigation/Navigator';
import { config } from '@gluestack-ui/config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import queryClient from './src/services/QueryClient';
import { QueryClientProvider } from '@tanstack/react-query';

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <SafeAreaProvider>
                <GluestackUIProvider config={config}>
                        <StatusBar bg='#2c3e50' />
                        <Navigator />
                    </GluestackUIProvider>
                </SafeAreaProvider>
            </NavigationContainer>
        </QueryClientProvider> 
        </GestureHandlerRootView>
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