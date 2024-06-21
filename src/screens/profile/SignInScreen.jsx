import { EyeIcon, LinkText } from '@gluestack-ui/themed';
import { ButtonText, EyeOffIcon, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../api'; 

function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleLogin = async () => {
    try {
      console.log('Sending login request', { email: email, password });
      const response = await api.post('/login', { email: email, password });
      console.log('Login response:', response);
      if (response.data.token) {
        // Save token in AsyncStorage
        await AsyncStorage.setItem('token', response.data.token);
        
        // Navigate to home page
        navigation.navigate('HomeScreen'); // Ensure 'HomeScreen' is the correct screen name
      } else {
        Alert.alert('Login failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View>
      <Text fontWeight="bold">Sign In</Text>
      <FormControl p="$4" borderWidth="$1" borderRadius="$lg" borderColor="$borderLight300" $dark-borderWidth="$1" $dark-borderRadius="$lg" $dark-borderColor="$borderDark800">
        <VStack space="xl">
          <Heading color="$text900" lineHeight="$md">Login</Heading>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Email</Text>
            <Input>
              <InputField value={email} onChangeText={setEmail} type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Password</Text>
            <Input textAlign="center">
              <InputField value={password} onChangeText={setPassword} type={showPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>
          <Button backgroundColor='$blue' onPress={handleLogin}>
            <ButtonText>Save</ButtonText>
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <LinkText>Create an account!</LinkText>
          </TouchableOpacity>
        </VStack>
      </FormControl>
    </View>
  );
}

export default SignInScreen;