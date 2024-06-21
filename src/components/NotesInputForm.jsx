import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import usecreateTaskStore from "../store/createTaskStore";

const NotesInputForm = () => {
  const { notes, setNotes } = usecreateTaskStore((state) => ({
    notes: state.notes,
    setNotes: state.setNotes,
  }));
  console.log("notes" + notes);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Add notes"
        value={notes}
        onChangeText={setNotes}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default NotesInputForm;
