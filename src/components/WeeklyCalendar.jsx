import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import CalendarStrip from 'react-native-calendar-strip';
import TaskCard from './TaskCard';
import { FlatList } from '@gluestack-ui/themed';

const WeeklyCalendar = ({ userId }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        axios.get('http://52.55.48.104:8080/api/v1/tasks')
            .then(response => {
                const userTasks = response.data.filter(task => task.user_id === userId);
                setTasks(userTasks);
                setLoading(false);
                console.log(userTasks);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [userId]);

    const handleDateSelected = (date) => {
        setSelectedDate(date);
    };

    const filterTasksByDate = (tasks, date) => {
        const selectedDateString = date.toISOString().split('T')[0];
        return tasks.filter(task => task.created_datetime.split('T')[0] === selectedDateString);
    };

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    const filteredTasks = filterTasksByDate(tasks, selectedDate);

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
            {
                filteredTasks.length == 0 && (
                    <Text>There are no tasks here yet, yay!</Text>
                )
            }
            <FlatList
                data={filteredTasks}
                renderItem={({ item }) => {
                    const totalSubtasks = item.subtask.length;
                    const completedSubtasks = item.subtask.filter(subtask => subtask.status === 'completed').length;

                    return (
                        <TaskCard
                            title={item.title}
                            created_datetime={item.created_datetime}
                            totalSubtasks={totalSubtasks}
                            completedSubtasks={completedSubtasks}
                        />
                    );
                }}
                keyExtractor={(item) => item._id}
            />
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
