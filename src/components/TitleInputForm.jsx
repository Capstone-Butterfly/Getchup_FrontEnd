import React from "react";
import { TextInput, StyleSheet } from "react-native";
import usecreateTaskStore from "../store/createTaskStore";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";
import {
  Card,
  View,
} from "@gluestack-ui/themed";

const TitleInputForm = () => {
  const { title, setTitle } = usecreateTaskStore((state) => ({
    title: state.title,
    setTitle: state.setTitle,
  }));

  return (
    <Card style={defaultStyles.card}>
      <View style={styles.container}> 
        <TextInput
          style={[defaultStyles.TypographyH2, styles.input]}
          placeholder="Add Task Title"
          placeholderTextColor={config.tokens.colors.lighterBlack}
          value={title}
          onChangeText={setTitle}
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
    height: 40,
    width: 295,
    borderBottomColor: config.tokens.colors.lighterBlack,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
});

export default TitleInputForm;
