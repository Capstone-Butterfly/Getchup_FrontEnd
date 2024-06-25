import React from 'react';
import { Text, HStack, Switch } from '@gluestack-ui/themed';

const SettingsSwitch = ({ label, value, onToggle }) => {
  return (
    <HStack space="xs">
      <Text color="$text500" lineHeight="$xs">
        {label}
      </Text>
      <Switch value={value} onValueChange={onToggle} />
    </HStack>
  );
};

export default SettingsSwitch;
