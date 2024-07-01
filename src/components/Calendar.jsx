import React, { useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarList } from "react-native-calendars";
import { useNavigation } from '@react-navigation/native';
import useTaskStore from '../store/taskStore';
import { fetchTasksByUserId } from '../services/tasks';
import { useQuery } from '@tanstack/react-query';

const MonthlyCalendar = ({ userId }) => {
    const navigation = useNavigation();
    const { tasks, selectedDate, setSelectedDate } = useTaskStore((state) => ({
        tasks: state.tasks,
        selectedDate: state.selectedDate,
        setSelectedDate: state.setSelectedDate
    }));

    const { data: fetchedTask, isLoading, error } = useQuery({
        queryKey: ['tasks', userId], 
        queryFn: () => fetchTasksByUserId(userId),
        enabled: !tasks || tasks.length === 0,
    });

    const handleDateSelected = useCallback((day) => {
        const selectedDate = new Date(day.timestamp);
        setSelectedDate(selectedDate);
        navigation.navigate('AgendaScreen', { selectedDate: selectedDate.toISOString() });
    }, [navigation, setSelectedDate]);

    const markedDates = useMemo(() => {
        const marks = {};
        tasks.forEach(task => {
            let date = "";
            if (task.estimate_start_date) {
                date = task.estimate_start_date.split('T')[0];
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
                //selected={selectedDate.toISOString().split('T')[0]}
                selected={selectedDate.toLocaleString('en-CA').split(",")[0]}
            />
        </SafeAreaView>
    );
};

export default MonthlyCalendar;
