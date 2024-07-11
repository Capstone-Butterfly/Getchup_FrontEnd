import React from "react";
import { TextInput, StyleSheet } from "react-native";
import usecreateTaskStore from "../store/createTaskStore";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";
import { Card, View } from "@gluestack-ui/themed";

const NotesInputForm = () => {
  const { notes, setNotes } = usecreateTaskStore((state) => ({
    notes: state.notes,
    setNotes: state.setNotes,
  }));
  

  return (
    <Card styles={defaultStyles.card}>
      <View styles={defaultStyles.card}>
        <TextInput
          style={[defaultStyles.TypographyH2, styles.input]}
          placeholder="Add notes"
          placeholderTextColor={config.tokens.colors.lighterBlack}
          value={notes}
          onChangeText={setNotes}
          multiline={true}
          numberOfLines={2}
          textAlignVertical="top"
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  input: {
    width: 295,
    height: 40,
    borderBottomColor: config.tokens.colors.lighterBlack,
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default NotesInputForm;
