import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { VStack, HStack, Button, FormControl, Heading, ButtonText } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileStore from '../../store/profileStore';

function ConfirmLogoutScreen({ navigation }) {

  const { clearToken, clearUserId} = profileStore((state) => state);
 
  const handleLogout = async () => {
    try {
      console.log('Logged out');
      clearToken();
      clearUserId();
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
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
            <Heading color="$text900" lineHeight="$md">
              Logout
            </Heading>
            <Text>Are you sure you want to Logout?</Text>
            <HStack space="md">
              <Button onPress={handleLogout} backgroundColor="$red500">
                <ButtonText>Logout</ButtonText>
              </Button>
              <Button onPress={() => navigation.goBack()} backgroundColor="$gray500">
                <ButtonText>Cancel</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </FormControl>
      </View>
    </ScrollView>
  );
}

export default ConfirmLogoutScreen;