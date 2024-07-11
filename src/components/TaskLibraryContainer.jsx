import React from "react";
import { Text, StyleSheet } from "react-native";
import { Card, View } from "@gluestack-ui/themed";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";
import TaskLibraryTab from "./TaskLibraryTab";

const TaskLibraryContainer = () => {
  return (
    <Card style={[defaultStyles.card]}>
      <View >
        <Text style={[defaultStyles.TypographyBodyHeavy, styles.text]}>
          Pick task from library
        </Text>
        <TaskLibraryTab />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  text: {
    color: config.tokens.colors.neutralDark,
    marginBottom: 10
  },
});

export default TaskLibraryContainer;
