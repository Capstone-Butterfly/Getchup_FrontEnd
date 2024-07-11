import React from 'react';
import { Card, FlatList, Heading, Text, Image, SafeAreaView, View, VStack, 
    Progress, ProgressFilledTrack, HStack } from "@gluestack-ui/themed";
import { getTodayChartDetails } from "../services/progress";
import { useQuery } from '@tanstack/react-query';
import useProgressDateRangeStore from '../store/progressDateRangeStore';
import { defaultStyles } from '../styles/styles';
import { config } from '../styles/themeConfig';
import { ActivityIndicator, StyleSheet } from 'react-native';


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
        // refetchOnMount: true,
        // refetchOnReconnect: true,
    });

    if (isLoading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
        return <Text style={styles.loadingText}>Error: {error.message}</Text>;
    }

    return(
        <SafeAreaView >
             <HStack style={styles.hstack}>
                <Heading style={defaultStyles.TypographyH1}>Progress</Heading>
             </HStack>
             <HStack style={styles.headerCard}>
                <Card style={defaultStyles.card}>
                    <VStack style={styles.imageCard}>
                        <Image source={require('../../assets/girl.png')} style={styles.icon} alt='girl'/>
                        <Text style={defaultStyles.TypographyH2}>{name}</Text>
                    </VStack>
                    <VStack style={styles.bodyCard}>
                        <View style={styles.detailItem}>
                            <Text style={defaultStyles.TypographyBodySmallHeavy}>Activity Progress</Text>
                        </View>
                        <View style={styles.progressItem}>
                            <Progress value={progressCart.completionPercentage} w='$80' h='$2.5'>
                            <ProgressFilledTrack bg={config.tokens.colors.primaryDark}/>
                            </Progress>
                        </View>
                        <View style={styles.percentageItem}>
                            <Text style={defaultStyles.TypographyBodySmallHeavy}>{progressCart.completionPercentage} %</Text>
                        </View>
                        <View style={styles.percentageItem}>
                            <Text style={defaultStyles.TypographyH2}>{progressCart.totalCompletedTasks} out of {progressCart.totalTasks} tasks completed</Text>
                        </View>
                    </VStack>
                </Card>
             </HStack>
        </SafeAreaView>
    )
};

export default ProgressChart;

const styles = StyleSheet.create({
    hstack: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 0,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerCard: {
        paddingHorizontal: 20,
        paddingVertical:20,
    },
    imageCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 20,
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
        paddingLeft: 7,
        paddingTop: 10,
    },
    progressItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    percentageItem :{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    loadingText: {
        color: config.tokens.colors.white,
    }
});
