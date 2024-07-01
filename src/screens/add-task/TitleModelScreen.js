import React from "react";
import { Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleInputForm from "../../components/TitleInputForm";
import TaskLibraryContainer from "../../components/TaskLibraryContainer"

const TitleModelScreen = () => {
  return (
    <SafeAreaView>
      <TitleInputForm />
      <TaskLibraryContainer />
    </SafeAreaView>
  );
};

export default TitleModelScreen;


