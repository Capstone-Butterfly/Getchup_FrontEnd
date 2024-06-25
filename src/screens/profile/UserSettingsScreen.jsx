import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { VStack, FormControl, Heading, Button, ButtonText } from '@gluestack-ui/themed';
import SettingsSwitch from '../../components/SettingsSwitch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserProfile, userDataProfile } from '../../services/profile';
import useUserStore from '../../store/useUserStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserSettingsScreen({navigation}) {
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
        notification: fetchUser.profile.notification || '',
        movement_reminder: fetchUser.profile.movement_reminder || '',
        task_reminder: fetchUser.profile.task_reminder || '',
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

  const toggleSwitch = async (field) => {
    const updatedUserInfo = { ...userInfo, [field]: !userInfo[field] };
    setUserInfo(updatedUserInfo);
    await mutation.mutate(updatedUserInfo);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading user data</Text>;
  }

  return (
    <ScrollView>
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
              Settings
            </Heading>

            <SettingsSwitch
              label="Task Reminder"
              value={userInfo.task_reminder}
              onToggle={() => toggleSwitch('task_reminder')}
            />

            <SettingsSwitch
              label="Movement Reminder"
              value={userInfo.movement_reminder}
              onToggle={() => toggleSwitch('movement_reminder')}
            />

            <SettingsSwitch
              label="Notifications"
              value={userInfo.notification}
              onToggle={() => toggleSwitch('notification')}
            />
          </VStack>
        </FormControl>
      </View>
    </ScrollView>
  );
}

export default UserSettingsScreen;
