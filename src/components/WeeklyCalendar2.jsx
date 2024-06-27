import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import TaskCard from './TaskCard';
import { FlatList } from '@gluestack-ui/themed';
import useTaskStore from '../store/taskStore';
import { fetchTasksByUserId } from '../services/tasks'
import { useQuery } from '@tanstack/react-query';

const WeeklyCalendar = ({ userId, navigation }) => {

    const { tasks, setTasks, selectedDate, setSelectedDate } = useTaskStore((state) => ({
        tasks: state.tasks,
        setTasks: state.setTasks,
        selectedDate: state.selectedDate,
        setSelectedDate: state.setSelectedDate,
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
            console.log("Tasks !!!" , tasks != null ? tasks.length: 0)
        }
    }, [fetchedTask, setTasks]);

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
        console.log("selectedDateString ", selectedDateString);
        return tasks.filter(task => {
            if (task.created_datetime) {
                return task.created_datetime.split('T')[0] === selectedDateString;
            }
            return false; // or handle this case as per your application logic
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
                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'purple' }}
                style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                calendarHeaderStyle={{ color: 'black' }}
                calendarColor={'lightgrey'}
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'black' }}
                highlightDateNumberStyle={{ color: 'purple' }}
                highlightDateNameStyle={{ color: 'purple' }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                iconContainer={{ flex: 0.1 }}
                scrollable
                selectedDate={selectedDate}
                onDateSelected={handleDateSelected}
            />
            {isLoading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>Error: {error.message}</Text>
            ) : filteredTasks && filteredTasks.length === 0 ? (
                <Text>There are no tasks here yet, yay!</Text>
            ) : (
                <FlatList
                data={filteredTasks}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        navigation={navigation}
                    />
                )}
                keyExtractor={(item) => item._id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />
            )}
        </View>
    );
};

export default WeeklyCalendar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    },
});
