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
      <HStack style={styles.hstack}>
          <Text style={[defaultStyles.TypographyBodyHeavy, styles.text]}>Track Movement</Text>
          <Switch
            size="sm"
            isDisabled={false}
            value={movement_reminder}
            onToggle={toggleSwitch}
            trackColor={{ false: config.tokens.colors.neutral, true: config.tokens.colors.primaryDark }}
          />
      </HStack>
    </View>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
  },
  hstack: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      
  },
  switch: {
      flexGrow: 0,
  },
  text: {
      flexGrow: 1,
  },
});
