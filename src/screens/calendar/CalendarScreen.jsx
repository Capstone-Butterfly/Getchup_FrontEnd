import { SafeAreaView } from "react-native-safe-area-context";
import { Center, Heading, ImageBackground, Text, View, Box, } from "@gluestack-ui/themed";
import MonthlyCalendar from "../../components/Calendar";
import { StyleSheet, Dimensions, Platform } from "react-native";
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

const weekLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]


const CalendarScreen = ({ navigation }) => {
  const today = new Date();
  return (
    <View>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={[styles.calendarContainer]}>
          <Box style={[styles.calendarHeader, defaultStyles.TypographyH1]}>
            <Heading style={[styles.heading, defaultStyles.TypographyH1]}>
              Calendar
            </Heading>
            <Text style={[defaultStyles.TypographyBodyHeavy]}>Today, {formatDate(today)}</Text>
          </Box>
        </View>
          <Box style={styles.weekLabelsContainer}>
            {weekLabels.map((label) => {
              return (
                <Text style={[defaultStyles.TypographyLabelSmall, styles.weekLabels]}>{label}</Text>
              )
            })}
          </Box>
        <MonthlyCalendar navigation={navigation} style={styles.calendar} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  calendar: {
    width: "100%"
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heading: {
    textAlign: "left",
    marginBottom: config.tokens.spacing.sm,
  },
  calendarHeader: {
    padding: 0,
    marginLeft : -10,
  },
  calendarContainer: {
    width: width * 0.9,
    maxWidth: 400,
    minWidth: 300,
    marginVertical: 0,
    // marginHorizontal: "auto",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 56,
    ...Platform.select({
        android: {
          marginTop: 10,
        }
    })
  },
  weekLabels: {
    color: config.tokens.colors.neutralDark,
    textAlign: "center"
  },
  weekLabelsContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: config.tokens.colors.white,
    paddingVertical: 9,
    paddingHorizontal: 38,
    justifyContent: "space-between",
    borderColor: config.tokens.colors.neutralLight,
    borderWidth: 1,
  }
});



export default CalendarScreen;
