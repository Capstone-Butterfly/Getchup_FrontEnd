import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { VStack, HStack, Icon, Input, InputField, FormControl, Heading, Button, ButtonText, Image } from '@gluestack-ui/themed';
import { EditIcon } from '@gluestack-ui/themed';
import { updateUserProfile, userDataProfile } from '../../services/profile';
import profileStore from '../../store/profileStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function EditProfileScreen({ navigation }) {

  const { email, first_name, last_name, profile_img, password, phone, userId, setPhone, setLastName, setFirstName, setEmail, setPassword } = profileStore((state) => state);


  const [editableField, setEditableField] = useState('');



  const mutation = useMutation({
    mutationFn: async () => {
      const userInfo = {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        phone: phone,
      };
      return updateUserProfile(userId, userInfo);
    },
    onSuccess: () => {
      Alert.alert('Success', 'User profile updated successfully.');
    },
    onError: (error) => {
      console.error('Error updating user data:', error);
      Alert.alert('Error', 'Failed to update user data. Please try again.');
    }
  });

  const handleEdit = (field) => {
    setEditableField((prevField) => (prevField === field ? '' : field));
  };
  // const handleInputChange = (field, value) => {
  //   setUserInfo({ ...userInfo, [field]: value });
  // };

  const handleSubmit = () => {
    mutation.mutate();
  };


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
            <ButtonText>Back</ButtonText>
          </Button>
          <Heading color="$text900" lineHeight="$md">
            User Profile
          </Heading>

          <VStack space="xs">
            <HStack justifyContent="space-between" alignItems="center">
              <Image
                size="md"
                borderRadius="$none"
                source={{
                  uri: profile_img,
                }}
              />
            </HStack>
          </VStack>
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
                  value={first_name}
                  onChangeText={(value) => setFirstName(value)}
                  type="text"
                />
              </Input>
            ) : (
              <Text>{first_name}</Text>
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
                  value={last_name}
                  onChangeText={(value) => setLastName(value)}
                  type="text"
                />
              </Input>
            ) : (
              <Text>{last_name}</Text>
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
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  type="text"
                />
              </Input>
            ) : (
              <Text>{email}</Text>
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
                  value={phone}
                  onChangeText={(value) => setPhone(value)}
                  type="text"
                />
              </Input>
            ) : (
              <Text>{phone}</Text>
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
                  value={password}
                  onChangeText={(value) => setPassword('password', value)}
                  type="password"
                />
              </Input>
            ) : (
              <Text>*********</Text> 
            )}
          </VStack>

        </VStack>
      </FormControl>

      <Button onPress={handleSubmit}>
        <ButtonText>Save Changes</ButtonText>
      </Button>
    </View >
  );
}

export default EditProfileScreen;