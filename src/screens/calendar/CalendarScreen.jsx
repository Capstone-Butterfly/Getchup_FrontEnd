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

// Function to format the date
const formatDate = (date) => {
  const options = { month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};


const CalendarScreen = ({ navigation }) => {
  const today = new Date();
  return (
    <View>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={[styles.calendarContainer]}>
          <View style={[styles.calendarHeader, defaultStyles.TypographyH1]}>
            <Heading style={[styles.heading, defaultStyles.TypographyH1]}>
              Calendar
            </Heading>
            <View>
            <Text style={[defaultStyles.TypographyBodyHeavy]}>Today, {formatDate(today)}</Text>
            </View>
          </View>
        </View>
        <MonthlyCalendar navigation={navigation} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  heading: {
    textAlign: "left",
    marginBottom: config.tokens.spacing.sm,
  },
  calendarHeader: {
    paddingVertical: 56,
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
