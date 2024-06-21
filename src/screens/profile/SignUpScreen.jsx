import { EyeIcon, EyeOffIcon, LinkText } from '@gluestack-ui/themed';
import { ButtonText, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/apiConfig'; // Adjust the path based on your project structure

function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const handlePasswordState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleConfirmPasswordState = () => {
    setShowConfirmPassword((showState) => !showState);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      console.log('Sending signup request', { first_name: firstName, last_name: lastName, email, password, phone });
      const response = await api.post('/createaccount', { first_name: firstName, last_name: lastName, email, password, phone });
      console.log('Signup response:', response);
      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('SurveyQuestionScreen');
      } else {
        Alert.alert('Signup failed', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View>
      <Text fontWeight="bold">Sign Up</Text>
      <FormControl p="$4" borderWidth="$1" borderRadius="$lg" borderColor="$borderLight300" $dark-borderWidth="$1" $dark-borderRadius="$lg" $dark-borderColor="$borderDark800">
        <VStack space="xl">
          <Heading color="$text900" lineHeight="$md">Create New Account</Heading>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">First Name</Text>
            <Input>
              <InputField value={firstName} onChangeText={setFirstName} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Last Name</Text>
            <Input>
              <InputField value={lastName} onChangeText={setLastName} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Email</Text>
            <Input>
              <InputField value={email} onChangeText={setEmail} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Phone No.</Text>
            <Input>
              <InputField value={phone} onChangeText={setPhone} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Password</Text>
            <Input textAlign="center">
              <InputField value={password} onChangeText={setPassword} type={showPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={handlePasswordState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Confirm Password</Text>
            <Input textAlign="center">
              <InputField value={confirmPassword} onChangeText={setConfirmPassword} type={showConfirmPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={handleConfirmPasswordState}>
                <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>

          <Button backgroundColor='$blue' onPress={handleSignUp}>
            <ButtonText>Create Account</ButtonText>
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <LinkText>Already have an account? Sign in</LinkText>
          </TouchableOpacity>
        </VStack>
      </FormControl>
    </View>
  );
}

export default SignUpScreen;