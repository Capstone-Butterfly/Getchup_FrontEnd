import React from "react";
import { Text,View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddTaskDateContainer from "../../components/AddTaskDateContainer";
import AddTaskTimeContainer from "../../components/AddTaskTimeContainer";
import ToggleSwitchTaskReminder from "../../components/ToggleSwitchTaskReminder";
import useDateTimeModelVisibleStore from "../../store/dateTimeModelVisible";

const DateTimeModelScreen = () => {

  const components = [
    { key: "date", component: <AddTaskDateContainer /> },
    { key: "time", component: <AddTaskTimeContainer /> },
    { key: "reminder", component: <ToggleSwitchTaskReminder /> },
  ];

  const renderItem = ({ item }) => {
    return <>{item.component}</>;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <FlatList
      data={components}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.contentContainer}
    />
    </SafeAreaView>
  );
};

export default DateTimeModelScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
