import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { VStack, HStack, Icon, Input, InputField, FormControl, Heading, Button, ButtonText } from '@gluestack-ui/themed';
import { EditIcon } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserProfile, userDataProfile } from '../../services/profile';
import useUserStore from '../../store/useUserStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function EditProfileScreen({ navigation }) {
  const queryClient = useQueryClient();
  const { userInfo, setUserInfo, editableField, setEditableField } = useUserStore();

  const { data: fetchUser, isLoading, error } = useQuery({
    queryKey: ['userData', 'userId'],
    queryFn: async () => {
      const userID = await AsyncStorage.getItem('userId');
      return userDataProfile(userID);
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (fetchUser) {
      setUserInfo({
        first_name: fetchUser.user.first_name || '',
        last_name: fetchUser.user.last_name || '',
        email: fetchUser.user.email || '',
        phone: fetchUser.profile.phone || '',
        password: '', // Initialize password from fetched data if needed
      });
    }
  }, [fetchUser]);

  const mutation = useMutation({
    mutationFn: async (userInfo) => {
      const userID = await AsyncStorage.getItem('userId');
      return updateUserProfile(userID, userInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userData', 'userId']);
      Alert.alert('Success', 'User profile updated successfully.');
    },
    onError: (error) => {
      console.error('Error updating user data:', error);
      Alert.alert('Error', 'Failed to update user data. Please try again.');
    }
  });

  const handleEdit = (field) => {
    setEditableField(field);
  };

  const handleInputChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const handleSubmit = () => {
    mutation.mutate(userInfo);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading user data</Text>;
  }

  return (
    <View>
      <Text fontWeight="bold">Getchup</Text>
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
          <Button onPress={() => navigation.navigate('ProfileHome')} variant="outline">
            <ButtonText>
              Back
            </ButtonText>
            
          </Button> 
          <Heading color="$text900" lineHeight="$md">
            User Profile
          </Heading>

          <VStack space="xs">
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="$text500" lineHeight="$xs" flex={1}>
                FIRST NAME
              </Text>
              <TouchableOpacity onPress={() => handleEdit('first_name')}>
                <Icon as={EditIcon} />
              </TouchableOpacity>
            </HStack>
            {editableField === 'first_name' ? (
              <Input>
                <InputField
                  value={userInfo.first_name}
                  onChangeText={(value) => handleInputChange('first_name', value)}
                  type="text"
                />
              </Input>
            ) : (
              <Text>{userInfo.first_name}</Text>
            )}
          </VStack>

          <VStack space="xs">
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="$text500" lineHeight="$xs" flex={1}>
                LAST NAME
              </Text>
              <TouchableOpacity onPress={() => handleEdit('last_name')}>
                <Icon as={EditIcon} />
              </TouchableOpacity>
            </HStack>
            {editableField === 'last_name' ? (
              <Input>
                <InputField
                  value={userInfo.last_name}
                  onChangeText={(value) => handleInputChange('last_name', value)}
                  type="text"
                />
              </Input>
            ) : (
              <Text>{userInfo.last_name}</Text>
            )}
          </VStack>

          <VStack space="xs">
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="$text500" lineHeight="$xs" flex={1}>
                EMAIL
              </Text>
              <TouchableOpacity onPress={() => handleEdit('email')}>
                <Icon as={EditIcon} />
              </TouchableOpacity>
            </HStack>
            {editableField === 'email' ? (
              <Input>
                <InputField
                  value={userInfo.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  type="text"
                />
              </Input>
            ) : (
              <Text>{userInfo.email}</Text>
            )}
          </VStack>

          <VStack space="xs">
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="$text500" lineHeight="$xs" flex={1}>
                PHONE
              </Text>
              <TouchableOpacity onPress={() => handleEdit('phone')}>
                <Icon as={EditIcon} />
              </TouchableOpacity>
            </HStack>
            {editableField === 'phone' ? (
              <Input>
                <InputField
                  value={userInfo.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  type="text"
                />
              </Input>
            ) : (
              <Text>{userInfo.phone}</Text>
            )}
          </VStack>

          <VStack space="xs">
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="$text500" lineHeight="$xs" flex={1}>
                PASSWORD
              </Text>
              <TouchableOpacity onPress={() => handleEdit('password')}>
                <Icon as={EditIcon} />
              </TouchableOpacity>
            </HStack>
            {editableField === 'password' ? (
              <Input>
                <InputField
                  value={userInfo.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  type="password"
                />
              </Input>
            ) : (
              <Text>*********</Text> // Display placeholder for password
            )}
          </VStack>

        </VStack>
      </FormControl>

      <Button onPress={handleSubmit}>
        <ButtonText>Save Changes</ButtonText>
      </Button>
      
    </View>
  );
}

export default EditProfileScreen;
