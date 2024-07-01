import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch, HStack } from "@gluestack-ui/themed";
import useCreateTaskStore from "../store/createTaskStore";

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
        <Text>Track Movement</Text>
        <Switch
          size="sm"
          isDisabled={false}
          value={movement_reminder}
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
