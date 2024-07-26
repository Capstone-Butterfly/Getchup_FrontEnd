import React, { useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Card, Text, View, VStack, HStack, Box } from "@gluestack-ui/themed";
import { getTodayChartDetails } from "../services/progress";
import { BarChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import DateFormatter from "../utils/DateFormatter";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";
import useProgressDateRangeStore from "../store/progressDateRangeStore";
import dayjs from "dayjs";


const TodayProgressChartDetail = ({ userId }) => {
  const {
    activeDateRangeTab,
    setActiveDateRangeTab,
    chartSelectedStartDate,
    setchartSelectedStartDate,
    chartSelectedEndDate,
    setchartSelectedEndDate,
  } = useProgressDateRangeStore((state) => ({
    activeDateRangeTab: state.activeDateRangeTab,
    setActiveDateRangeTab: state.setActiveDateRangeTab,
    chartSelectedStartDate: state.chartSelectedStartDate,
    setchartSelectedStartDate: state.setchartSelectedStartDate,
    chartSelectedEndDate: state.chartSelectedEndDate,
    setchartSelectedEndDate: state.setchartSelectedEndDate,
  }));

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState({});

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      "todayProgressChart",
      userId,
      chartSelectedStartDate,
      chartSelectedStartDate,
    ],
    queryFn: () =>
      getTodayChartDetails(
        userId,
        chartSelectedStartDate,
        chartSelectedStartDate
      ),
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return (
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={config.tokens.colors.primary} />
      </View>
    );
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  const transformData = (data) => {
    const timePeriods = [
      { full: "morning", short: "MORN" },
      { full: "afternoon", short: "AFT" },
      { full: "evening", short: "EVE" },
      { full: "night", short: "NIGHT" },
    ];
    const stackData = timePeriods.map((period) => {
      const completeCount = data.groupedTask[period.full]?.completeCount || 0;
      const incompleteCount = data.groupedTask[period.full]?.incompleteCount || 0;
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
        // label: period.short.charAt(0).toUpperCase() + period.short.slice(1),
        label: period.short,
        full: period.full,
        labelTextStyle: { fontSize: 10 },
        isSelected
      };
    });
    return stackData;
  };


  const renderTitle = (data) => {
    const completeCount =
      selectedDateData.completeCount ?? data.totalCompletedTasks;
    const incompleteCount =
      selectedDateData.incompleteCount ?? data.totalIncompleteTasks;

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

  const stackData = transformData(data);
  const now = dayjs().format("h:mm a");

  const handleBarPress = (period) => {
    if (period) {
      if(period.isSelected === true){
        setSelectedDate(null);
        setSelectedDateData({});
        return;
      }
      setSelectedDate(period.full);
      setSelectedDateData(data.groupedTask[period.full] || {});
    }
  };

  return (
    <View>
      {renderTitle(data)}
      <Box style={styles.barchartContainer}>
        <BarChart
          width={250}
          noOfSections={5}
          // rotateLabel
          barWidth={15}
          yAxisThickness={0}
          barBorderRadius={0}
          spacing={35}
          rulesType="solid"
          onPress={(index) => {
            handleBarPress(index);
          }}
          stackData={stackData}
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
            Most Productive Time
          </Text>
          <Text style={defaultStyles.TypographyBodyHeavy}>
            {data.mostProductiveTime === "No tasks completed"
              ? "-"
              : data.mostProductiveTime.charAt(0).toUpperCase() +
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

export default TodayProgressChartDetail;
