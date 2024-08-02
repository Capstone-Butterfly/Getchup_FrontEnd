import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useAddTaskTitleStore from "../store/addTaskTitleModelStore";
import { FlatList } from "@gluestack-ui/themed";
import {
  fetchCommonTasks,
  fetchRepeatedTasks,
} from "../services/taskLibraryApi";
import { useQuery } from "@tanstack/react-query";
import usecreateTaskStore from "../store/createTaskStore";
import profileStore from "../store/profileStore";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";
import TasksIcon from "../../assets/icons/task-library-icon.svg";
import TasksIconWhite from "../../assets/icons/task-library-icon-white.svg";

const CommonTasks = ({
  fetchedCommonTask,
  pressedItemId,
  setPressedItemId,
}) => {
  const { title, subTasks, setTitle, addSubtask } = usecreateTaskStore(
    (state) => ({
      title: state.title,
      subTasks: state.subTasks,
      setTitle: state.setTitle,
      addSubtask: state.addSubtask,
    })
  );

  return (
    <View style={styles.tabContent}>
      <View>
        <FlatList
          data={fetchedCommonTask}
          renderItem={({ item }) => (
            <View key={item._id}>
              <Text
                style={[
                  styles.categoryHeading,
                  defaultStyles.TypographyBodySmallHeavy,
                ]}
              >
                {item._id}
              </Text>
              {item.tasks.map((task) => (
                <TouchableOpacity
                  key={task._id}
                  onPress={() => {
                    setTitle(task.title);
                    addSubtask(task.subtask);
                    setPressedItemId(task._id);
                  }}
                >
                  <View
                    style={[
                      styles.tabContentBackground,
                      styles.detailItem,
                      pressedItemId === task._id &&
                        styles.pressedItemBackground,
                    ]}
                  >
                    {task._id !== pressedItemId ? (
                      <TasksIcon style={styles.icon} />
                    ) : (
                      <TasksIconWhite style={styles.icon} />
                    )}

                    <Text
                      key={task._id}
                      style={[
                        styles.taskTitle,
                        defaultStyles.TypographyBodyHeavy,
                        pressedItemId === task._id && styles.pressedItemText,
                      ]}
                    >
                      {task.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 40 }} 
        />
      </View>
    </View>
  );
};

const CreatedTasks = ({
  fetchedRepeatedTask,
  pressedItemId,
  setPressedItemId,
}) => {
  const { title, subTasks, setTitle, addSubtask } = usecreateTaskStore(
    (state) => ({
      title: state.title,
      subTasks: state.subTasks,
      setTitle: state.setTitle,
      addSubtask: state.addSubtask,
    })
  );

  return (
    <View style={[styles.tabContent, {paddingTop : 10}]}>
      <FlatList
        data={fetchedRepeatedTask}
        renderItem={({ item }) => (
          <View key={item._id}>
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                setTitle(item.title);
                const updatedSubtasks = item.subtask.map(subtask => ({
                  ...subtask,
                  status: 'new'
                }));
                addSubtask(updatedSubtasks);
                setPressedItemId(item._id);
              }}
            >
              <View
                style={[
                  styles.tabContentBackground,
                  styles.detailItem,
                  pressedItemId === item._id && styles.pressedItemBackground,
                ]}
              >
                {item._id !== pressedItemId ? (
                  <TasksIcon style={styles.icon} />
                ) : (
                  <TasksIconWhite style={styles.icon} />
                )}
                <Text
                  key={item._id}
                  style={[
                    styles.taskTitle,
                    defaultStyles.TypographyBodyHeavy,
                    pressedItemId === item._id && styles.pressedItemText,
                  ]}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 40 }} 
      />
    </View>
  );
};

const TaskLibraryTab = () => {
  const [pressedItemId, setPressedItemId] = useState(null);

  const { activeTab, setActiveTab } = useAddTaskTitleStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }));

  const { userId } = profileStore((state) => ({
    userId: state.userId,
  }));

  const {
    data: fetchedCommonTask,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["commonTasks"],
    queryFn: () => fetchCommonTasks(),
  });

  const { data: fetchedRepeatedTask } = useQuery({
    queryKey: ["repeatedTasks"],
    queryFn: () => fetchRepeatedTasks(userId),
  });

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
              defaultStyles.TypographyBody,
              styles.tabText,
              activeTab === "CommonTasks" && [
                styles.activeTabText,
                defaultStyles.TypographyBodyHeavy,
              ],
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
              defaultStyles.TypographyBody,
              styles.tabText,
              activeTab === "CreatedTasks" && [
                styles.activeTabText,
                defaultStyles.TypographyBodyHeavy,
              ],
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
            pressedItemId={pressedItemId}
            setPressedItemId={setPressedItemId}
          />
        )}
        {activeTab === "CreatedTasks" && (
          <CreatedTasks
            fetchedRepeatedTask={fetchedRepeatedTask}
            pressedItemId={pressedItemId}
            setPressedItemId={setPressedItemId}
          />
        )}
      </View>
    </View>
  );
};

export default TaskLibraryTab;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tabButton: {
    padding: 15,
    paddingBottom: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: config.tokens.colors.neutralDark,
  },
  tabText: {
    color: config.tokens.colors.neutralDark,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: config.tokens.colors.primaryDark,
  },
  activeTabText: {
    // fontWeight: "bold",
    color: config.tokens.colors.primaryDark,
  },
  contentContainer: {
    padding: 5,
  },
  tabContentBackground: {
    borderRadius: 10,
    backgroundColor: config.tokens.colors.neutralLight,
    marginTop: 8,
  },
  categoryHeading: {
    fontSize: 14,
    marginTop: 10,
    color: config.tokens.colors.neutralDark,
  },
  taskTitle: {
    fontSize: 16,
    marginLeft: 0,
    marginTop: 5,
    padding: 13,
    flexShrink: 1,
    flexWrap: "wrap",
    borderRadius: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  pressedItemBackground: {
    backgroundColor: config.tokens.colors.neutralDark,
  },
  pressedItemText: {
    color: "white",
  },
});
