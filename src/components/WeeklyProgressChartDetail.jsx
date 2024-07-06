import React, {useEffect} from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Card, Text, View, VStack, HStack } from "@gluestack-ui/themed";
import { getTodayChartDetails, getWeeklyChartDetails } from "../services/progress";
import { BarChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import ProgressCalendar from "./ProgressCalendar";
import ProgressDateRangeTab from "./ProgressDateRangeTab";
import useProgressDateRangeStore from "../store/progressDateRangeStore";
import dayjs from "dayjs";

const WeeklyProgressChartDetail = ({userId}) => {

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
      } else if (activeDateRangeTab === 'Weekly' || activeDateRangeTab === 'Monthly') {
        const startOfWeek = dayjs().startOf('week').format('YYYY-MM-DD');
        const endOfWeek = dayjs().endOf('week').format('YYYY-MM-DD');
        startDate = startOfWeek;
        endDate = endOfWeek;
      }

      setchartSelectedStartDate(startDate);
      setchartSelectedEndDate(endDate);
    };
      updateDateRange();
    }, [activeDateRangeTab, setchartSelectedStartDate, setchartSelectedEndDate]);

  const { data: weeklyData, isLoading: isWeeklyLoading, isError: isWeeklyError, error: weeklyError } = useQuery({
    queryKey: ['weeklyProgressChart', userId, chartSelectedStartDate, chartSelectedEndDate], 
    queryFn: () => getWeeklyChartDetails(userId, chartSelectedStartDate, chartSelectedEndDate),
  });

  const { data: todayData , isLoading: isTodayLoading, isError: isTodayError, error: todayError} = useQuery({
    queryKey: ['todayProgressChart', userId, chartSelectedStartDate, chartSelectedEndDate], 
    queryFn: () => getTodayChartDetails(userId, chartSelectedStartDate, chartSelectedEndDate),
  });

  if (isWeeklyLoading || isTodayLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isWeeklyError || isTodayError) {
    return <Text>Error: {isWeeklyError ? weeklyError.message : todayError.message}</Text>;
  }

  const transformData = (wData) => {
    const timePeriods = [
      { full: "Sunday", short: "S" },
      { full: "Monday", short: "M" },
      { full: "Tuesday", short: "T" },
      { full: "Wednesday", short: "W" },
      { full: "Thursday", short: "T" },
      { full: "Friday", short: "F" },
      { full: "Saturday", short: "S" }
    ];
  
    const stackData = timePeriods.map((period) => {
      const completeCount = wData.sortedTasksByDay[period.full]?.completeCount || 0;
      const incompleteCount = wData.sortedTasksByDay[period.full]?.incompleteCount || 0;
      return {
        stacks: [
          { value: incompleteCount, color: "#F1938E", marginBottom: 2 },
          { value: completeCount, color: "#94B6EF" }
        ],
        label: period.short
      };
    });
  
    return stackData;
  };  
  
  const renderTitle = (tData) => {
    return (
      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <View style={styles.titleItem}>
            <View style={styles.completedIndicator} />
            <Text>{tData.totalCompletedTasks} Completed</Text>
          </View>
          <View style={styles.titleItem}>
            <View style={styles.incompleteIndicator} />
            <Text>{tData.totalIncompleteTasks} On Going</Text>
          </View>
        </View>
      </View>
    );
  };

  const stackData = transformData(weeklyData);
  
  return (
    <View>
        {renderTitle(todayData)}
        <BarChart
          width={240}
          noOfSections={7}
          barWidth={15}
          //barBorderRadius={30}
          yAxisThickness={0}
          rulesType="solid"
          stackData={stackData}
        />
        <VStack space={4}>
          <HStack space={4} style={styles.hstack}>
            <Text style={styles.textLabel}>Perfect Days</Text>
            <Text style={styles.textValue}>
              {weeklyData.perfectDaysCount === 0 
                ? '0 day' 
                : `${weeklyData.perfectDaysCount} ${weeklyData.perfectDaysCount === 1 ? 'day' : 'days'}`}
            </Text> 
          </HStack>
          <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
            <Text style={styles.textLabel}>Most Productive Time</Text>
            <Text style={styles.textValue}>{todayData.mostProductiveTime}</Text>
          </HStack>
          <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
            <Text style={styles.textLabel}>Least Productive Time</Text>
            <Text style={styles.textValue}>{todayData.leastProductiveTime}</Text>
          </HStack>
          <HStack space={4} style={styles.hstack}>
            <Text style={styles.textLabel}>Overall Rate</Text>
            <Text style={styles.textValue}>{todayData.completionPercentage}%</Text>
          </HStack>
        </VStack>
      
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

export default WeeklyProgressChartDetail;