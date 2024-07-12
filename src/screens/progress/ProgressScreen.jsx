import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, StyleSheet } from "react-native";
import { ImageBackground, Text } from "@gluestack-ui/themed"
import profileStore from "../../store/profileStore";
import useProgressDateRangeStore from "../../store/progressDateRangeStore";
import ProgressChart from "../../components/ProgressChart";
import ProgressChartDetail from "../../components/ProgressChartDetails";
const image = require('../../../assets/background/background.png');

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
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>  
          <FlatList
            data={components}
            renderItem={({ item }) => item.component}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.listContainer}
          />
        </ImageBackground>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
        flex: 1,
    },
    listContainer: {
        flexGrow: 1,
    },
  });

export default ProgressScreen;
