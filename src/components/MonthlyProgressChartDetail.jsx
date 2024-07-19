import React, { useEffect } from "react";
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
    return <ActivityIndicator size="large" color={config.tokens.colors.primary} />;
  }

  if (isMonthlyError || isTodayError) {
    return (
      <Text>
        Error: {isMonthlyError ? monthlyError.message : todayError.message}
      </Text>
    );
  }

  const transformData = (mData) => {
    const selectedDate = dayjs(chartSelectedStartDate);
    const daysInMonth = selectedDate.daysInMonth();
    const timePeriods = Array.from({ length: daysInMonth }, (_, i) => {
        const day = (i + 1);
        return {
          full: day,
          short: day % 5 === 0 ? day : null
        };
    });

    const stackData = timePeriods.map((period) => {
      const completeCount =
        mData.sortedTasksByDay[period.full]?.completeCount || 0;
      const incompleteCount =
        mData.sortedTasksByDay[period.full]?.incompleteCount || 0;
      return {
        stacks: [
          { value: incompleteCount, color: config.tokens.colors.highPriority, marginBottom: 0 },
          { value: completeCount, color: config.tokens.colors.blue },
        ],
        label: period.short,
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
            <Text style={defaultStyles.TypographyLabelSmall}>
              {tData.totalCompletedTasks} Completed
            </Text>
          </View>
          <View style={styles.titleItem}>
            <View style={styles.incompleteIndicator} />
            <Text style={defaultStyles.TypographyLabelSmall}>
              {tData.totalIncompleteTasks} On Going
            </Text>
          </View>
        </View>
      </View>
    );
  };

//   const formatXLabel = (label) => {
//     const numericLabel = parseInt(label, 10);
//     console.log(
//       `Label: ${label}, Formatted: ${
//         numericLabel % 5 === 0 ? numericLabel.toString() : ""
//       }`
//     );
//     if (numericLabel % 5 === 0) {
//       return `${numericLabel}`;
//     }
//     return "";
//   };

//   const staticFormatXLabel = (label) => {
//     console.log("label" +label);
//     return label % 5 === 0 ? `${label}` : '';
//   };

  const stackData = transformData(monthlyData);

  return (
    <View style={styles.container}>
      {renderTitle(todayData)}
      <Box style={styles.barchartContainer}>
        <BarChart
          width={260}
          noOfSections={5}
          barWidth={5}
          barBorderRadius={0}
          yAxisThickness={0}
          xAxisLabelWidth={20}
          spacing={3}
          rulesType="solid"
        //   formatXLabel = {(label) => {
        //     console.log("label" +label);
        //     return label % 5 === 0 ? `${label}` : '';
        //   }}
          stackData={stackData}
          xAxisLabelTextStyle={{fontSize: 10, color: "black"}}
        //   rotateLabel
          xAxisTextNumberOfLines={2}
        />
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
});

export default MonthlyProgressChartDetail;
