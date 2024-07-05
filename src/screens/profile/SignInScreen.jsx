import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Center, EyeIcon, EyeOffIcon, LinkText } from '@gluestack-ui/themed';
import { ButtonText, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
import profileStore from '../../store/profileStore';
import { useMutation } from '@tanstack/react-query';
import { signInProfile, userDataProfile } from '../../services/profile';
import { config } from '../../styles/themeConfig'; // Import the theme configuration

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
      <FormControl
        p="$4"
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        $dark-borderWidth="$1"
        $dark-borderRadius="$lg"
        $dark-borderColor="$borderDark800"
        style={styles.formBox}
      >
        <VStack space="xl">
          <Heading style={styles.heading}>Sign In</Heading>
          <VStack space="xs">
            <Text style={styles.inputLabel}>Email</Text>
            <Input style={styles.inputContainer} >
              <InputField
                value={email}
                onChangeText={setEmail}
                type="text"
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text style={styles.inputLabel}>Password</Text>
            <Input style={styles.inputContainer}>
              <InputField
                value={password}
                onChangeText={setPassword}
                type={showPassword ? "text" : "password"}
              />
              <InputSlot pr="$3" onPress={handlePasswordVisibility}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>
          
          <Button style={styles.submitButton} onPress={handleLogin} isLoading={isLoading}>
            <ButtonText style={styles.submitButtonText}>Sign In</ButtonText>
          </Button>
         <Text style={styles.textInfo}>
         Do not have an Account yet?
         </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <LinkText style={styles.callToNavigate}>Create an account!</LinkText>
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
    padding: config.tokens.spacing.lg,
    backgroundColor: config.tokens.colors.background,
    position: 'relative',
  },
  heading: {
    color: config.tokens.colors.primaryDark,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
  },
  inputLabel: {
    color: config.tokens.colors.secondary,
    fontWeight: '900',
    fontSize: 18,
    paddingBottom: config.tokens.spacing.xs,
  },
  inputContainer: {
    borderRadius: config.tokens.borderRadius.sm,
    borderColor: config.tokens.colors.inputBorder,
    borderWidth: 0.5,
  },
  submitButton: {
    backgroundColor: config.tokens.colors.primaryDark,
    borderRadius: config.tokens.borderRadius.sm,
    fontSize: 20,
    alignSelf: 'flex-start',
    marginVertical: config.tokens.spacing.md,
    marginHorizontal: 'auto',
  },
  textInfo: {
    color: config.tokens.colors.textInfo,
    fontWeight: '1000',
    fontSize: 18,
    paddingBottom: config.tokens.spacing.sm,
    textAlign: 'center',
  },
  callToNavigate: {
    color: config.tokens.colors.secondary,
    textAlign: 'center',
  },
  formBox: {
    backgroundColor: 'white',
    borderRadius: config.tokens.borderRadius.md,
    padding: config.tokens.spacing.md,
    borderColor: config.tokens.colors.borderColor,
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