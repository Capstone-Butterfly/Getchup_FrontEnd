import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import TitleInputForm from "../../components/TitleInputForm";
import TaskLibraryContainer from "../../components/TaskLibraryContainer";

const TitleModelScreen = () => {
  const data = [{ key: 'TaskLibraryContainer' }];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <TaskLibraryContainer />}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={<TitleInputForm />}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default TitleModelScreen;