import React, { useCallback, useMemo } from 'react';
import { CalendarList } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import useTaskStore from '../store/taskStore';
import dayjs from 'dayjs';
import { config } from '../styles/themeConfig';
import { SafeAreaView, Text, View, Box, Center, Pressable } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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
                marks[dateKey] = marks[dateKey] || { tasks: [], completed: 0, marked: false, dotColor: config.tokens.colors.neutral };
                marks[dateKey].tasks.push(task);
                if (task.main_status === 'complete') {
                    marks[dateKey].completed += 1;
                }
                marks[dateKey].marked = true;
            }
        });

        for (const dateKey in marks) {
            const totalTasks = marks[dateKey].tasks.length;
            const completedTasks = marks[dateKey].completed;
            const progress = (completedTasks / totalTasks) * 100;

            marks[dateKey].customStyles = {
                container: {
                    // backgroundColor: config.tokens.colors.neutral,
                    // borderRadius: 100,
                },
                text: {
                    // color: config.tokens.colors.black,
                    // fontFamily: "Archivo_600SemiBold",
                    // fontSize: 16,
                },
                fill: progress,
            };
        }

        marks[today] = {
            customStyles: {
                container: {
                    backgroundColor: config.tokens.colors.highPriority,
                    // borderRadius: 100,
                },
                text: {
                    color: config.tokens.colors.black,
                    // fontFamily: "Archivo_600SemiBold",
                    // fontSize: 16,
                    //lineHeight: 22,
                },
            },
        };

        return marks;
    }, [tasks]);

    const renderDayComponent = useCallback(({ date, state, marking }) => {
        const progress = marking?.customStyles?.fill || 0;
        const isToday = dayjs().isSame(dayjs(date.dateString), 'day')
        const isBeforeToday = dayjs(date.dateString).isBefore(dayjs(), 'day')
        const isMarked = marking?.marked
        const hasCompletedTasks = marking?.completed > 0

        return (
            <View>
                <Pressable onPress={() => handleDateSelected(date)} key={date.dateString}>
                    {((isBeforeToday || isToday) && (isMarked && hasCompletedTasks || isToday)) ? (
                        <AnimatedCircularProgress
                            size={32}
                            width={4}
                            fill={isToday ? 100 : progress}
                            rotation={0}
                            tintColor={isToday ? config.tokens.colors.highPriority : config.tokens.colors.primary}
                            backgroundColor={config.tokens.colors.neutralLight}
                            style={StyleSheet.flatten([styles.dayContainer, { backgroundColor: isToday ? config.tokens.colors.highPriority : "transparent" }])}
                        >
                            {() => (
                                <Text style={[styles.dayText, { fontWeight: isToday ? "bold" : "normal" }]}>
                                    {date.day}
                                </Text>
                            )}
                        </AnimatedCircularProgress>
                    ) : (
                        <Pressable onPress={handleDateSelected}>

                            <Box style={styles.dayContainer}>
                                <Text style={[styles.dayText]}>
                                    {date.day}
                                </Text>
                            </Box>
                        </Pressable>
                    )}
                    <Center>
                        <Box
                            style={[styles.dot, { backgroundColor: marking ? config.tokens.colors.neutral : "transparent" }]}
                        />
                    </Center>
                </Pressable>
            </View>
        );
    }, []);

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
                hideDayNames={true}
                dayComponent={renderDayComponent}
                markingType={'custom'}
                renderHeader={(date) => (
                    <Text style={styles.monthText}>
                        {dayjs(date).format('MMM YYYY')}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    monthText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: config.tokens.colors.black,
        textAlign: 'left',
        width: '100%',
        // paddingLeft: 5,
        paddingBottom: 10,
    },
    dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    dayText: {
        fontSize: 16,
        color: config.tokens.colors.black,
    },
    disabledText: {
        color: '#d9e1e8',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 50,
        marginTop: 6,
    },
});

export default MonthlyCalendar;