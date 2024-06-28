import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@gluestack-ui/themed"
import TodayProgressChart from "../../components/TodayProgressChart";

const ProgressScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <TodayProgressChart/>
        </SafeAreaView>
    );
};

export default ProgressScreen;
