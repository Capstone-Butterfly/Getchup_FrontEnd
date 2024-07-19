import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Card, Text, View, VStack, HStack, Box } from "@gluestack-ui/themed";
import { getTodayChartDetails } from "../services/progress";
import { BarChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import DateFormatter from "../utils/DateFormatter";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";
import useProgressDateRangeStore from '../store/progressDateRangeStore';
import dayjs from 'dayjs';

const transformData = (data) => {
  const timePeriods = ["morning", "afternoon", "evening", "night"];
  const stackData = timePeriods.map((period) => {
    const completeCount = data.groupedTask[period]?.completeCount || 0;
    const incompleteCount = data.groupedTask[period]?.incompleteCount || 0;
    return {
      stacks: [
        {
          value: incompleteCount,
          color: config.tokens.colors.highPriority,
          marginBottom: 0,
        },
        { value: completeCount, color: config.tokens.colors.blue },
      ],
      label: period.charAt(0).toUpperCase() + period.slice(1),
      labelTextStyle: { fontSize: 10 },
    };
  });
  return stackData;
};

const renderTitle = (data) => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleRow}>
        <View style={styles.titleItem}>
          <View style={styles.completedIndicator} />
          <Text style={defaultStyles.TypographyLabelSmall}>
            {data.totalCompletedTasks} Completed
          </Text>
        </View>
        <View style={styles.titleItem}>
          <View style={styles.incompleteIndicator} />
          <Text style={defaultStyles.TypographyLabelSmall}>
            {data.totalIncompleteTasks} On Going
          </Text>
        </View>
      </View>
    </View>
  );
};

const TodayProgressChartDetail = ({ userId }) => {

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


  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["todayProgressChart", userId, chartSelectedStartDate, chartSelectedStartDate],
    queryFn: () => getTodayChartDetails(userId, chartSelectedStartDate, chartSelectedStartDate),
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color={config.tokens.colors.primary} />;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  const stackData = transformData(data);
  return (
    <View>
      {renderTitle(data)}
      <Box style={styles.barchartContainer}>
        <BarChart
          width={230}
          noOfSections={5}
          rotateLabel
          barWidth={15}
          yAxisThickness={0}
          barBorderRadius={0}
          spacing={35}
          rulesType="solid"
          xAxisTextNumberOfLines={2}
          // labelsExtraHeight={10}

          stackData={stackData}
        />
      </Box>

      <VStack style={styles.vStack}>
        <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
          <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>
            Most Productive Time
          </Text>
          <Text style={defaultStyles.TypographyBodyHeavy}>
            {data.mostProductiveTime.charAt(0).toUpperCase() +
              data.mostProductiveTime.slice(1)}
          </Text>
        </HStack>
        <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
          <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>
            Least Productive Time
          </Text>
          <Text style={defaultStyles.TypographyBodyHeavy}>
            {data.leastProductiveTime.charAt(0).toUpperCase() +
              data.leastProductiveTime.slice(1)}
          </Text>
        </HStack>
        <HStack space={4} style={styles.hstack}>
          <Text style={[styles.textLabel, defaultStyles.TypographyBodySmall]}>
            Overall Rate
          </Text>
          <Text style={defaultStyles.TypographyBodyHeavy}>
            {data.completionPercentage}%
          </Text>
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
  vStack: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingLeft: 20,
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
  textValue: {
    width: "50%",
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
  barchartContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 10,
    paddingLeft: 10,
  },
});

export default TodayProgressChartDetail;
