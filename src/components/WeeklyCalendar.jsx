import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import TaskCard from './TaskCard';
import { Box, Divider, FlatList } from '@gluestack-ui/themed';
import useTaskStore from '../store/taskStore';
import { fetchTasksByUserId } from '../services/tasks'
import { useQuery } from '@tanstack/react-query';
import ConvertTimeStamp from '../utils/ConvertTimeStamp';
import { defaultStyles } from '../styles/styles'
import { formatDateToString } from '../services/weeklyCalendar';

const WeeklyCalendar = ({ userId, navigation }) => {

    const { tasks, setTasks, selectedDate, setSelectedDate, addDataTask, updateDataTask } = useTaskStore((state) => ({
        tasks: state.tasks,
        setTasks: state.setTasks,
        selectedDate: state.selectedDate,
        setSelectedDate: state.setSelectedDate,
        addDataTask: state.addDataTask,
        updateDataTask: state.updateDataTask,
    }));

    const { data: fetchedTask, isLoading, error, refetch } = useQuery({
        queryKey: ['tasks', userId],
        queryFn: () => fetchTasksByUserId(userId),
        //enabled: !tasks || tasks.length === 0,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    useEffect(() => {
        if (fetchedTask) {
            setTasks(fetchedTask);
            console.log("Tasks !!!", tasks != null ? tasks.length : 0)
        }
    }, [fetchedTask, addDataTask, updateDataTask]);

    const handleDateSelected = (date) => {
        setSelectedDate(date);
    };

    // const handleRefresh = async () => {
    //     setRefreshing(true);
    //     await refetch();
    //     setRefreshing(false);
    // };

    const filterTasksByDate = (tasks, date) => {
        const selectedDateString = date.toISOString().split('T')[0];
        return tasks.filter(task => {
            if (task.estimate_start_date) {
                return task.estimate_start_date.split('T')[0] === selectedDateString;
            }
            return false;
        });
    };

    const filteredTasks = useMemo(() => {
        if (tasks && tasks.length > 0) {
            return filterTasksByDate(tasks, new Date(selectedDate));
        }
        return [];
    }, [tasks, selectedDate]);

    return (
        <View style={styles.container}>
                <CalendarStrip
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    calendarColor={'white'}
                    calendarHeaderStyle={[defaultStyles.TypographyH3, styles.calendarHeaderStyle]}
                    dateNameStyle={[defaultStyles.TypographyLabelSmall, styles.dateNameStyle]}
                    dateNumberStyle={[defaultStyles.TypographyBody, styles.dateNumberStyle]}
                    dayContainerStyle={styles.dayContainerStyle}
                    daySelectionAnimation={styles.daySelectionAnimation}
                    disabledDateNameStyle={{ color: 'grey' }}
                    disabledDateNumberStyle={{ color: 'grey' }}
                    highlightDateNameStyle={[defaultStyles.TypographyLabelSmall, styles.highlightDateNameStyle]}
                    highlightDateNumberStyle={[defaultStyles.TypographyBodyHeavy, styles.highlightDateNumberStyle]}
                    iconContainer={styles.iconContainer}
                    leftSelector={[]}
                    onDateSelected={handleDateSelected}
                    rightSelector={[]}
                    scrollable
                    selectedDate={selectedDate}
                    style={styles.calendarStrip}
                    // innerStyle={{ display: 'flex' }}
                />
            {isLoading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>No Tasks!</Text>
            ) : filteredTasks && filteredTasks.length === 0 ? (
                <Text>There are no tasks here yet, yay!</Text>
            ) : (
                <Box style={styles.tasksContainer}>
                    <Text style={[defaultStyles.TypographyH3, styles.cardDate]}>{formatDateToString(selectedDate)}</Text>
                    <FlatList
                        data={filteredTasks}
                        renderItem={({ item }) => (
                            <>
                            <TaskCard
                                task={item}
                                navigation={navigation}
                            />
                            <Divider style={styles.divider}/>
                            </>
                        )}
                        keyExtractor={(item) => item._id}
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                    />
                </Box>
            )}
        </View>
    );
};

export default WeeklyCalendar;

const styles = StyleSheet.create({
    calendarStrip: {
        borderRadius: 20,
        // flexShrink: 0,
        // height: 150,
        marginBottom: 24,
        padding: 20,
    },
    calendarHeaderStyle: {
        marginBottom: 8,
        paddingLeft: 0,
        textAlign: 'left',
        width: '100%'
    },
    cardDate: {
        marginBottom: 10,
    },
    container: {
        // flex: 1,
        // backgroundColor: '#e6e6e6',
        marginTop: 24,
        // padding: 0,
    },
    dateNameStyle: {
        fontWeight: 'normal',
        marginTop: 6,
        marginBottom: 10,
        textTransform: 'capitalize',
    },
    dateNumberStyle: {
        fontWeight: 'normal',
        marginBottom: 6,
    },
    dayContainerStyle: {
        borderRadius: 10,
        // height: '100%',
    },
    daySelectionAnimation: {
        type: 'background',
        duration: 200,
        borderRadius: 0,
        borderWidth: 1,
        highlightColor: '#f1938e',
        padding: 2,
        paddingLeft: 6,
        paddingRight: 6,
    },
    divider: {
        backgroundColor: '#e6e6e6',
        
    },
    highlightDateNumberStyle: {
        marginBottom: 6,
    },
    highlightDateNameStyle: {
        fontWeight: 'normal',
        marginBottom: 10,
        marginTop: 6,
        textTransform: 'capitalize',
    },
    iconContainer: {
        display: 'none',
    },
    list: {
        // flex: 1,
    },
    listContent: {

    },
    tasksContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
});
