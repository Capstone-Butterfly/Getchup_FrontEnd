import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Card, Text, View, VStack, HStack } from "@gluestack-ui/themed";
import { getTodayChartDetails } from "../services/progress";
import { BarChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import DateFormatter from '../utils/DateFormatter';

const transformData = (data) => {
  const timePeriods = ["morning", "afternoon", "evening", "night"];
  const stackData = timePeriods.map((period) => {
    const completeCount = data.groupedTask[period]?.completeCount || 0;
    const incompleteCount = data.groupedTask[period]?.incompleteCount || 0;
    return {
      stacks: [
        { value: incompleteCount, color: "#F1938E", marginBottom: 2 },
        { value: completeCount, color: "#94B6EF" },
      ],
      label: period.charAt(0).toUpperCase() + period.slice(1),
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
          <Text>{data.totalCompletedTasks} Completed</Text>
        </View>
        <View style={styles.titleItem}>
          <View style={styles.incompleteIndicator} />
          <Text>{data.totalIncompleteTasks} On Going</Text>
        </View>
      </View>
    </View>
  );
};

const TodayProgressChartDetail = ({userId}) => {
  const todayDate = DateFormatter(new Date()).toLocaleString('en-CA').split(',')[0];

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['todayProgressChart', userId, todayDate, todayDate], 
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
      <Card style={styles.cardBody}>
        {renderTitle(data)}
        <BarChart
          width={240}
          noOfSections={5}
          //   barWidth={40}
          //   barBorderRadius={30}
          yAxisThickness={0}
          rulesType="solid"
          stackData={stackData}
        />
      </Card>
      <Card style={styles.cardBody}>
        <VStack space={4}>
          <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
            <Text style={styles.textLabel}>Most Productive Time</Text>
            <Text style={styles.textValue}>{data.mostProductiveTime}</Text>
          </HStack>
          <HStack space={4} style={[styles.hstack, styles.hstackWithBorder]}>
            <Text style={styles.textLabel}>Least Productive Time</Text>
            <Text style={styles.textValue}>{data.leastProductiveTime}</Text>
          </HStack>
          <HStack space={4} style={styles.hstack}>
            <Text style={styles.textLabel}>Overall Rate</Text>
            <Text style={styles.textValue}>{data.completionPercentage}%</Text>
          </HStack>
        </VStack>
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

export default TodayProgressChartDetail;
