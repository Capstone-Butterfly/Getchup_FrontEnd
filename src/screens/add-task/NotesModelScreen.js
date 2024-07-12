import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotesInputForm from "../../components/NotesInputForm";

const NotesModelScreen = () => {
  return (
    <View>
      {/* <Text style={styles.title}>Notes</Text> */}
      <NotesInputForm />
    </View>
  );
};

export default NotesModelScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
});
