import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import usecreateTaskStore from "../../store/createTaskStore";

const TaskPriorityModelScreen = () => {
  const { task_urgency, setTaskUrgency } = usecreateTaskStore((state) => ({
    task_urgency: state.task_urgency,
    setTaskUrgency: state.setTaskUrgency,
  }));
  console.log("task_urgency" + task_urgency);

  return (
    <SafeAreaView>
      <Text style={styles.title}>Task Priority</Text>
      <View>
        <TouchableOpacity
          onPress={() => setTaskUrgency("High")}
          style={styles.button}
        >
          <View style={styles.gridrow}>
            <View style={styles.row}>
              <Image
                source={require("../../../assets/highPriorityIcon.png")}
                style={styles.image}
              />
              <Text style={styles.text}>High</Text>
            </View>
            <View>
              {task_urgency === "High" && (
                <Image
                  source={require("../../../assets/tickIcon.png")}
                  style={styles.tickImage}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTaskUrgency("Medium")}
          style={styles.button}
        >
          <View style={styles.gridrow}>
            <View style={styles.row}>
              <Image
                source={require("../../../assets/mediumPriorityIcon.png")}
                style={styles.image}
              />
              <Text style={styles.text}>Medium</Text>
            </View>
            <View>
              {task_urgency === "Medium" && (
                <Image
                  source={require("../../../assets/tickIcon.png")}
                  style={styles.tickImage}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTaskUrgency("Low")}
          style={styles.button}
        >
          <View style={styles.gridrow}>
            <View style={styles.row}>
              <Image
                source={require("../../../assets/lowPriorityIcon.png")}
                style={styles.image}
              />
              <Text style={styles.text}>Low</Text>
            </View>
            <View>
              {task_urgency === "Low" && (
                <Image
                  source={require("../../../assets/tickIcon.png")}
                  style={styles.tickImage}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TaskPriorityModelScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center"
  },
  button: {
    padding: 15,
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 25,
  },
  tickImage: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gridrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
