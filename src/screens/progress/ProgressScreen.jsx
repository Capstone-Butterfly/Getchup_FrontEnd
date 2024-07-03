import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "@gluestack-ui/themed"
import TodayProgressChart from "../../components/TodayProgressChart";
import TodayProgressChartDetail from "../../components/TodayProgressChartDetail";

const ProgressScreen = ({ navigation }) => {
    const components = [
      { key: 'TodayProgressChart', component: <TodayProgressChart /> },
      { key: 'TodayProgressChartDetail', component: <TodayProgressChartDetail /> },
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
