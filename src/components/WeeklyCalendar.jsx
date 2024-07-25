import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import TaskCard from './TaskCard';
import { Box, Card, Center, Divider, FlatList } from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTaskStore from '../store/taskStore';
import { fetchTasksByUserId } from '../services/tasks';
import { useQuery } from '@tanstack/react-query';
import { defaultStyles } from '../styles/styles';
import { formatDateToString } from '../services/weeklyCalendar';
import NoTasksCard from './NoTasksCard';
import TasksCompletedCard from './TasksCompletedCard';
import useNotificationStore from '../store/notificationStore';
import { config } from '../styles/themeConfig';

const WeeklyCalendar = ({ userId, navigation }) => {
    const { tasks, setTasks, selectedDate, setSelectedDate, addDataTask, updateDataTask } = useTaskStore((state) => ({
        tasks: state.tasks,
        setTasks: state.setTasks,
        selectedDate: state.selectedDate,
        setSelectedDate: state.setSelectedDate,
        addDataTask: state.addDataTask,
        updateDataTask: state.updateDataTask,
    }));

    const { data: fetchedTask, isLoading, error, refetch } = useQuery({
        queryKey: ['tasks', userId],
        queryFn: () => fetchTasksByUserId(userId),
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    useEffect(() => {
        if (fetchedTask) {
            setTasks(fetchedTask);
        }
    }, [fetchedTask, addDataTask, updateDataTask]);

    const handleDateSelected = (date) => {
        setSelectedDate(date);
    };

    const filterTasksByDate = (tasks, date) => {
        const selectedDateString = date.toISOString().split('T')[0];
        const tasksForSelectedDate = tasks.filter(task => {
            if (task.estimate_start_date) {
                return task.estimate_start_date.split('T')[0] === selectedDateString;
            }
            return false;
        });

        const incompleteTasks = tasksForSelectedDate
            .filter(task => task.main_status !== "complete")
            .sort((a, b) => new Date(a.estimate_start_time) - new Date(b.estimate_start_time))

        const completeTasks = tasksForSelectedDate
            .filter(task => task.main_status === "complete")
            .sort((a, b) => new Date(a.estimate_start_time) - new Date(b.estimate_start_time))

        return [...incompleteTasks, ...completeTasks]
    };

    const filteredTasks = useMemo(() => {
        if (tasks && tasks.length > 0) {
            return filterTasksByDate(tasks, new Date(selectedDate));
        }
        return [];
    }, [tasks, selectedDate]);

    const tasksCompleted = filteredTasks.every(task => task.main_status === "complete");

    return (
        <View style={styles.container}>
            <CalendarStrip
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                calendarColor={'white'}
                calendarHeaderStyle={StyleSheet.flatten([defaultStyles.TypographyH3, styles.calendarHeaderStyle])}
                dateNameStyle={StyleSheet.flatten([defaultStyles.TypographyLabelSmall, styles.dateNameStyle])}
                dateNumberStyle={StyleSheet.flatten([defaultStyles.TypographyBodyHeavy, styles.dateNumberStyle])}
                dayContainerStyle={styles.dayContainer}
                daySelectionAnimation={styles.daySelectionAnimation}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                highlightDateNameStyle={StyleSheet.flatten([defaultStyles.TypographyLabelSmall, styles.dateNameStyle])}
                highlightDateNumberStyle={StyleSheet.flatten([defaultStyles.TypographyBodyHeavy, styles.dateNumberStyle])}
                iconContainer={styles.iconContainer}
                leftSelector={[]}
                onDateSelected={handleDateSelected}
                rightSelector={[]}
                scrollable
                selectedDate={selectedDate}
                style={styles.calendarStrip}
                shouldAllowFontScaling={true}
                dayComponentHeight={56}
            />
            {isLoading ? (
                <Center>
                    <Text style={defaultStyles.TypographyBody}>Loading...</Text>
                </Center>
            ) : error ? (
                <Text>No Tasks!</Text>
            ) : filteredTasks && filteredTasks.length === 0 ? (
                <Card style={[defaultStyles.Card]}>
                    <Text style={[defaultStyles.TypographyH3, styles.cardDate]}>{formatDateToString(selectedDate)}</Text>
                    <NoTasksCard navigation={navigation} />
                </Card>
            ) : tasksCompleted ? (
                <Card style={defaultStyles.Card}>
                    <Text style={[defaultStyles.TypographyH3, styles.cardDate]}>{formatDateToString(selectedDate)}</Text>
                    <TasksCompletedCard tasks={filteredTasks} />
                </Card>
            ) : (
                <Card style={[defaultStyles.Card]}>
                    <Text style={[defaultStyles.TypographyH3, styles.cardDate]}>{formatDateToString(selectedDate)}</Text>
                    <FlatList
                        data={filteredTasks}
                        renderItem={({ item }) => (
                            <>
                                <TaskCard task={item} navigation={navigation} />
                                {/* <Divider style={styles.divider} /> */}
                            </>
                        )}
                        keyExtractor={(item) => item._id}
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                    />
                </Card>
            )}
        </View>
    );
};

export default WeeklyCalendar;

const styles = StyleSheet.create({
    // CALENDAR STRIP
    calendarStrip: {
        borderRadius: 20,
        height: 126,
        // marginBottom: 24,
        // marginHorizontal: 20,
        padding: 20,
        margin: 20,
        marginTop: 0,
    },
    calendarHeaderStyle: {
        marginBottom: 12,
        paddingLeft: 10,
        textAlign: 'left',
        width: '100%',
    },
    dateNameStyle: {
        fontWeight: 'normal',
        // marginTop: 4,
        marginBottom: 8,
        textTransform: 'capitalize',
    },
    dateNumberStyle: {
        // fontWeight: 'normal',
        // marginBottom: 6,
    },
    dayContainer: {
        // height: 45,
        borderRadius: 8,
        // justifyContent: 'center',
        // alignContent: 'center',
        // alignItems: 'center',
        // justifyItems: 'center'
        padding: 4
    },
    daySelectionAnimation: {
        type: 'background',
        // duration: 200,
        // borderRadius: 10,
        // borderWidth: 1,
        highlightColor: config.tokens.colors.primary,

    },
    highlightDateNumberStyle: {
        // marginBottom: 6,
    },
    highlightDateNameStyle: {
        // fontWeight: 'normal',
        // marginBottom: 10,
        // marginTop: 6,
        // textTransform: 'capitalize',
    },
    iconContainer: {
        display: 'none',
    },

    // FLATLIST
    cardDate: {
        marginBottom: 10,
    },
    listContent: {},
    tasksContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 20,
        padding: 20,
        // flex: 1,
    },

    // ROOT
    container: {
        flex: 1,
        marginTop: 15,
        marginBottom: 20
    },

});
