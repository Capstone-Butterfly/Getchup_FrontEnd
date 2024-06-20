import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch, HStack } from "@gluestack-ui/themed";
import useReminderStore from "../store/reminderStore";

const ToggleSwitch = () => {
  const { taskReminder, setTaskReminder } = useReminderStore((state) => ({
    taskReminder: state.taskReminder,
    setTaskReminder: state.setTaskReminder,
  }));

  const toggleSwitch = () => {
    setTaskReminder(!taskReminder);
  };

  return (
    <View style={styles.container}>
      <HStack alignItems="center" spacing="2">
        <Text>Track Movement</Text>
        <Switch
          size="sm"
          isDisabled={false}
          value={taskReminder}
          onToggle={toggleSwitch}
        />
      </HStack>
    </View>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
