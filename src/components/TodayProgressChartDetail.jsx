import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Card, Text, View, VStack, HStack, Box } from "@gluestack-ui/themed";
import { getTodayChartDetails } from "../services/progress";
import { BarChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import DateFormatter from "../utils/DateFormatter";
import { defaultStyles } from "../styles/styles";
import { config } from "../styles/themeConfig";

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
      labelTextStyle: { fontSize: 12 },
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
  const todayDate = DateFormatter(new Date())
    .toLocaleString("en-CA")
    .split(",")[0];

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["todayProgressChart", userId, todayDate, todayDate],
    queryFn: () => getTodayChartDetails(userId, todayDate, todayDate),
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
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
          barWidth={15}
          yAxisThickness={0}
          barBorderRadius={6}
          spacing={35}
          rulesType="solid"
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
