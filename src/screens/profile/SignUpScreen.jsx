import { EyeIcon, EyeOffIcon, LinkText } from '@gluestack-ui/themed';
import { ButtonText, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../config/apiConfig';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import signUpStore from '../../store/signUpStore';

function SignUpScreen() {
  const { firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, phone, setPhone } = signUpStore(); // Access the Zustand store
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const base_url = BASE_URL;

  const handlePasswordState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleConfirmPasswordState = () => {
    setShowConfirmPassword((showState) => !showState);
  };

  const { mutate: handleSignUp, isLoading, mutationFn } = useMutation(
    {
      mutationFn: async () => {
        const response = await axios.post(`${base_url}/createaccount`, { first_name: firstName, last_name: lastName, email, password, phone });
        console.log("response: ", response);
        return response.data;
      },
      onSuccess: async () => {
        // Navigate to Survey Question
        navigation.navigate('SurveyQuestionScreen');
      },
      onError: () => {
        Alert.alert('Signup failed', 'Something went wrong. Please try again.');
      },
    }
  );

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

          <Button backgroundColor='$blue' onPress={handleSignUp} isLoading={isLoading}>
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

