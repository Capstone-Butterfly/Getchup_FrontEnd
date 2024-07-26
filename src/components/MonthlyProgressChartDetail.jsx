import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Card, Text, View, VStack, HStack, Box } from "@gluestack-ui/themed";
import {
  getTodayChartDetails,
  getMonthlyChartDetails,
} from "../services/progress";
import { BarChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import useProgressDateRangeStore from "../store/progressDateRangeStore";
import dayjs from "dayjs";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";

const MonthlyProgressChartDetail = ({ userId }) => {
  const {
    activeDateRangeTab,
    chartSelectedStartDate,
    chartSelectedEndDate,
    setchartSelectedStartDate,
    setchartSelectedEndDate,
  } = useProgressDateRangeStore((state) => ({
    activeDateRangeTab: state.activeDateRangeTab,
    chartSelectedStartDate: state.chartSelectedStartDate,
    chartSelectedEndDate: state.chartSelectedEndDate,
    setchartSelectedStartDate: state.setchartSelectedStartDate,
    setchartSelectedEndDate: state.setchartSelectedEndDate,
  }));

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState({});

  const {
    data: monthlyData,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
    error: monthlyError,
  } = useQuery({
    queryKey: [
      "monthlyProgressChart",
      userId,
      chartSelectedStartDate,
      chartSelectedEndDate,
    ],
    queryFn: () =>
      getMonthlyChartDetails(
        userId,
        chartSelectedStartDate,
        chartSelectedEndDate
      ),
  });

  const {
    data: todayData,
    isLoading: isTodayLoading,
    isError: isTodayError,
    error: todayError,
  } = useQuery({
    queryKey: [
      "todayProgressChart",
      userId,
      chartSelectedStartDate,
      chartSelectedEndDate,
    ],
    queryFn: () =>
      getTodayChartDetails(
        userId,
        chartSelectedStartDate,
        chartSelectedEndDate
      ),
  });

  if (isMonthlyLoading || isTodayLoading) {
    return (
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={config.tokens.colors.primary} />
      </View>
    );
  }

  if (isMonthlyError || isTodayError) {
    return (
      <Text>
        Error: {isMonthlyError ? monthlyError.message : todayError.message}
      </Text>
    );
  }

  const transformData = (mData) => {
    const selectedMonthDate = dayjs(chartSelectedStartDate);
    const daysInMonth = selectedMonthDate.daysInMonth();
    const timePeriods = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return {
        full: day,
        short: day % 5 === 0 ? day : null,
      };
    });

    const stackData = timePeriods.map((period) => {
      const completeCount =
        mData.sortedTasksByDay[period.full]?.completeCount || 0;
      const incompleteCount =
        mData.sortedTasksByDay[period.full]?.incompleteCount || 0;
      const isSelected = selectedDate === period.full;
      return {
        stacks: [
          {
            value: incompleteCount,
            color: isSelected
              ? config.tokens.colors.primaryDark
              : config.tokens.colors.highPriority,
            marginBottom: 0,
          },
          {
            value: completeCount,
            color: isSelected
              ? config.tokens.colors.primary
              : config.tokens.colors.blue,
          },
        ],
        label: period.short,
        full: period.full,
        isSelected,
      };
    });

    return stackData;
  };

  const renderTitle = (tData) => {
    const completeCount =
      selectedDateData.completeCount ?? tData.totalCompletedTasks;
    const incompleteCount =
      selectedDateData.incompleteCount ?? tData.totalIncompleteTasks;

    return (
      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <View style={styles.titleItem}>
            <View style={styles.completedIndicator} />
            <Text style={defaultStyles.TypographyLabelSmall}>
              {completeCount} Completed
            </Text>
          </View>
          <View style={styles.titleItem}>
            <View style={styles.incompleteIndicator} />
            <Text style={defaultStyles.TypographyLabelSmall}>
              {incompleteCount} Ongoing
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const stackData = transformData(monthlyData);
  const now = dayjs().format("h:mm a");

  const handleBarPress = (period) => {
    if (period) {
      if (period.isSelected === true) {
        setSelectedDate(null);
        setSelectedDateData({});
        return;
      }
      setSelectedDate(period.full);
      setSelectedDateData(monthlyData.sortedTasksByDay[period.full] || {});
    }
  };

  return (
    <View style={styles.container}>
      {renderTitle(todayData)}
      <Box style={styles.barchartContainer}>
        <BarChart
          width={280}
          noOfSections={5}
          barWidth={5}
          barBorderRadius={0}
          yAxisThickness={0}
          xAxisLabelWidth={20}
          spacing={3}
          rulesType="solid"
          stackData={stackData}
          xAxisLabelTextStyle={{ fontSize: 10, color: "black" }}
          //   rotateLabel
          xAxisTextNumberOfLines={2}
          onPress={(index) => {
            handleBarPress(index);
          }}
        />
        <Box style={styles.updateContainer}>
          <Text
            style={[defaultStyles.TypographyLabelSmallHeavy, styles.updateText]}
          >
            Updated today at {now}
          </Text>
        </Box>
      </Box>
      <VStack style={styles.vStack}>
        <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
          <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>
            Perfect Days
          </Text>
          <Text style={defaultStyles.TypographyBodyHeavy}>
            {monthlyData.perfectDaysCount === 0
              ? "0 day"
              : `${monthlyData.perfectDaysCount} ${
                  monthlyData.perfectDaysCount === 1 ? "Day" : "Days"
                }`}
          </Text>
        </HStack>
        <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
          <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>
            Most Productive Time
          </Text>
          <Text style={defaultStyles.TypographyBodyHeavy}>
            {todayData.mostProductiveTime
              ? todayData.mostProductiveTime.charAt(0).toUpperCase() +
                todayData.mostProductiveTime.slice(1)
              : ""}
          </Text>
        </HStack>
        <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
          <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>
            Least Productive Time
          </Text>
          <Text style={defaultStyles.TypographyBodyHeavy}>
            {" "}
            {todayData.leastProductiveTime
              ? todayData.leastProductiveTime.charAt(0).toUpperCase() +
                todayData.leastProductiveTime.slice(1)
              : ""}
          </Text>
        </HStack>
        <HStack space={4} style={styles.hstack}>
          <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>
            Overall Rate
          </Text>
          <Text style={defaultStyles.TypographyBodyHeavy}>
            {todayData.completionPercentage}%
          </Text>
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
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingLeft: 20,
  },
  barchartContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
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
  updateContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
    paddingRight: 20,
  },
  updateText: {
    color: config.tokens.colors.neutralDark,
  },
  loaderBox: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
  }
});

export default MonthlyProgressChartDetail;
