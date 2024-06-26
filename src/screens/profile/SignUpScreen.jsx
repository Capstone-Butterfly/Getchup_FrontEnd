import { EyeIcon, EyeOffIcon, LinkText } from '@gluestack-ui/themed';
import { ButtonText, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import profileStore from '../../store/profileStore';
import { signUpProfile } from '../../services/profile';

function SignUpScreen() {
  const { email, first_name, last_name, password, phone, userId, setPhone, setLastName, setFirstName, setEmail, setPassword, setUserId } = profileStore((state) => state);

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatched, setIsMatched] = useState(false);

  const handlePasswordState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleConfirmPasswordState = () => {
    setShowConfirmPassword((showState) => !showState);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setIsMatched(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setIsMatched(value === password);
  };

  const { mutate: handleSignUp, mutationFn } = useMutation(
    {
      mutationFn: async () => {
        const data = await signUpProfile(first_name, last_name, email, password, phone);
        return data;
      },
      onSuccess: async (data) => {
        setUserId(data.userId);
        console.log('Signup successful, navigating to SurveyQuestionScreen');
        navigation.navigate('SurveyQuestionScreen');
      },
      onError: (error) => {
        console.log('Signup error:', error);
        Alert.alert('Signup failed', 'Something went wrong. Please try again.');
      },
    }
  );

  useEffect(() => {
    console.log('Navigation object:', navigation);
  }, []);

  return (
    <View>
      <Text fontWeight="bold">Sign Up</Text>
      <FormControl p="$4" borderWidth="$1" borderRadius="$lg" borderColor="$borderLight300" $dark-borderWidth="$1" $dark-borderRadius="$lg" $dark-borderColor="$borderDark800">
        <VStack space="xl">
          <Heading color="$text900" lineHeight="$md">Create New Account</Heading>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">First Name</Text>
            <Input>
              <InputField value={first_name} onChangeText={setFirstName} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Last Name</Text>
            <Input>
              <InputField value={last_name} onChangeText={setLastName} type="text" />
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
              <InputField value={password} onChangeText={handlePasswordChange} type={showPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={handlePasswordState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Confirm Password</Text>
            <Input textAlign="center">
              <InputField value={confirmPassword} onChangeText={handleConfirmPasswordChange} type={showConfirmPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={handleConfirmPasswordState}>
                <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>

          {!isMatched && (
            <Text style={{ color: 'red'}}>
              Passwords do not match. Please enter matching passwords.
            </Text>
          )}

          <Button backgroundColor='$blue' onPress={() => {
            console.log('Sign Up button pressed');
            handleSignUp();
          }} disabled={!isMatched}>
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