import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "@gluestack-ui/themed"
import TodayProgressChart from "../../components/TodayProgressChart";
import TodayProgressChartDetail from "../../components/TodayProgressChartDetail";
import profileStore from "../../store/profileStore";
import ProgressCalendar from "../../components/ProgressCalendar";


const ProgressScreen = ({ navigation }) => {
  const {first_name, userId} = profileStore((state) => ({
    first_name: state.first_name,
    userId: state.userId
  }));

    const components = [
      { key: 'TodayProgressChart', component: <TodayProgressChart name={first_name} userId={userId}/> },
      { key: 'ProgressCalendar', component: <ProgressCalendar/> },
      { key: 'TodayProgressChartDetail', component: <TodayProgressChartDetail userId={userId}/> },
    ];
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={components}
          renderItem={({ item }) => item.component}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default ProgressScreen;
