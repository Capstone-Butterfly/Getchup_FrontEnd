import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch, HStack } from "@gluestack-ui/themed";
import profileStore from "../store/profileStore";

const ToggleSwitchTaskReminder = () => {
  const { task_reminder, setTaskReminder } = profileStore((state) => ({
    task_reminder: state.task_reminder,
    setTaskReminder: state.setTaskReminder,
  }));

  const toggleSwitch = () => {
    setTaskReminder(!task_reminder);
  };

  return (
    <View style={styles.container}>
      <HStack alignItems="center" spacing="2">
        <Text>Notify Me</Text>
        <Switch
          size="sm"
          isDisabled={false}
          value={task_reminder}
          onToggle={toggleSwitch}
        />
      </HStack>
    </View>
  );
};

export default ToggleSwitchTaskReminder;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
