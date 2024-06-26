import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EyeIcon, EyeOffIcon, LinkText } from '@gluestack-ui/themed';
import { ButtonText, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
import profileStore from '../../store/profileStore';
import { useMutation } from '@tanstack/react-query';
import { signInProfile, userDataProfile } from '../../services/profile';

function SignInScreen() {
  const { email, password, userId, setEmail, setPassword, setUserId, setToken, setPhone, setLastName, setFirstName, setNotification, setTaskReminder, setMovementReminder, setUserType, setSurveyDone } = profileStore((state) => state);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);



  const { mutate: handleLogin, isLoading, mutationFn } = useMutation(
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
    <View>
      <Text fontWeight="bold">Sign In</Text>
      <FormControl
        p="$4"
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        $dark-borderWidth="$1"
        $dark-borderRadius="$lg"
        $dark-borderColor="$borderDark800"
      >
        <VStack space="xl">
          <Heading color="$text900" lineHeight="$md">Login</Heading>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Email</Text>
            <Input>
              <InputField
                value={email}
                onChangeText={setEmail}
                type="text"
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">Password</Text>
            <Input textAlign="center">
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
          <Button backgroundColor='$blue' onPress={handleLogin} isLoading={isLoading}>
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






// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { EyeIcon, EyeOffIcon, LinkText } from '@gluestack-ui/themed';
// import { ButtonText, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
// import signInStore from '../../store/signInStore';
// import { useMutation } from '@tanstack/react-query';
// import { signInProfile } from '../../services/profile';

// function SignInScreen() {
//   const { email, setEmail, password, setPassword } = signInStore(); // Access the Zustand store
//   const navigation = useNavigation();
//   const [showPassword, setShowPassword] = useState(false);

//   const { mutate: handleLogin, isLoading, mutationFn } = useMutation(
//     {
//       mutationFn: async () => {
//         const data = await signInProfile(email, password);
//         return data;
//       },
//         onSuccess: async (data) => {
//             // Save token in AsyncStorage
//             await AsyncStorage.setItem('token', data.token);
//             await AsyncStorage.setItem('userId', data.userId);
//             // Navigate to home page
//             navigation.navigate('HomeScreen');
//         },
//         onError: () => {
//             Alert.alert('Login failed', 'Invalid email or password');
//         },
//     }
//   );

//   const handlePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   return (
//     <View>
//       <Text fontWeight="bold">Sign In</Text>
//       <FormControl
//         p="$4"
//         borderWidth="$1"
//         borderRadius="$lg"
//         borderColor="$borderLight300"
//         $dark-borderWidth="$1"
//         $dark-borderRadius="$lg"
//         $dark-borderColor="$borderDark800"
//       >
//         <VStack space="xl">
//           <Heading color="$text900" lineHeight="$md">Login</Heading>
//           <VStack space="xs">
//             <Text color="$text500" lineHeight="$xs">Email</Text>
//             <Input>
//               <InputField
//                 value={email}
//                 onChangeText={setEmail}
//                 type="text"
//               />
//             </Input>
//           </VStack>
//           <VStack space="xs">
//             <Text color="$text500" lineHeight="$xs">Password</Text>
//             <Input textAlign="center">
//               <InputField
//                 value={password}
//                 onChangeText={setPassword}
//                 type={showPassword ? "text" : "password"}
//               />
//               <InputSlot pr="$3" onPress={handlePasswordVisibility}>
//                 <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
//               </InputSlot>
//             </Input>
//           </VStack>
//           <Button backgroundColor='$blue' onPress={handleLogin} isLoading={isLoading}>
//             <ButtonText>Save</ButtonText>
//           </Button>
//           <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//             <LinkText>Create an account!</LinkText>
//           </TouchableOpacity>
//         </VStack>
//       </FormControl>
//     </View>
//   );
// }

// export default SignInScreen;

