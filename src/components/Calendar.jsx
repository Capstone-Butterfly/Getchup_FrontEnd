import React, { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import useTaskStore from '../store/taskStore';
import dayjs from 'dayjs';
import { config } from '../styles/themeConfig'; 

const MonthlyCalendar = () => {
    const navigation = useNavigation();
    const { tasks } = useTaskStore((state) => ({
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
    }, [navigation, tasks]);

    const markedDates = useMemo(() => {
        const marks = {};
        const today = dayjs().format('YYYY-MM-DD');
        
        tasks.forEach(task => {
            const taskDate = new Date(task.estimate_start_date);
            const dateKey = taskDate.toISOString().split('T')[0];
            marks[dateKey] = { 
                marked: true,
                dotColor: '#BFBFBF',
                
            };
        });
        
        marks[today] = {
            customStyles: {
                container: {
                    backgroundColor: '#F1938E',
                    borderRadius: 100,
                },
                text: {
                    color: config.tokens.colors.black,
                    fontFamily: "Archivo_600SemiBold",
                    fontSize: 16,
                    lineHeight: 22,

                },
            },
        };
        
        return marks;
    }, [tasks]);

    return (
        <SafeAreaView>
            <CalendarList
                markedDates={markedDates}
                onDayPress={handleDateSelected}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#ffffff',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: config.tokens.colors.neutral,
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'black',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'Archivo_400Regular',
                    textMonthFontFamily: 'Archivo_400Regular',
                    textDayHeaderFontFamily: 'Archivo_400Regular',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                    dotStyle: { width: 10, height: 10, borderRadius: 20 } 
                }}
                markingType={'custom'}
            />
        </SafeAreaView>
    );
};

export default MonthlyCalendar;