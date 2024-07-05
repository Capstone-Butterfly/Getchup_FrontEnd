import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "@gluestack-ui/themed"
import profileStore from "../../store/profileStore";
import TodayProgressChart from "../../components/TodayProgressChart";
import TodayProgressChartDetail from "../../components/TodayProgressChartDetail";
import ProgressDateRangeTab from "../../components/ProgressDateRangeTab";
import ProgressCalendar from "../../components/ProgressCalendar";
import WeeklyProgressChart from "../../components/WeeklyProgressChart";
import WeeklyProgressChartDetail from "../../components/WeeklyProgressChartDetail";
import useProgressDateRangeStore from "../../store/progressDateRangeStore";

const ProgressScreen = ({ navigation }) => {
  const {first_name, userId} = profileStore((state) => ({
    first_name: state.first_name,
    userId: state.userId
  }));

  const { activeDateRangeTab, setActiveDateRangeTab, 
    chartSelectedStartDate, setchartSelectedStartDate,
    chartSelectedEndDate, setchartSelectedEndDate } = useProgressDateRangeStore((state) => ({
      activeDateRangeTab : state.activeDateRangeTab,
      setActiveDateRangeTab : state.setActiveDateRangeTab,
      chartSelectedStartDate : state.chartSelectedStartDate,
      setchartSelectedStartDate : state.setchartSelectedStartDate,
      chartSelectedEndDate : state.chartSelectedEndDate,
      setchartSelectedEndDate : state.setchartSelectedEndDate,
  }));

    const components = [
      { key: 'TodayProgressChart', component: <TodayProgressChart name={first_name} userId={userId}/> },
      //{ key: 'WeeklyProgressChart', component: <WeeklyProgressChart name={first_name} userId={userId} weeklyStartDate={chartSelectedStartDate} weeklyEndDate={chartSelectedEndDate}/> },
      //{ key: 'ProgressDateRangeTab', component: <ProgressDateRangeTab /> },
      // { key: 'ProgressCalendar', component: <ProgressCalendar/> },
      { key: 'TodayProgressChartDetail', component: <TodayProgressChartDetail userId={userId}/> },
      { key: 'WeeklyProgressChartDetail', component: <WeeklyProgressChartDetail userId={userId} />},
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
