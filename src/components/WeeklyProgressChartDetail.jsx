import React, {useEffect} from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Card, Text, View, VStack, HStack } from "@gluestack-ui/themed";
import { getTodayChartDetails, getWeeklyChartDetails } from "../services/progress";
import { BarChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";

const WeeklyProgressChartDetail = ({userId, weeklyStartDate, weeklyEndDate}) => {

  const { data: weeklyData, isLoading: isWeeklyLoading, isError: isWeeklyError, error: weeklyError } = useQuery({
    queryKey: ['weeklyProgressChart', userId, weeklyStartDate, weeklyEndDate], 
    queryFn: () => getWeeklyChartDetails(userId, weeklyStartDate, weeklyEndDate),
  });

  const { data: todayData , isLoading: isTodayLoading, isError: isTodayError, error: todayError} = useQuery({
    queryKey: ['todayProgressChart', userId, weeklyStartDate, weeklyEndDate], 
    queryFn: () => getTodayChartDetails(userId, weeklyStartDate, weeklyEndDate),
  });

  if (isWeeklyLoading || isTodayLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isWeeklyError || isTodayError) {
    return <Text>Error: {isWeeklyError ? weeklyError.message : todayError.message}</Text>;
  }

  const transformData = (wData) => {
    const timePeriods = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const stackData = timePeriods.map((period) => {
      const completeCount = wData.sortedTasksByDay[period]?.completeCount || 0;
      const incompleteCount = wData.sortedTasksByDay[period]?.incompleteCount || 0;
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
      <Card style={styles.cardBody}>
        {renderTitle(todayData)}
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

export default WeeklyProgressChartDetail;
