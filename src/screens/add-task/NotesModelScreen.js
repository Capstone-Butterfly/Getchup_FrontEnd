import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotesInputForm from "../../components/NotesInputForm";

const NotesModelScreen = () => {
  return (
    <SafeAreaView>
      <Text>Notes</Text>
      <NotesInputForm />
    </SafeAreaView>
  );
};

export default NotesModelScreen;
