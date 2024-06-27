import React from "react";
import { Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleInputForm from "../../components/TitleInputForm";
import ToggleSwitch from "../../components/ToggleSwitch";
import TaskLibraryContainer from "../../components/TaskLibraryContainer"

const TitleModelScreen = () => {
  return (
    <SafeAreaView>
      <Text>Add Task Title</Text>
      <TitleInputForm />
      <ToggleSwitch />
      <TaskLibraryContainer />
    </SafeAreaView>
  );
};

export default TitleModelScreen;

