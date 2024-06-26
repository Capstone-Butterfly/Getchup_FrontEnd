import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddTaskDateContainer from "../../components/AddTaskDateContainer";
import AddTaskTimeContainer from "../../components/AddTaskTimeContainer";

const DateTimeModelScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.title}>Date and Time</Text>
      <AddTaskDateContainer />
      <AddTaskTimeContainer />
    </SafeAreaView>
  );
};

export default DateTimeModelScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
});
