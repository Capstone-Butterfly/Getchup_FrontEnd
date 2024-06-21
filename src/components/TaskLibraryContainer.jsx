import React from "react";
import { View, Text,StyleSheet } from "react-native";
import TaskLibraryTab from "./TaskLibraryTab";

const TaskLibraryContainer = () => {

  return (
    <View >
       <Text>Pick task from library</Text>
       <TaskLibraryTab />
    </View>
  );
};

export default TaskLibraryContainer;
