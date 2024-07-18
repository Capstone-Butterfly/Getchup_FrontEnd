import React, { useCallback, useMemo } from 'react';
import { CalendarList } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import useTaskStore from '../store/taskStore';
import dayjs from 'dayjs';
import { config } from '../styles/themeConfig'; 
import { SafeAreaView } from '@gluestack-ui/themed';

const MonthlyCalendar = () => {
    const navigation = useNavigation();
    const { tasks } = useTaskStore((state) => ({
        tasks: state.tasks,
    }));

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

    const handleDateSelected = useCallback((day) => {
        const date = dayjs(day.dateString).format('YYYY-MM-DD');

        const hasTasks = tasks.some(task => {
            const taskDate = new Date(task.estimate_start_date);
            if (isValidDate(taskDate)) {
                return taskDate.toISOString().split('T')[0] === date;
            } else {
                return false;
            }
            
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
            if (isValidDate(taskDate)) {
                const dateKey = taskDate.toISOString().split('T')[0];
                marks[dateKey] = { 
                marked: true,
                dotColor: config.tokens.colors.neutral, 
            };
            }
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
                    backgroundColor: config.tokens.colors.white,
                    calendarBackground: config.tokens.colors.white,
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: config.tokens.colors.white,
                    todayTextColor: config.tokens.colors.white,
                    dayTextColor: config.tokens.colors.black,
                    textDisabledColor: '#d9e1e8',
                    dotColor: config.tokens.colors.neutral,
                    selectedDotColor: config.tokens.colors.white,
                    arrowColor: 'orange',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: config.tokens.colors.black,
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