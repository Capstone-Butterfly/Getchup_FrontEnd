import React, {useEffect} from "react";
import { StyleSheet } from "react-native";
import { Card, View, SafeAreaView } from "@gluestack-ui/themed";
import ProgressCalendar from "./ProgressCalendar";
import ProgressDateRangeTab from "./ProgressDateRangeTab";
import useProgressDateRangeStore from "../store/progressDateRangeStore";
import WeeklyProgressChartDetail from "../components/WeeklyProgressChartDetail"
import MonthlyProgressChartDetail from "../components/MonthlyProgressChartDetail";
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
    <SafeAreaView style={styles.container}>
      <Card style={styles.cardBody}>
        <ProgressDateRangeTab />
        <ProgressCalendar chartStartDate={chartSelectedStartDate} chartEndDate={chartSelectedEndDate}/>
        {activeDateRangeTab === 'Day' ? (
          <TodayProgressChartDetail userId={userId} />
        ) : activeDateRangeTab === 'Weekly' ? (
          <WeeklyProgressChartDetail userId={userId} />
        ) : (
          <MonthlyProgressChartDetail userId={userId} />
        )}
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  cardBody: {
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    
  },
});

export default ProgressChartDetail;
