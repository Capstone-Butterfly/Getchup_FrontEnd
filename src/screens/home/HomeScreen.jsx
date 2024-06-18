import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import WeeklyCalendar from "../../components/WeeklyCalendar";
import { Text } from "@gluestack-ui/themed";

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Header />
            <Greeting />
            <WeeklyCalendar />
        </SafeAreaView>
    );
};

export default HomeScreen;
