import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@gluestack-ui/themed"
import Header from "../../components/Header";
import Calendar from "../../components/Calendar";

const CalendarScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Header />
            <Calendar />
        </SafeAreaView>
    );
};

export default CalendarScreen;
