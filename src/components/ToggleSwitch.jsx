import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch, HStack, Box } from "@gluestack-ui/themed";
import useCreateTaskStore from "../store/createTaskStore";
import { config } from '../styles/themeConfig'; // Import the theme configuration
import { defaultStyles } from '../styles/styles'

const ToggleSwitch = () => {
  const { movement_reminder, setMovementReminder } = useCreateTaskStore((state) => ({
    movement_reminder: state.movement_reminder,
    setMovementReminder: state.setMovementReminder,
  }));

  const toggleSwitch = () => {
    setMovementReminder(!movement_reminder);
  };

  return (
    <View style={styles.container}>
      <HStack alignItems="center" spacing="2">
        <Box width="80%">
          <Text style={[defaultStyles.TypographyBody]}>Track Movement</Text>
        </Box>
        <Box width="20%" style={styles.rightItem}>
          <Switch
            size="sm"
            isDisabled={false}
            value={movement_reminder}
            onToggle={toggleSwitch}
            trackColor={{ false: '#767577', true: config.tokens.colors.primaryDark }}
            //ios_backgroundColor="#3e3e3e"
          />
        </Box>
        
      </HStack>
    </View>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    // flexDirection: "row",
    // justifyContent: "space-around",
  },
  rightItem: {
      alignItems: 'flex-end',
      //borderWidth: 1,
      //borderColor: '#ccc',
  },
});
