import { SafeAreaView } from "react-native-safe-area-context";
import {
  Center,
  Heading,
  ImageBackground,
  Text,
  View,
} from "@gluestack-ui/themed";
import MonthlyCalendar from "../../components/Calendar";
import { StyleSheet, Dimensions } from "react-native";
import { config } from "../../styles/themeConfig";
import { defaultStyles } from "./../../styles/styles";
const image = require("../../../assets/background/background.png");

// Get device dimensions
const { width, height } = Dimensions.get("window");
const CalendarScreen = ({ navigation }) => {
  return (
    <View>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={[styles.calendarContainer]}>
          <View style={[styles.calendarHeader, defaultStyles.TypographyH1]}>
            <Heading style={[styles.heading, defaultStyles.TypographyH1]}>
              Calendar
            </Heading>
            <View>
              <Text>Today, July 12</Text>
            </View>
          </View>
        </View>
        <MonthlyCalendar navigation={navigation} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "left",
    marginBottom: config.tokens.spacing.md,
  },
  calendarHeader: {
    paddingVertical: 20,
  },
  calendarContainer: {
    width: width * 0.9,
    maxWidth: 400,
    minWidth: 300,
    marginVertical: 0,
    marginHorizontal: "auto",
  },
});

export default CalendarScreen;
