import { EyeIcon, EyeOffIcon, LinkText } from '@gluestack-ui/themed';
import { ButtonText, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import profileStore from '../../store/profileStore';
import { signUpProfile } from '../../services/profile';
import { config } from '../../styles/themeConfig'; 
import { defaultStyles } from './../../styles/styles'

// Get device dimensions
const { width, height } = Dimensions.get('window');

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
    <View style={styles.container}>
      <FormControl style={styles.formBox}>
        <VStack space="xl">
          <Heading style={[styles.heading, defaultStyles.TypographyH1 ]}>Create New Account</Heading>
          <VStack space="xs">
            <Text  style={defaultStyles.TypographyBodyHeavy}>First Name</Text>
            <Input style={styles.inputContainer}>
              <InputField value={first_name} onChangeText={setFirstName} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text  style={defaultStyles.TypographyBodyHeavy}>Last Name</Text>
            <Input style={styles.inputContainer}>
              <InputField value={last_name} onChangeText={setLastName} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text  style={defaultStyles.TypographyBodyHeavy}>Email</Text>
            <Input style={styles.inputContainer} >
              <InputField value={email} onChangeText={setEmail} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text  style={defaultStyles.TypographyBodyHeavy}>Phone No.</Text>
            <Input style={styles.inputContainer}>
              <InputField value={phone} onChangeText={setPhone} type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text  style={defaultStyles.TypographyBodyHeavy}>Password</Text>
            <Input textAlign="center" style={styles.inputContainer}>
              <InputField value={password} onChangeText={handlePasswordChange} type={showPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={handlePasswordState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>

          <VStack space="xs">
            <Text  style={defaultStyles.TypographyBodyHeavy}>Confirm Password</Text>
            <Input textAlign="center" style={styles.inputContainer}>
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
          }} disabled={!isMatched} style={styles.submitButton}>
            <ButtonText style={[styles.submitButtonText, defaultStyles.TypographyBodyHeavy]}>Create Account</ButtonText>
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <LinkText style={[styles.callToNavigate , defaultStyles.TypographyLink]}>Already have an account?</LinkText>
          </TouchableOpacity>
        </VStack>
      </FormControl>
      <View style={styles.circlesContainer}>
        <View style={[styles.circle, styles.circleYellow]} />
        <View style={[styles.circle, styles.circleRed]} />
        <View style={[styles.circle, styles.circleBlue]} />
      </View>
    </View>
  );
}

// Define styles at the bottom of the component file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.tokens.colors.background,
    position: 'relative',
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  formBox: {
    backgroundColor: 'white',
    borderRadius: config.tokens.borderRadius.md,
    padding: config.tokens.spacing.md,
    borderColor: 'transparent',
    width: width * 0.9, 
    maxWidth: 400, 
    minWidth: 300, 
    shadowColor: '#000006', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.06, 
    shadowRadius: 5, 
    elevation: 5, 
    zIndex: 10,
  },
  heading: {
    textAlign: 'center',
  },
  inputContainer: {
    borderRadius: config.tokens.borderRadius.sm,
    borderColor: '#00000080',
    borderWidth: 0.5,
  },
  submitButton: {
    backgroundColor: config.tokens.colors.primaryDark,
    borderRadius: config.tokens.borderRadius.sm,
    marginHorizontal: 'auto',
    
  },
  submitButtonText:{

  },
  textInfo: {
    color: config.tokens.colors.textInfo,
    paddingBottom: config.tokens.spacing.sm,
    textAlign: 'center',
  },
  callToNavigate: {
    color: config.tokens.colors.primaryDark,
    textAlign: 'center',
    zIndex:2
  },
  
  circlesContainer: {
    position: 'absolute',
    bottom: -180,
    width: width,
    height: height * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: config.tokens.borderRadius.xl,
  },
  circleYellow: {
    backgroundColor: config.tokens.colors.mediumPriority,
    zIndex: 0,
  },
  circleRed: {
    backgroundColor: config.tokens.colors.highPriority,
    zIndex: 1,
  },
  circleBlue: {
    backgroundColor: config.tokens.colors.blue,
    zIndex: 0,
  },
});


export default SignUpScreen;