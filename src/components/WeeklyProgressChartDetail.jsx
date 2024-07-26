import React, {useEffect, useState} from "react";
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

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState({});

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
    return (
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={config.tokens.colors.primary} />
      </View>
    );
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
      const isSelected = selectedDate === period.full;
      return {
        stacks: [
          { value: incompleteCount, color: isSelected ? config.tokens.colors.primaryDark : config.tokens.colors.highPriority, marginBottom: 0 },
          { value: completeCount, color: isSelected ? config.tokens.colors.primary : config.tokens.colors.blue }
        ],
        // stacks: [
        //   { value: incompleteCount, color: config.tokens.colors.highPriority, marginBottom: 0 },
        //   { value: completeCount, color: config.tokens.colors.blue }
        // ],
        label: period.short,
        full: period.full,
        labelTextStyle: { fontSize: 10 },
        isSelected
      };
    });
  
    return stackData;
  };  
  
  const renderTitle = (tData) => {
    const completeCount = selectedDateData.completeCount ?? tData.totalCompletedTasks;
    const incompleteCount = selectedDateData.incompleteCount ?? tData.totalIncompleteTasks;

    return (
      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <View style={styles.titleItem}>
            <View style={styles.completedIndicator} />
            <Text style={defaultStyles.TypographyLabelSmall}>{completeCount} Completed</Text>
          </View>
          <View style={styles.titleItem}>
            <View style={styles.incompleteIndicator} />
            <Text style={defaultStyles.TypographyLabelSmall}>{incompleteCount} Ongoing</Text>
          </View>
        </View>
      </View>
    );
  };

  const stackData = transformData(weeklyData);
  const now = dayjs().format('h:mm a'); 

  const handleBarPress = (period) => {
    if (period) {
      if(period.isSelected === true){
        setSelectedDate(null);
        setSelectedDateData({});
        return;
      }
      setSelectedDate(period.full);
      setSelectedDateData(weeklyData.sortedTasksByDay[period.full] || {});
    }
  };
  
  return (
    <View style={styles.container}>
        {renderTitle(todayData)}
        <Box style={styles.barchartContainer}>
          <BarChart
            width={230}
            noOfSections={5}
            barWidth={15}
            //barBorderRadius={6}
            yAxisThickness={0}
            rulesType="solid"
            stackData={stackData}
            onPress={(index) => {handleBarPress(index)}}
          />
          <Box style={styles.updateContainer}>
            <Text style={[defaultStyles.TypographyLabelSmallHeavy,styles.updateText]}>Updated today at {now}</Text>
          </Box>
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
  updateContainer: {
    flex: 1, // Make the container take full width of the parent
    flexDirection: 'row', // Ensure it's a row layout
    justifyContent: 'flex-end', // Align items to the end of the row
    alignItems: 'center', // Center align items vertically
    paddingTop: 20,
    paddingRight: 20,
  },
  updateText : {
    color: config.tokens.colors.neutralDark
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
  loaderBox: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
  }
});

export default WeeklyProgressChartDetail;
