import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, HStack, Box } from "@gluestack-ui/themed";
import useAddTaskDateModelStore from "../../store/addTaskDateModelStore";

const DateModelScreen = () => {
  const { dateLabel, setDateLabel, timeLabel, setTimeLabel } =
    useAddTaskDateModelStore((state) => ({
      dateLabel: state.dateLabel,
      setDateLabel: state.setDateLabel,
      timeLabel: state.timeLabel,
      setTimeLabel: state.setTimeLabel,
    }));

  return (
    <SafeAreaView>
      <Text style={styles.title}>Date and Time</Text>
      <VStack space="lg" reversed={false}>
        <HStack space={2} alignItems="center" justifyContent="space-between">
          <Box>
            <Text style={styles.label}>Date</Text>
          </Box>
          <Box>
            <Text style={styles.date}>{dateLabel}</Text>
          </Box>
        </HStack>
        <TouchableOpacity onPress={() => setDateLabel("Today")}>
          <HStack space={2} alignItems="center" justifyContent="space-between">
            <Text>Today</Text>
            {dateLabel === "Today" && (
              <Image
                source={require("../../../assets/tickIcon.png")}
                style={styles.tickImage}
              />
            )}
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDateLabel("Tomorrow")}>
        <HStack space={2} alignItems="center" justifyContent="space-between">
          <Text>Tomorrow</Text>

          {dateLabel === "Tomorrow" && (
            <Image
              source={require("../../../assets/tickIcon.png")}
              style={styles.tickImage}
            />
          )}
        </HStack>
        </TouchableOpacity>
        <HStack space={2} alignItems="center" justifyContent="space-between">
          <Text>Start Date</Text>
          <Image
              source={require("../../../assets/rightAngle.png")}
              style={styles.tickImage}
            />
        </HStack>
        <HStack space={2} alignItems="center" justifyContent="space-between">
          <Text>End Date</Text>
          <Image
              source={require("../../../assets/rightAngle.png")}
              style={styles.tickImage}
            />
        </HStack>

      </VStack>
    </SafeAreaView>
  );
};

export default DateModelScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
  },
  tickImage: {
    width: 15,
    height: 15,
    marginRight: 20,
  },
});
