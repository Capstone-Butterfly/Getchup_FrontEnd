import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { VStack, FormControl, Heading, Button, ButtonText } from '@gluestack-ui/themed';
import SettingsSwitch from '../../components/SettingsSwitch';
import profileStore from '../../store/profileStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function UserSettingsScreen({ navigation }) {
  const queryClient = useQueryClient();
  const { userId, notification, movement_reminder, task_reminder, setNotification, setMovementReminder, setTaskReminder } = profileStore((state) => state);


  const mutation = useMutation({
    mutationFn: async () => {


      const updatedSettings = {
        task_reminder: task_reminder,
        movement_reminder:movement_reminder,
        notification:notification,
      };
      console.log(updatedSettings);

      const response = await fetch(`http://52.55.48.104:8080/api/v1/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettings),
      });
      if (!response.ok) {
        throw new Error('Failed to update user settings');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userData', 'userId']);
      Alert.alert('Success', 'User settings updated successfully.');
    },
    onError: (error) => {
      console.error('Error updating user settings:', error);
      Alert.alert('Error', 'Failed to update user settings. Please try again.');
    }
  });

  // Toggle switch handler to update the Zustand store and trigger the mutation
  const toggleSwitch = (field) => {
    switch (field) {
      case "task_reminder":
        setTaskReminder(!task_reminder);
        break;
      case "movement_reminder":
        setMovementReminder(!movement_reminder);
        break;
      case "notification":
        setNotification(!notification);
        break
    };
    mutation.mutate(); 
  };

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
              <ButtonText>Back</ButtonText>
            </Button>
            <Heading color="$text900" lineHeight="$md">
              Settings
            </Heading>

            <>
              <SettingsSwitch
                label="Task Reminder"
                value={task_reminder}
                onToggle={() => toggleSwitch('task_reminder')}
              />

              <SettingsSwitch
                label="Movement Reminder"
                value={movement_reminder}
                onToggle={() => toggleSwitch('movement_reminder')}
              />

              <SettingsSwitch
                label="Notifications"
                value={notification}
                onToggle={() => toggleSwitch('notification')}
              />
            </>

          </VStack>
        </FormControl>
      </View>
    </ScrollView>
  );
}

export default UserSettingsScreen;

