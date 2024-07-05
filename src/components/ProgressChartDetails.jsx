import React, {useEffect} from "react";
import { StyleSheet } from "react-native";
import { Card, View } from "@gluestack-ui/themed";
import ProgressCalendar from "./ProgressCalendar";
import ProgressDateRangeTab from "./ProgressDateRangeTab";
import useProgressDateRangeStore from "../store/progressDateRangeStore";
import WeeklyProgressChartDetail from "../components/WeeklyProgressChartDetail"
import TodayProgressChartDetail from "../components/TodayProgressChartDetail"
import dayjs from "dayjs";

const ProgressChartDetail = ({userId}) => {

  const { activeDateRangeTab, chartSelectedStartDate, chartSelectedEndDate , setchartSelectedStartDate, 
    setchartSelectedEndDate} = useProgressDateRangeStore((state) => ({
      activeDateRangeTab : state.activeDateRangeTab,
      chartSelectedStartDate : state.chartSelectedStartDate,
      chartSelectedEndDate : state.chartSelectedEndDate,
      setchartSelectedStartDate: state.setchartSelectedStartDate,
      setchartSelectedEndDate: state.setchartSelectedEndDate,
  }));

  useEffect(() => {
    const updateDateRange = () => {
      const today = dayjs().format('YYYY-MM-DD');
      let startDate;
      let endDate;
      if (activeDateRangeTab === 'Day') {
        startDate = today;
        endDate = today;
      } else if (activeDateRangeTab === 'Weekly') {
        const startOfWeek = dayjs().startOf('week').format('YYYY-MM-DD');
        const endOfWeek = dayjs().endOf('week').format('YYYY-MM-DD');
        startDate = startOfWeek;
        endDate = endOfWeek;
      } else if (activeDateRangeTab === 'Monthly') {
        const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
        startDate = startOfMonth;
        endDate = endOfMonth;
      }

      setchartSelectedStartDate(startDate);
      setchartSelectedEndDate(endDate);
    };
      updateDateRange();
    }, [activeDateRangeTab, setchartSelectedStartDate, setchartSelectedEndDate]);

  
  return (
    <View>
      <Card style={styles.cardBody}>
        <ProgressDateRangeTab />
        <ProgressCalendar chartStartDate={chartSelectedStartDate} chartEndDate={chartSelectedEndDate}/>
        {activeDateRangeTab === 'Day' ? (
          <TodayProgressChartDetail userId={userId} />
        ) : (
          <WeeklyProgressChartDetail userId={userId} />
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBody: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: 25,
    margin: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  hstack: {
    paddingVertical: 10,
  },
  hstackWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textLabel: {
    fontSize: 16,
    fontWeight: "bold",
    width: "70%",
  },
  textValue: {
    fontSize: 16,
    width: "50%",
  },
  titleContainer: {
    marginVertical: 30,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 24,
  },
  titleItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedIndicator: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#94B6EF",
    marginRight: 8,
  },
  incompleteIndicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#F1938E",
    marginRight: 8,
  },
});

export default ProgressChartDetail;
