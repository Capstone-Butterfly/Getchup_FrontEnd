import React from 'react';
import { View, Text } from 'react-native';
import { VStack, HStack, Icon, Button, FormControl, Heading } from '@gluestack-ui/themed';
import { EyeIcon } from '@gluestack-ui/themed';

function ProfileHomeScreen({ navigation }) {
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
          <Heading color="$text900" lineHeight="$md">
            Profile
          </Heading>
    
          <Button onPress={() => navigation.navigate('EditProfile')} variant="outline">
            <HStack space="xs">
              <Icon as={EyeIcon} />
              <Text>User Info</Text>
            </HStack>
          </Button>

          <Button onPress={() => navigation.navigate('UserSettings')} variant="outline">
            <HStack space="xs">
              <Icon as={EyeIcon} />
              <Text>Settings</Text>
            </HStack>
          </Button>

          <Button onPress={() => navigation.navigate('ConfirmLogout')} variant="outline">
            <HStack space="xs">
              <Icon as={EyeIcon} />
              <Text>Logout</Text>
            </HStack>
          </Button>
        </VStack>
      </FormControl>
    </View>
  );
}

export default ProfileHomeScreen;