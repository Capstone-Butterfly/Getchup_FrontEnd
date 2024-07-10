import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "@gluestack-ui/themed"
import profileStore from "../../store/profileStore";
import useProgressDateRangeStore from "../../store/progressDateRangeStore";
import ProgressChart from "../../components/ProgressChart";
import ProgressChartDetail from "../../components/ProgressChartDetails";

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
      { key: 'ProgressChart', component: <ProgressChart name={first_name} userId={userId}/> },
      { key: 'ProgressChartDetail', component: <ProgressChartDetail userId={userId}/> },
    ];
  
    return (
      <SafeAreaView style={styles.container}>
        <ProgressChart name={first_name} userId={userId}/>
        <ProgressChartDetail userId={userId}/>
        {/* <FlatList
          data={components}
          renderItem={({ item }) => item.component}
          keyExtractor={(item) => item.key}
        /> */}
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default ProgressScreen;
