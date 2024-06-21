import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ADHDCatScreen({ route }) {
  const { category } = route.params;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>All done!</Text>
      <Text style={{ fontSize: 16 }}>Your ADHD type is {category}, let's get started!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
}

export default ADHDCatScreen;