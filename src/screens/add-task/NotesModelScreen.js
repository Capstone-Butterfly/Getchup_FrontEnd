import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import usecreateTaskStore from '../../store/createTaskStore';
import { config } from '../../styles/themeConfig'; // Import the theme configuration
import { defaultStyles } from './../../styles/styles'
import { Card, View } from "@gluestack-ui/themed";

const NotesModelScreen = () => {
  const { notes, setNotes } = usecreateTaskStore((state) => ({
    notes: state.notes,
    setNotes: state.setNotes,
  }));
  
  return (
    <>
      {/* <NotesInputForm /> */}
      <Card style={[defaultStyles.card, styles.card]}>
      <View style={styles.container}>
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
    </>
  );
};

export default NotesModelScreen;

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  card: {
    borderRadius: 20, 
  },
  input: {
    width: 295,
    height: 40,
    borderBottomColor: config.tokens.colors.lighterBlack,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
});
