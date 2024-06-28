import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, TouchableOpacity, View } from "react-native";
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
} from "@gluestack-ui/themed";
import { Calendar } from "react-native-calendars";
import useAddTaskDateModelStore from "../store/addTaskDateModelStore";
import usecreateTaskStore from "../store/createTaskStore";

const DateModelScreen = () => {
  const { dateLabel, setDateLabel} =
    useAddTaskDateModelStore((state) => ({
      dateLabel: state.dateLabel,
      setDateLabel: state.setDateLabel,
    }));

  const { start_date, end_date, setStartDate, setEndDate } = usecreateTaskStore(
    (state) => ({
      start_date: state.start_date,
      end_date: state.end_date,
      setStartDate: state.setStartDate,
      setEndDate: state.setEndDate,
    })
  );

  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);

  const toggleStartDateModal = () => {
    setShowStartDateModal(!showStartDateModal);
  };

  const toggleEndDateModal = () => {
    setShowEndDateModal(!showEndDateModal);
  };

  const onDayPress = (day) => {
    if (showStartDateModal) {
      setStartDate(day.dateString);
      setDateLabel(day.dateString);
      toggleStartDateModal();
    } else if (showEndDateModal) {
      setEndDate(day.dateString);
      toggleEndDateModal();
    }
  };

  useEffect(() => {
    if (dateLabel === "Today") {
      const today = new Date().toISOString().split("T")[0];
      setStartDate(today);
      setEndDate(today);
    }
  }, [dateLabel]);

  useEffect(() => {
    console.log("start_date:", start_date);
    console.log("end_date:", end_date);
  }, [start_date, end_date]);

  return (
    <SafeAreaView>
      <VStack space="lg" reversed={false}>
        <HStack space={2} alignItems="center" justifyContent="space-between">
          <Box>
            <Text style={styles.label}>Date</Text>
          </Box>
          <Box>
            <Text style={styles.date}>{dateLabel}</Text>
          </Box>
        </HStack>
        <TouchableOpacity
          onPress={() => {
            const today = new Date();
            const todayDate = today.toISOString().split("T")[0];
            setStartDate(todayDate);
            setEndDate(todayDate);
            setDateLabel("Today");
          }}
        >
          <HStack space={2} alignItems="center" justifyContent="space-between">
            <Text>Today</Text>
            {dateLabel === "Today" && (
              <Image
                source={require("../../assets/tickIcon.png")}
                style={styles.tickImage}
              />
            )}
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const today = new Date();
            today.setDate(today.getDate() + 1);
            const tomorrowDateString = today.toISOString().split("T")[0];
            setStartDate(tomorrowDateString);
            setEndDate(tomorrowDateString);
            setDateLabel("Tomorrow");
          }}
        >
          <HStack space={2} alignItems="center" justifyContent="space-between">
            <Text>Tomorrow</Text>

            {dateLabel === "Tomorrow" && (
              <Image
                source={require("../../assets/tickIcon.png")}
                style={styles.tickImage}
              />
            )}
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleStartDateModal}>
          <HStack space={2} alignItems="center" justifyContent="space-between">
            <Text>Start Date</Text>
            <Image
              source={require("../../assets/rightAngle.png")}
              style={styles.tickImage}
            />
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleEndDateModal}>
          <HStack space={2} alignItems="center" justifyContent="space-between">
            <Text>End Date</Text>
            <Image
              source={require("../../assets/rightAngle.png")}
              style={styles.tickImage}
            />
          </HStack>
        </TouchableOpacity>
      </VStack>

      <Modal isOpen={showStartDateModal} onClose={toggleStartDateModal}>
        <ModalContent style={styles.modalContent}>
          <ModalCloseButton
            style={styles.closeButton}
            onPress={toggleStartDateModal}
          >
            <Icon as={CloseIcon} />
          </ModalCloseButton>
          <VStack space={4} style={styles.modalBody}>
            <Calendar
              current={start_date || undefined}
              onDayPress={onDayPress}
              markedDates={{ [start_date]: { selected: true } }}
            />
          </VStack>
        </ModalContent>
      </Modal>

      <Modal isOpen={showEndDateModal} onClose={toggleEndDateModal}>
        <ModalContent style={styles.modalContent}>
          <ModalCloseButton
            style={styles.closeButton}
            onPress={toggleEndDateModal}
          >
            <Icon as={CloseIcon} />
          </ModalCloseButton>
          <VStack space={4} style={styles.modalBody}>
            <Calendar
              current={end_date || undefined}
              onDayPress={onDayPress}
              markedDates={{ [end_date]: { selected: true } }}
            />
          </VStack>
        </ModalContent>
      </Modal>
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
  modalBody: {
    paddingTop: 30,
  },
});
