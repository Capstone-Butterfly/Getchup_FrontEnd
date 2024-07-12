import React, {useEffect} from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Card, Text, View, VStack, HStack, Box } from "@gluestack-ui/themed";
import { getTodayChartDetails, getWeeklyChartDetails } from "../services/progress";
import { BarChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import ProgressCalendar from "./ProgressCalendar";
import ProgressDateRangeTab from "./ProgressDateRangeTab";
import useProgressDateRangeStore from "../store/progressDateRangeStore";
import dayjs from "dayjs";
import { defaultStyles } from '../styles/styles';
import { config } from '../styles/themeConfig';

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
          { value: incompleteCount, color: "#F1938E", marginBottom: 0 },
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
            <Text style={defaultStyles.TypographyLabelSmall}>{tData.totalCompletedTasks} Completed</Text>
          </View>
          <View style={styles.titleItem}>
            <View style={styles.incompleteIndicator} />
            <Text style={defaultStyles.TypographyLabelSmall}>{tData.totalIncompleteTasks} On Going</Text>
          </View>
        </View>
      </View>
    );
  };

  const stackData = transformData(weeklyData);
  
  return (
    <View style={styles.container}>
        {renderTitle(todayData)}
        <Box style={styles.barchartContainer}>
          <BarChart
            width={260}
            noOfSections={7}
            barWidth={15}
            barBorderRadius={6}
            yAxisThickness={0}
            rulesType="solid"
            stackData={stackData}
          />
        </Box>
        <VStack style={styles.vStack}>
          <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
            <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>Perfect Days</Text>
            <Text style={defaultStyles.TypographyBodyHeavy}>
              {weeklyData.perfectDaysCount === 0 
                ? '0 day' 
                : `${weeklyData.perfectDaysCount} ${weeklyData.perfectDaysCount === 1 ? 'Day' : 'Days'}`}
            </Text> 
          </HStack>
          <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
            <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>Most Productive Time</Text>
            <Text style={defaultStyles.TypographyBodyHeavy}>{todayData.mostProductiveTime ? todayData.mostProductiveTime.charAt(0).toUpperCase() + todayData.mostProductiveTime.slice(1) : ''}</Text>
          </HStack>
          <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
            <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>Least Productive Time</Text>
            <Text style={defaultStyles.TypographyBodyHeavy}> {todayData.leastProductiveTime ? todayData.leastProductiveTime.charAt(0).toUpperCase() + todayData.leastProductiveTime.slice(1) : ''}</Text>
          </HStack>
          <HStack space={4} style={styles.hstack}>
            <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>Overall Rate</Text>
            <Text style={defaultStyles.TypographyBodyHeavy}>{todayData.completionPercentage}%</Text>
          </HStack>
        </VStack>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vStack: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingLeft: 20,
  },
  barchartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 5,
    paddingLeft: 10,
  },
  hstack: {
    paddingVertical: 20,
  },
  hstackWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: config.tokens.colors.neutralLight,
  },
  textLabel: {
    width: "70%",
  },
  titleContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  titleItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedIndicator: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: config.tokens.colors.blue,
    marginRight: 8,
  },
  incompleteIndicator: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: config.tokens.colors.highPriority,
    marginRight: 8,
  },
});

export default WeeklyProgressChartDetail;
