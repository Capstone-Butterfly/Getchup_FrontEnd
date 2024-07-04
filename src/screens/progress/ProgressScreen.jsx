import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "@gluestack-ui/themed"
import profileStore from "../../store/profileStore";
import TodayProgressChart from "../../components/TodayProgressChart";
import TodayProgressChartDetail from "../../components/TodayProgressChartDetail";
import ProgressCalendar from "../../components/ProgressCalendar";
import WeeklyProgressChart from "../../components/WeeklyProgressChart";
import WeeklyProgressChartDetail from "../../components/WeeklyProgressChartDetail";


const ProgressScreen = ({ navigation }) => {
  const {first_name, userId} = profileStore((state) => ({
    first_name: state.first_name,
    userId: state.userId
  }));

  const wStartDate = '2024-06-30';
  const wEndDate = '2024-07-06';

    const components = [
      { key: 'TodayProgressChart', component: <TodayProgressChart name={first_name} userId={userId}/> },
      { key: 'WeeklyProgressChart', component: <WeeklyProgressChart name={first_name} userId={userId} weeklyStartDate={wStartDate} weeklyEndDate={wEndDate}/> },
      { key: 'ProgressCalendar', component: <ProgressCalendar/> },
      { key: 'TodayProgressChartDetail', component: <TodayProgressChartDetail userId={userId}/> },
      { key: 'WeeklyProgressChartDetail', component: <WeeklyProgressChartDetail userId={userId}  weeklyStartDate={wStartDate} weeklyEndDate={wEndDate} />},
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
