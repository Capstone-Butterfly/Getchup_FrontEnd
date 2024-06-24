import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import usecreateTaskStore from '../store/createTaskStore';

const TitleInputForm = () => {

    const { title, setTitle } = usecreateTaskStore((state) => ({
        title: state.title,
        setTitle: state.setTitle,
    }));

  return (
    <View >
      <TextInput
        style={styles.input}
        placeholder="Add Task Title"
        value={title}
        onChangeText={setTitle}
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

export default TitleInputForm;
