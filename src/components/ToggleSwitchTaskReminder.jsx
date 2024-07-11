import React from "react";
import { Text, StyleSheet } from "react-native";
import { Switch } from "@petros-g/react-native-switch";
import useCreateTaskStore from "../store/createTaskStore";
import { HStack } from "@gluestack-ui/themed";
import { config } from "../styles/themeConfig";
import { defaultStyles } from "../styles/styles";
import { Card, View } from "@gluestack-ui/themed";

const ToggleSwitchTaskReminder = () => {
  const { task_reminder, setTaskReminder } = useCreateTaskStore();

  const toggleSwitch = () => {
    setTaskReminder(!task_reminder);
  };

  return (
    <Card style={[defaultStyles.card]}>
    <View style={[styles.container]}>
      <HStack style={styles.hstack}>
        <Text style={[defaultStyles.TypographyBodyHeavy, styles.text]}>
          Notify Me
        </Text>
        <Switch
          disabled={false}
          value={task_reminder}
          onValueChange={toggleSwitch}
          enableDrag={false}
          trackWidth={32}
          trackHeight={16}
          circleSize={8}
          circleOffset={-3}
          circleActiveColor="white"
          trackActiveColor={config.tokens.colors.primaryDark}
          trackInactiveColor={config.tokens.colors.neutral}
          animationDuration={200}
          style={styles.switch}
        />
      </HStack>
    </View>
    </Card>
  );
};

export default ToggleSwitchTaskReminder;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: 295,
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
    color: config.tokens.colors.lightBlack
  },
});
