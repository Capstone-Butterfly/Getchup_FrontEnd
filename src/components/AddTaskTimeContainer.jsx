import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VStack,
  HStack,
  Box,
  Modal,
  ModalContent,
  ModalCloseButton,
  Icon,
  CloseIcon,
  Button,
} from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import useAddTaskDateModelStore from "../store/addTaskDateModelStore";
import usecreateTaskStore from "../store/createTaskStore";

const TimeModelScreen = () => {
  const { timeLabel, setTimeLabel } = useAddTaskDateModelStore((state) => ({
    timeLabel: state.timeLabel,
    setTimeLabel: state.setTimeLabel,
  }));

  const {
    start_time,
    end_time,
    setStartTime,
    setEndTime,
    user_estimate_duration,
    setUserEstimateDuration,
  } = usecreateTaskStore((state) => ({
    start_time: state.start_time,
    end_time: state.end_time,
    setStartTime: state.setStartTime,
    setEndTime: state.setEndTime,
    user_estimate_duration: state.user_estimate_duration,
    setUserEstimateDuration: state.setUserEstimateDuration,
  }));

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());

  const handleTimeChange = (event, selectedDate) => {
    const currentTime = selectedDate || selectedTime;
    setSelectedTime(currentTime);
  };

  const handleEndTimeChange = (event, selectedDate) => {
    const currentEndTime = selectedDate || selectedEndTime;
    setSelectedEndTime(currentEndTime);
  };

  const applyTime = () => {
    setStartTime(
      selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
    setTimeLabel(
      selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
    setTimePickerVisible(false);
  };

  const applyEndTime = () => {
    if (selectedTime < selectedEndTime) {
      setEndTime(
        selectedEndTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    } else {
      console.warn("End time must be after start time.");
    }

    setEndTimePickerVisible(false);
  };

  const toggleTimePicker = () => {
    setTimePickerVisible(!isTimePickerVisible);
  };

  const toggleEndTimePicker = () => {
    setEndTimePickerVisible(!isEndTimePickerVisible);
  };

  useEffect(() => {
    if (selectedTime < selectedEndTime) {
      const startTimeMs = selectedTime.getTime();
      const endTimeMs = selectedEndTime.getTime();
      const duration = endTimeMs - startTimeMs;
      console.log("duration" + duration);
      setUserEstimateDuration(duration);
    }

    console.log("start_time:", start_time);
    console.log("end_time:", end_time);
  }, [start_time, end_time]);

  return (
    <SafeAreaView>
      <VStack space="lg" reversed={false}>
        <HStack space={2} alignItems="center" justifyContent="space-between">
          <Box>
            <Text style={styles.label}>Time</Text>
          </Box>
          <Box>
            <Text style={styles.time}>{timeLabel}</Text>
          </Box>
        </HStack>
        <TouchableOpacity
          onPress={() => {
            setTimeLabel("Anytime");
          }}
        >
          <HStack space={2} alignItems="center" justifyContent="space-between">
            <Text>Anytime</Text>
            {timeLabel === "Anytime" && (
              <Image
                source={require("../../assets/tickIcon.png")}
                style={styles.tickImage}
              />
            )}
          </HStack>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTimePicker}>
          <HStack space={2} alignItems="center" justifyContent="space-between">
            <Text>Start Time</Text>
            <Image
              source={require("../../assets/rightAngle.png")}
              style={styles.tickImage}
            />
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleEndTimePicker}>
          <HStack space={2} alignItems="center" justifyContent="space-between">
            <Text>End Time</Text>
            <Image
              source={require("../../assets/rightAngle.png")}
              style={styles.tickImage}
            />
          </HStack>
        </TouchableOpacity>
      </VStack>

      <Modal isOpen={isTimePickerVisible} onClose={toggleTimePicker}>
        <ModalContent style={styles.modalContent}>
          <ModalCloseButton
            style={styles.closeButton}
            onPress={toggleTimePicker}
          >
            <Icon as={CloseIcon} />
          </ModalCloseButton>
          <VStack space={4} style={styles.modalBody}>
            <DateTimePicker
              testID="dateTimePicker"
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={handleTimeChange}
            />
            <Button onPress={applyTime} style={styles.applyButton}>
              <Text>Apply</Text>
            </Button>
          </VStack>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEndTimePickerVisible} onClose={toggleEndTimePicker}>
        <ModalContent style={styles.modalContent}>
          <ModalCloseButton
            style={styles.closeButton}
            onPress={toggleEndTimePicker}
          >
            <Icon as={CloseIcon} />
          </ModalCloseButton>
          <VStack space={4} style={styles.modalBody}>
            <DateTimePicker
              testID="dateTimePicker"
              value={selectedEndTime}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={handleEndTimeChange}
            />
            <Button onPress={applyEndTime} style={styles.applyButton}>
              <Text>Apply</Text>
            </Button>
          </VStack>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
};

export default TimeModelScreen;

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
  time: {
    fontSize: 16,
  },
  tickImage: {
    width: 15,
    height: 15,
    marginRight: 20,
  },
  modalContent: {
    width: "100%",
    margin: 0,
    padding: 0,
    borderRadius: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },
  closeButton: {
    position: "absolute",
    left: 10,
  },
  applyButton: {
    alignSelf: "center",
  },
  modalBody: {
    paddingTop: 30,
  },
});
