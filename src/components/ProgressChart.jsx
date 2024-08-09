import React from 'react';
import { Card, FlatList, Heading, Text, Image, SafeAreaView, View, VStack, 
    Progress, ProgressFilledTrack, HStack, 
    Box} from "@gluestack-ui/themed";
import { getTodayChartDetails } from "../services/progress";
import { useQuery } from '@tanstack/react-query';
import useProgressDateRangeStore from '../store/progressDateRangeStore';
import { defaultStyles } from '../styles/styles';
import { config } from '../styles/themeConfig';
import { ActivityIndicator, StyleSheet, Platform } from 'react-native';
import Girl from '../../assets/icons/girl.svg'


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

    // if (isLoading) {
    //     return <Text style={styles.loadingText}>Loading...</Text>;
    // }
    if (isLoading) {
        return (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderBox}>
              <ActivityIndicator size="large" color={config.tokens.colors.primary} />
            </View>
        </View>
        );
      }
   

    if (error) {
        return <Text style={styles.loadingText}>Error: {error.message}</Text>;
    }

    return(
        <View style={styles.container}>
             <HStack style={styles.hstack}>
                <Heading style={defaultStyles.TypographyH1}>Progress</Heading>
             </HStack>
             <Box style={styles.headerCard}>
                <Card style={styles.card}>
                    <VStack style={styles.imageCard}>
                        <Girl style={styles.icon} />
                        {/* <Image source={require('../../assets/girl.png')} style={styles.icon} alt='girl'/> */}
                        <Text style={defaultStyles.TypographyH2}>{name}</Text>
                    </VStack>
                    <VStack style={styles.bodyCard}>
                        <View style={styles.detailItem}>
                            <Text style={defaultStyles.TypographyBodySmallHeavy}>Activity Progress</Text>
                        </View>
                        <View style={styles.progressItem}>
                            <Progress value={progressCart.completionPercentage} w={'90%'} h='$2.5'>
                            <ProgressFilledTrack bg={config.tokens.colors.primaryDark}/>
                            </Progress>
                        </View>
                        <View style={styles.percentageItem}>
                            <Text style={defaultStyles.TypographyBodySmallHeavy}>{progressCart.completionPercentage} %</Text>
                        </View>
                        <View style={styles.textItem}>
                            <Text style={defaultStyles.TypographyBody}><Text style={defaultStyles.TypographyBodyHeavy}>{progressCart.totalCompletedTasks}</Text> out of {progressCart.totalTasks} tasks completed</Text>
                        </View>
                    </VStack>
                </Card>
             </Box>
        </View>
    )
};

export default ProgressChart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    hstack: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 0,
        paddingTop: Platform.OS === "android" ? 20 : 67,
    }, 
    headerCard: {
        paddingTop:25,
        paddingBottom: 10,
    },
    card: {
        backgroundColor: config.tokens.colors.white,
        borderRadius: 20,
    },
    imageCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 0,
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
        paddingLeft: 30,
        paddingTop: 20,
    },
    progressItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 30,
        // paddingRight: 30
    },
    percentageItem :{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingRight: 30,
    },
    textItem: {
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
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginLeft: 20,
        marginBottom: 135,
      },
    loaderBox: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: config.tokens.colors.white,
        borderRadius: 20,
        paddingBottom: 20,
        marginTop: 220,
      }
});
