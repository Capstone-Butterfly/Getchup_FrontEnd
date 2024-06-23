import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ADHDCatScreen({ route }) {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>All done!</Text>
      <Text style={{ fontSize: 16 }}>let's get started!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
}

export default ADHDCatScreen;