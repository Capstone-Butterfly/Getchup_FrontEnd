import React from 'react'; import { Image } from '@gluestack-ui/themed';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
    return <GluestackUIProvider>
        <View style={styles.container}>
            <Text>Welcome to Getchup 🍅</Text>
            <StatusBar style="auto" />
        </View>
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