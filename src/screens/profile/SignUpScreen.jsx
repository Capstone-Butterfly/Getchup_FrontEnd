import { EyeIcon, EyeOffIcon, Link, LinkText } from '@gluestack-ui/themed';
import { ButtonText, FormControl, Heading, Input, InputField, InputIcon, InputSlot, VStack, Button } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleConfirmPasswordState = () => {
    setShowConfirmPassword((showState) => !showState);
  };

  return (
    <View>
      <Text fontWeight="bold">Sign Up</Text>
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
            Create New Account
          </Heading>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              First Name
            </Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Last Name
            </Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Email
            </Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Phone No.
            </Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Date of Birth
            </Text>
            <Input>
              <InputField type="text" placeholder="MM / DD / YYYY" />
              <InputSlot pr="$3">
                <InputIcon as={EyeIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Password
            </Text>
            <Input textAlign="center">
              <InputField type={showPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={handlePasswordState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Confirm Password
            </Text>
            <Input textAlign="center">
              <InputField type={showConfirmPassword ? "text" : "password"} />
              <InputSlot pr="$3" onPress={handleConfirmPasswordState}>
                <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>

          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Location
            </Text>
            <Input>
              <InputField type="text" />
              <InputSlot pr="$3">
                <InputIcon as={EyeIcon} color="$darkBlue500" />
              </InputSlot>
            </Input>
          </VStack>

          <Button backgroundColor="$blue" href="https://gluestack.io/">
            <ButtonText>Create Account</ButtonText>
          </Button>

          <Text>Already have an Account?</Text>
          <Link href="https://gluestack.io/">
            <LinkText>See more</LinkText>
          </Link>
        </VStack>
      </FormControl>
    </View>
  );
}

export default SignUpScreen;