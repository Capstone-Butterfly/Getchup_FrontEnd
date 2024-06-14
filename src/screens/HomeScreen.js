import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { checkAuthorization } from '../utils/authUtils';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleCheckAuthorization = async () => {
    try {
      const isAuthorized = await checkAuthorization(navigation);
      if (isAuthorized) {
        navigation.navigate('SecondPage');
      } else {
        navigation.navigate('Login');

        
      }
    } catch (error) {
      console.error('Error in handleCheckAuthorization:', error);
      Alert.alert('Error', 'An error occurred while checking authorization.');
    }
  };

  return (
    <View>
      <Text>Welcome to Home Screen!</Text>
      <Button title="Go to Second Page" onPress={handleCheckAuthorization} />
    </View>
  );
};

export default HomeScreen;
