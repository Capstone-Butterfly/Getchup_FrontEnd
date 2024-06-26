import React, { useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarList } from "react-native-calendars";
import { useNavigation } from '@react-navigation/native';
import useTaskStore from '../store/taskStore';
import { fetchTasksByUserId } from '../services/tasks';
import { useQuery } from '@tanstack/react-query';

const MonthlyCalendar = ({ userId }) => {
    const navigation = useNavigation();
    const { tasks, setTasks, selectedDate, setSelectedDate } = useTaskStore((state) => ({
        tasks: state.tasks,
        setTasks: state.setTasks,
        selectedDate: state.selectedDate,
        setSelectedDate: state.setSelectedDate
    }));

    const { data: fetchedTask, isLoading, error } = useQuery({
        queryKey: ['tasks', userId], 
        queryFn: () => fetchTasksByUserId(userId),
        enabled: !tasks || tasks.length === 0,
    });

    useEffect(() => {
        if (fetchedTask) {
            setTasks(fetchedTask);
        }
    }, [fetchedTask, setTasks]);

    const handleDateSelected = useCallback((day) => {
        const selectedDate = new Date(day.timestamp);
        setSelectedDate(selectedDate);
        navigation.navigate('AgendaScreen', { selectedDate: selectedDate.toISOString() });
    }, [navigation, setSelectedDate]);

    const markedDates = useMemo(() => {
        const marks = {};
        tasks.forEach(task => {
            const date = task.created_datetime.split('T')[0];
            if (!marks[date]) {
                marks[date] = { marked: true };
            }
        });
        return marks;
    }, [tasks]);

    return (
        <SafeAreaView>
            <CalendarList
                markedDates={markedDates}
                onDayPress={handleDateSelected}
                selected={selectedDate.toISOString().split('T')[0]}
            />
        </SafeAreaView>
    );
};

export default MonthlyCalendar;
