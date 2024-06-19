import React, { useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import TaskCard from './TaskCard';
import { FlatList } from '@gluestack-ui/themed';
import useTaskStore from '../store/taskStore';
import { fetchTasksByUserId } from '../services/tasks'
import { useQuery } from '@tanstack/react-query';


const WeeklyCalendar = ({ userId }) => {

    const { tasks, setTasks, selectedDate, setSelectedDate } = useTaskStore((state) => ({
        tasks: state.tasks,
        setTasks: state.setTasks,
        selectedDate: state.selectedDate,
        setSelectedDate: state.setSelectedDate
    }));

    const storedTasks = tasks;

    if (storedTasks){
        console.log("storedTasks : ", storedTasks.length + "  " + new Date().toString());
    }
    
    const { data: fetchedTask, isLoading, error } = useQuery({
        queryKey: ['tasks'], 
        queryFn: () => fetchTasksByUserId(userId),
        enabled: !storedTasks,
    });

    useEffect(() => {
        setTasks(fetchedTask);
      }, [fetchedTask, setTasks]);

    const handleDateSelected = useCallback((date) => {
        setSelectedDate(date);
    }, [setSelectedDate]);
      

    const filterTasksByDate = (tasks, date) => {
        const selectedDateString = date.toISOString().split('T')[0];
        return tasks.filter(task => task.created_datetime.split('T')[0] === selectedDateString);
    };

    const filteredTasks = useMemo(() => {
        let tasksToFilter = tasks;
        if (storedTasks && storedTasks.length > 0) {
            tasksToFilter = storedTasks;
        }
        if (tasksToFilter && tasksToFilter.length > 0) {
            console.log("Before filteredTasks : ", tasksToFilter.length + "  " + new Date().toString());
            const filtered = filterTasksByDate(tasksToFilter, selectedDate);
            console.log("After filteredTasks : ", filtered.length + "  " + new Date().toString());
            return filtered;
        }
        return [];
    }, [tasks, storedTasks, selectedDate]);
    

    return (
        <View>
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
                title={item.title}
                created_datetime={item.created_datetime}
                totalSubtasks={item.subtask.length}
                completedSubtasks={item.subtask.filter((subtask) => subtask.status === 'complete').length}
                />
            )}
            keyExtractor={(item) => item._id}
            />
            )}
        </View>
    );
};

export default WeeklyCalendar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    listContent: {
        paddingBottom: 20,
    },
});
