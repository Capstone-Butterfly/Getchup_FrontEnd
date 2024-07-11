import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Center, EyeIcon, EyeOffIcon, LinkText } from '@gluestack-ui/themed';
import { ButtonText, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
import profileStore from '../../store/profileStore';
import { useMutation } from '@tanstack/react-query';
import { signInProfile, userDataProfile } from '../../services/profile';
import { config } from '../../styles/themeConfig'; 
import { defaultStyles } from './../../styles/styles'

// Get device dimensions
const { width, height } = Dimensions.get('window');

function SignInScreen() {
  const { email, password, setIsLogin, setEmail, setPassword, setUserId, setToken, setPhone, setLastName, setFirstName, setNotification, setTaskReminder, setMovementReminder, setUserType, setSurveyDone } = profileStore((state) => state);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: handleLogin, isLoading } = useMutation(
    {
      mutationFn: async () => {
        const data = await signInProfile(email, password);
        return data;
      },
      onSuccess: async (data) => {
        setToken(data.token);
        setUserId(data.userId);

        const userData = await userDataProfile(data.userId);
        console.log(userData);
        setPhone(userData.profile.phone);
        setNotification(userData.profile.notification);
        setTaskReminder(userData.profile.task_reminder);
        setUserType(userData.profile.user_type);
        setMovementReminder(userData.profile.movement_reminder);
        setEmail(userData.user.email);
        setFirstName(userData.user.first_name);
        setLastName(userData.user.last_name);
        setIsLogin(true);

        setSurveyDone(true);
        navigation.navigate('HomeScreen');
      },
      onError: () => {
        Alert.alert('Login failed', 'Invalid email or password');
      },
    }
  );

  const handlePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <FormControl style={styles.formBox}>
        <VStack space="xl">
          <Heading style={[styles.heading, defaultStyles.TypographyH1 ]}>Sign In</Heading>
          <VStack space="xs">
            <Text style={defaultStyles.TypographyBodyHeavy}>Email</Text>
            <Input style={styles.inputContainer} >
              <InputField
                value={email}
                onChangeText={setEmail}
                type="text"
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text style={defaultStyles.TypographyBodyHeavy}>Password</Text>
            <Input style={styles.inputContainer}>
              <InputField
                value={password}
                onChangeText={setPassword}
                type={showPassword ? "text" : "password"}
              />
              <InputSlot  onPress={handlePasswordVisibility}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>
          
          <Button style={styles.submitButton} onPress={handleLogin} isLoading={isLoading}>
            <ButtonText style={[styles.submitButtonText, defaultStyles.TypographyBodyHeavy]}>Sign In</ButtonText>
          </Button>
         <Text style={[styles.textInfo , defaultStyles.TypographyBodyHeavy]}>
         Do not have an Account yet?
         </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <LinkText style={[styles.callToNavigate , defaultStyles.TypographyLink]}>Create an account!</LinkText>
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
  },
  circleRed: {
    backgroundColor: config.tokens.colors.highPriority,
    zIndex: 10,
  },
  circleBlue: {
    backgroundColor: config.tokens.colors.blue,
  },
});

export default SignInScreen;