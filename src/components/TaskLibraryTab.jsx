import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useAddTaskTitleStore from "../store/addTaskTitleModelStore";
import { FlatList } from "@gluestack-ui/themed";
import { fetchCommonTasks } from "../services/taskLibraryApi";
import { useQuery } from "@tanstack/react-query";
import usecreateTaskStore from "../store/createTaskStore";

const CommonTasks = ({ fetchedCommonTask, activeTab }) => {
  const { title,subTasks, setTitle, addSubtask } = usecreateTaskStore((state) => ({
    title: state.title,
    subTasks: state.subTasks,
    setTitle: state.setTitle,
    addSubtask: state.addSubtask,
  }));

  console.log("title" + title);
  console.log("addSubtask" + JSON.stringify(subTasks));
  return (
    <View style={styles.tabContent}>
      <View>
        <FlatList
          data={fetchedCommonTask}
          renderItem={({ item }) => (
            <View key={item._id}>
              <Text style={styles.categoryHeading}>{item._id}</Text>
              {item.tasks.map((task) => (
                <TouchableOpacity
                  onPress={() => {
                    setTitle(task.title);
                    addSubtask(task.subtask);
                  }}
                >
                  <Text key={task._id} style={styles.taskTitle}>
                    {task.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const CreatedTasks = () => (
  <View style={styles.tabContent}>
    <Text>Created Tasks Content</Text>
  </View>
);

const TaskLibraryTab = () => {
  const { activeTab, setActiveTab } = useAddTaskTitleStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }));

  const {
    data: fetchedCommonTask,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["commonTasks"],
    queryFn: () => fetchCommonTasks(),
  });
  console.log("fetchedCommonTask" + fetchedCommonTask);

  return (
    <View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "CommonTasks" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("CommonTasks")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "CommonTasks" && styles.activeTabText,
            ]}
          >
            Common tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "CreatedTasks" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("CreatedTasks")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "CreatedTasks" && styles.activeTabText,
            ]}
          >
            Created by you
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {activeTab === "CommonTasks" && (
          <CommonTasks
            fetchedCommonTask={fetchedCommonTask}
            activeTab={activeTab}
            // setTltle={setTltle}
            // addSubtask={addSubtask}
          />
        )}
        {activeTab === "CreatedTasks" && <CreatedTasks />}
      </View>
    </View>
  );
};

export default TaskLibraryTab;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabButton: {
    padding: 15,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#545F71",
  },
  activeTabText: {
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 20,
  },
  categoryHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  taskTitle: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
  },
});