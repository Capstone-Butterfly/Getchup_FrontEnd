import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@gluestack-ui/themed"
import Header from "../../components/Header";
import MonthlyCalendar from "../../components/Calendar";


const CalendarScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Header />
            <MonthlyCalendar navigation={navigation}/>
        </SafeAreaView>
    );
};

export default CalendarScreen;
