import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, HStack, Box } from "@gluestack-ui/themed";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useAddTaskDateModelStore from "../store/addTaskDateModelStore";
import usecreateTaskStore from "../store/createTaskStore";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";
import { Card, View } from "@gluestack-ui/themed";
import TickIcon from "../../assets/icons/tickImageGreen.svg";
import RightAngle from "../../assets/icons/rightAngle.svg";

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

  const applyTime = (selectedDate) => {
    setStartTime(
      selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
    setEndTime(
      selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
    setTimeLabel(
      selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
    setTimePickerVisible(false);
  };

  const applyEndTime = (selectedDate) => {
    setEndTime(
      selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );

    let start = new Date(`1970-01-01T${start_time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    let end =  selectedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    setTimeLabel(`${start} - ${end}`);
    setEndTimePickerVisible(false);
  };

  const toggleTimePicker = () => {
    setTimePickerVisible(!isTimePickerVisible);
  };

  const toggleEndTimePicker = () => {
    setEndTimePickerVisible(!isEndTimePickerVisible);
  };

  useEffect(() => {
    if (timeLabel === "Anytime") {
      const defaultStartTime = new Date();
      defaultStartTime.setHours(6, 0, 0);

      setStartTime(
        defaultStartTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setEndTime(
        defaultStartTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
  }, [timeLabel]);

  useEffect(() => {
    if (selectedTime <= selectedEndTime) {
      const startTimeMs = selectedTime.getTime();
      const endTimeMs = selectedEndTime.getTime();
      const duration = endTimeMs - startTimeMs;
      //console.log("duration" + duration);
      setUserEstimateDuration(duration);
    }

    //console.log("start_time:", start_time);
    //console.log("end_time:", end_time);
  }, [start_time, end_time, timeLabel]);

  return (
    // <SafeAreaView>
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
                <Text style={[defaultStyles.TypographyBodyHeavy, styles.label]}>
                  Time
                </Text>
              </Box>
              <Box>
                <Text style={[defaultStyles.TypographyBody, styles.time]}>
                  {timeLabel}
                </Text>
              </Box>
            </HStack>
          </View>
          <TouchableOpacity
            style={styles.border}
            onPress={() => {
              const defaultStartTime = new Date();
              defaultStartTime.setHours(6, 0, 0);

              setStartTime(
                defaultStartTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              );
              setEndTime(
                defaultStartTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              );
              setTimeLabel("Anytime");
            }}
          >
            <HStack
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Text style={[defaultStyles.TypographyBody, styles.text]}>
                Anytime
              </Text>
              {timeLabel === "Anytime" && <TickIcon style={styles.tickImage} />}
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity style={styles.border} onPress={toggleTimePicker}>
            <HStack
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Text style={[defaultStyles.TypographyBody, styles.text]}>
                Start Time
              </Text>
              <RightAngle style={styles.tickImage} />
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleEndTimePicker}>
            <HStack
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Text style={[defaultStyles.TypographyBody, styles.text]}>
                End Time
              </Text>
              <RightAngle style={styles.tickImage} />
            </HStack>
          </TouchableOpacity>
        </VStack>
      </View>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        is24Hour={false}
        onConfirm={applyTime}
        onCancel={toggleTimePicker}
        customConfirmButtonIOS={(props) => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{ borderTopWidth: 1, borderColor: config.tokens.colors.neutralLight, }}
          >
            <Text
              style={[{
                color: config.tokens.colors.primaryDark,
                // backgroundColor: config.tokens.colors.primaryDark,
                padding: 14,
                textAlign: "center",
                fontSize: 20,
              }, defaultStyles.TypographyBodyHeavy]}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        )}
        customCancelButtonIOS={(props) => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              backgroundColor: config.tokens.colors.neutralLight,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text
              style={[{ color: config.tokens.colors.lightBlack, textAlign: "center" }, defaultStyles.TypographyBodyHeavy]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        )}
      />


      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        is24Hour={false}
        onConfirm={applyEndTime}
        onCancel={toggleEndTimePicker}
        customConfirmButtonIOS={(props) => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{ borderTopWidth: 1, borderColor: "lightgrey" }}
          >
            <Text
              style={[{
                color: "green",
                padding: 14,
                textAlign: "center",
                fontSize: 20,
              }, defaultStyles.TypographyBodyHeavy]}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        )}
        customCancelButtonIOS={(props) => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              backgroundColor: "#E6E6E6",
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text
              style={[{ color: "#545F71", textAlign: "center", fontSize: 20 }, defaultStyles.TypographyBodyHeavy]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        )}
      />
    </Card>
    // </SafeAreaView>
  );
};

export default TimeModelScreen;

const styles = StyleSheet.create({
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
  time: {
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
