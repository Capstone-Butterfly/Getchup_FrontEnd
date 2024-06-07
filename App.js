import React from 'react'; import { Image } from '@gluestack-ui/themed';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppStack from './stacks/AppStack';

export default function App() {
    return <GluestackUIProvider>
       <AppStack />
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