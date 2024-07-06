import React from 'react';
import { Card, FlatList, Heading, Text, Image, SafeAreaView, View, VStack, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { getTodayChartDetails } from "../services/progress";
import { useQuery } from '@tanstack/react-query';
import DateFormatter from '../utils/DateFormatter';
import useProgressDateRangeStore from '../store/progressDateRangeStore';


const ProgressChart = ({name, userId}) => {
    const { activeDateRangeTab, chartSelectedStartDate, chartSelectedEndDate } = useProgressDateRangeStore((state) => ({
        activeDateRangeTab : state.activeDateRangeTab,
        chartSelectedStartDate : state.chartSelectedStartDate,
        chartSelectedEndDate : state.chartSelectedEndDate,
    }));

    //const todayDate = DateFormatter(new Date()).toLocaleString('en-CA').split(',')[0];

    const { data: progressCart, isLoading, error, refetch } = useQuery({
        queryKey: ['ProgressChart', userId, chartSelectedStartDate, chartSelectedEndDate], 
        queryFn: () => getTodayChartDetails(userId, chartSelectedStartDate, chartSelectedEndDate),
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Error loading data</Text>
            </SafeAreaView>
        );
    }

    return(
        <SafeAreaView>
            <Heading>Progress</Heading>
            <Card style={styles.cardBody}>
                <Image source={require('../../assets/girl.png')} style={styles.icon} alt='girl'/>
                <Text>{name}</Text>
                <VStack space="lg">
                    <Text size="lg">Activity Progress</Text>
                    <Progress value={progressCart.completionPercentage} w='$80' h='$1'>
                    <ProgressFilledTrack h='$1' />
                    </Progress>
                </VStack>
                <Text>{progressCart.totalCompletedTasks} out of {progressCart.totalTasks} tasks completed</Text>
            </Card>
        </SafeAreaView>
    )
};

export default ProgressChart;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardBody:{
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: 25,
    margin: 20,
    borderRadius:20,
    marginBottom:20,
  },
  list: {
    margin: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});
