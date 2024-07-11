import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import usecreateTaskStore from "../../store/createTaskStore";
import HighPriorityIcon from "../../../assets/icons/highPriorityIcon.svg";
import MediumPriorityIcon from "../../../assets/icons/mediumPriorityIcon.svg";
import LowPriorityIcon from "../../../assets/icons/lowPriorityIcon.svg";
import TickIcon from "../../../assets/icons/tickImageGreen.svg";
import { defaultStyles } from "../../styles/styles";
import { config } from "../../styles/themeConfig";
import { Card, View } from "@gluestack-ui/themed";

const TaskPriorityModelScreen = () => {
  const { task_urgency, setTaskUrgency } = usecreateTaskStore((state) => ({
    task_urgency: state.task_urgency,
    setTaskUrgency: state.setTaskUrgency,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Card style={defaultStyles.card}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setTaskUrgency("high")}
            style={styles.button}
          >
            <View style={styles.gridrow}>
              <View style={styles.row}>
                <HighPriorityIcon style={styles.icon} />
                <Text style={styles.text}>High</Text>
              </View>
              <View>
                {task_urgency === "high" && (
                  <TickIcon style={styles.tickImage} />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTaskUrgency("medium")}
            style={styles.button}
          >
            <View style={styles.gridrow}>
              <View style={styles.row}>
                <MediumPriorityIcon style={styles.icon} />
                <Text style={styles.text}>Medium</Text>
              </View>
              <View>
                {task_urgency === "medium" && (
                  <TickIcon style={styles.tickImage} />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTaskUrgency("low")}
            style={styles.button}
          >
            <View style={styles.gridrow}>
              <View style={styles.row}>
                <LowPriorityIcon style={styles.icon} />
                <Text style={styles.text}>Low</Text>
              </View>
              <View>
                {task_urgency === "low" && (
                  <TickIcon style={styles.tickImage} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    </SafeAreaView>
  );
};

export default TaskPriorityModelScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  container: {
    margin: 5,
    width: 295,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  button: {
    padding: 15,
    marginVertical: 5,
    borderBottomColor: config.tokens.colors.neutralLight,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
  },
  // image: {
  //   width: 24,
  //   height: 24,
  //   marginRight: 25,
  // },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gridrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tickImage: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
});
