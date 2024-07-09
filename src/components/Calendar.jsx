import React, { useCallback, useMemo } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import useTaskStore from '../store/taskStore';
import dayjs from 'dayjs';

const MonthlyCalendar = () => {
    const navigation = useNavigation();
    const { tasks} = useTaskStore((state) => ({
        tasks: state.tasks,
    }));

    const handleDateSelected = useCallback((day) => {
        const date = dayjs(day.dateString).format('YYYY-MM-DD');

        const hasTasks = tasks.some(task => {
            const taskDate = new Date(task.estimate_start_date);
            return taskDate.toISOString().split('T')[0] === date;
        });

        if (hasTasks) {
            navigation.navigate('AgendaScreen', { selectedDate: date, initial: false });
        } else {
            alert('No tasks available for this date');
        }
    }, [navigation]);

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
            />
        </SafeAreaView>
    );
};

export default MonthlyCalendar;
