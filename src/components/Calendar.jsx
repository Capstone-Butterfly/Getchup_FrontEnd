import React, { useCallback, useMemo } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import useTaskStore from '../store/taskStore';
import { fetchTasksByUserId } from '../services/tasks';
import { useQuery } from '@tanstack/react-query';

const MonthlyCalendar = ({ userId }) => {



    const navigation = useNavigation();

    const { tasks, selectedDate, setSelectedDate } = useTaskStore((state) => ({
        tasks: state.tasks,
        selectedDate: state.selectedDate,
        setSelectedDate: state.setSelectedDate,
        setTasks: state.setTasks,
    }));

    const handleDateSelected = useCallback((day) => {
        const selectedDate = new Date(day.timestamp);
        setSelectedDate(selectedDate);

        // Check if there are tasks for the selected date
        const hasTasks = tasks.some(task => {
            const taskDate = new Date(task.estimate_start_date);
            return taskDate.toDateString() === selectedDate.toDateString();
        });

        if (hasTasks) {
            navigation.navigate('AgendaScreen', { selectedDate: selectedDate.toISOString(), initial: false });
        } else {
            // Optionally provide feedback that no tasks are available for this date
            alert('No tasks available for this date');
        }
    }, [navigation, setSelectedDate, tasks]);

    const markedDates = useMemo(() => {
        const marks = {};
        tasks.forEach(task => {
            const taskDate = new Date(task.estimate_start_date);
            const dateKey = taskDate.toISOString().split('T')[0];
            marks[dateKey] = { marked: true };
        });
        return marks;
    }, [tasks]);

    return (
        <SafeAreaView>
            <CalendarList
                markedDates={markedDates}
                onDayPress={handleDateSelected}
                selected={new Date(selectedDate).toLocaleString('en-CA').split(',')[0]}
            />
        </SafeAreaView>
    );
};

export default MonthlyCalendar;
