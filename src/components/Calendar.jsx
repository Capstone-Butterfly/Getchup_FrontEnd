import React, { useMemo, useCallback } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarList } from "react-native-calendars";
import { useNavigation } from '@react-navigation/native';
import useTaskStore from '../store/taskStore';
import dayjs from 'dayjs';

const MonthlyCalendar = () => {
    const navigation = useNavigation();
    const { tasks} = useTaskStore((state) => ({
        tasks: state.tasks,
    }));

    const handleDateSelected = useCallback((day) => {
        const date = dayjs(day.dateString);
        navigation.navigate('AgendaScreen', { selectedDate: date.format('YYYY-MM-DD') });
    }, [navigation]);

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
            />
        </SafeAreaView>
    );
};

export default MonthlyCalendar;
