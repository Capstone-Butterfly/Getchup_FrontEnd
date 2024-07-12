import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VStack,
  HStack,
  Box,
  Modal,
  ModalContent,
  ModalCloseButton,
  Icon,
  ModalBackdrop,
} from "@gluestack-ui/themed";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useAddTaskDateModelStore from "../store/addTaskDateModelStore";
import usecreateTaskStore from "../store/createTaskStore";
import useDateTimeModelVisibleStore from "../store/dateTimeModelVisible";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";
import { Card, View } from "@gluestack-ui/themed";
import TickIcon from "../../assets/icons/tickImageGreen.svg";
import RightAngle from "../../assets/icons/rightAngle.svg";
import CloseIcon from "../../assets/icons/x.svg";

const DateModelScreen = () => {
  const { dateLabel, setDateLabel } = useAddTaskDateModelStore((state) => ({
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

  const openModal = () => {
    setShowStartDateModal(true);
  };

  // const closeModal = () => {
  //   setShowStartDateModal(false);
  // };

  // const openEndModal = () => {
  //   setShowEndDateModal(true);
  // };

  const closeEndModal = () => {
    setShowEndDateModal(false);
  };

  const toggleStartDateModal = () => {
    setShowStartDateModal(!showStartDateModal);
  };

  const toggleEndDateModal = () => {
    setShowEndDateModal(!showEndDateModal);
  };

  const onDayPress = (day) => {
    if (showStartDateModal) {
      setStartDate(day.dateString);
      setEndDate(day.dateString);
      setDateLabel(day.dateString);
      toggleStartDateModal();
    } else if (showEndDateModal) {
      setEndDate(day.dateString);
      toggleEndDateModal();
    }
  };

  useEffect(() => {
    if (dateLabel === "Today") {
      // const today = new Date().toISOString().split("T")[0];
      const today = new Date().toLocaleString("en-CA").split(",")[0];
      setStartDate(today);
      setEndDate(today);
    }
  }, [dateLabel]);

  useEffect(() => {
    console.log("start_date:", start_date);
    console.log("end_date:", end_date);
  }, [start_date, end_date]);

  return (
    <View style={styles.safeArea}>
      {/* {isAnyModalVisible && <View style={styles.dimmingOverlay} />} */}
      <Card style={defaultStyles.card}>
        <View style={styles.container}>
          <VStack space="lg" reversed={false}>
            <View style={styles.border}>
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Text
                    style={[defaultStyles.TypographyBodyHeavy, styles.label]}
                  >
                    Date
                  </Text>
                </Box>
                <Box>
                  <Text style={[defaultStyles.TypographyBody, styles.date]}>
                    {dateLabel}
                  </Text>
                </Box>
              </HStack>
            </View>
            <TouchableOpacity
              style={styles.border}
              onPress={() => {
                const today = new Date();
                //const todayDate = today.toISOString().split("T")[0];
                const todayDate = today.toLocaleString("en-CA").split(",")[0];
                setStartDate(todayDate);
                setEndDate(todayDate);
                setDateLabel("Today");
              }}
            >
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text style={[defaultStyles.TypographyBody, styles.text]}>
                  Today
                </Text>
                {dateLabel === "Today" && <TickIcon style={styles.tickImage} />}
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.border}
              onPress={() => {
                const today = new Date();
                today.setDate(today.getDate() + 1);
                //</VStack>const tomorrowDateString = today.toISOString().split("T")[0];
                const tomorrowDateString = today
                  .toLocaleString("en-CA")
                  .split(",")[0];
                setStartDate(tomorrowDateString);
                setEndDate(tomorrowDateString);
                setDateLabel("Tomorrow");
              }}
            >
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text style={[defaultStyles.TypographyBody, styles.text]}>
                  Tomorrow
                </Text>

                {dateLabel === "Tomorrow" && (
                  <TickIcon style={styles.tickImage} />
                )}
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity style={styles.border} onPress={toggleStartDateModal}>
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text style={[defaultStyles.TypographyBody, styles.text]}>
                  Start Date
                </Text>
                <RightAngle style={styles.tickImage} />
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleEndDateModal}>
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text style={[defaultStyles.TypographyBody, styles.text]}>
                  End Date
                </Text>
                <RightAngle style={styles.tickImage} />
              </HStack>
            </TouchableOpacity>
          </VStack>
        </View>
      </Card>

      <Modal isOpen={showStartDateModal} onClose={toggleStartDateModal}>
        <ModalBackdrop />
        <ModalContent style={styles.modalContent}>
          <VStack space={4} style={styles.modalBody}>
          <Calendar
              current={start_date || undefined}
              onDayPress={onDayPress}
              markedDates={{
                [start_date]: {
                  selected: true,
                  customStyles: {
                    container: {
                      backgroundColor: config.tokens.colors.highPriority,
                      borderRadius: 15,
                    },
                    text: {
                      color: config.tokens.colors.black,
                      fontWeight: "bold",
                    },
                  },
                },
              }}
              markingType={"custom"}
              theme={{
                arrowColor: config.tokens.colors.black,
                textMonthFontWeight: "bold",
                textDayFontWeight: "normal",
                textDayHeaderFontWeight: "normal",
                todayTextColor: config.tokens.colors.highPriority,
                selectedDayBackgroundColor: config.tokens.colors.primary,
                selectedDayTextColor: config.tokens.colors.black,
              }}
            />
          </VStack>
        </ModalContent>
      </Modal>

      <Modal isOpen={showEndDateModal} onClose={toggleEndDateModal}>
        <ModalBackdrop />
        <ModalContent style={styles.modalContent}>
          <VStack space={4} style={styles.modalBody}>
          <Calendar
              current={end_date || undefined}
              onDayPress={onDayPress}
              markedDates={{
                [end_date]: {
                  selected: true,
                  customStyles: {
                    container: {
                      backgroundColor: config.tokens.colors.highPriority,
                      borderRadius: 15,
                    },
                    text: {
                      color: config.tokens.colors.black,
                      fontWeight: "bold",
                    },
                  },
                },
              }}
              markingType={"custom"}
              theme={{
                arrowColor: config.tokens.colors.black,
                textMonthFontWeight: "bold",
                textDayFontWeight: "normal",
                textDayHeaderFontWeight: "normal",
                todayTextColor: config.tokens.colors.highPriority,
                selectedDayBackgroundColor: config.tokens.colors.primary,
                selectedDayTextColor: config.tokens.colors.black,
              }}
            />
          </VStack>
        </ModalContent>
      </Modal>
    </View>
  );
};

export default DateModelScreen;

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    position: "relative",
  },
  container: {
    margin: 5,
    // width: 295,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  label: {
    color: config.tokens.colors.lightBlack,
  },
  date: {
    color: config.tokens.colors.lighterBlack,
  },
  text: {
    color: config.tokens.colors.lightBlack,
  },
  border: {
    paddingBottom: 13,
    borderBottomColor: config.tokens.colors.neutralLight,
    borderBottomWidth: 1,
  },
  tickImage: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    left: 10,
  },
  modalBody: {
    // paddingTop: 30,
  },
  dimmingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});
