import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import useTaskStore from '../store/taskStore'; // Adjust the path as necessary
import TaskCard from './TaskCard'; // Adjust the path as necessary

const AgendaDetails = ({ selectedDate, navigation }) => {
  const [loadedDates, setLoadedDates] = useState([selectedDate]);
  const [loading, setLoading] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const loadMoreDates = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      const lastLoadedDate = loadedDates[loadedDates.length - 1];
      const nextDate = new Date(lastLoadedDate);
      nextDate.setDate(lastLoadedDate.getDate() + 1);
      setLoadedDates([...loadedDates, nextDate]);
      setLoading(false);
    }, 500);
  };

  const groupTasksByDate = (tasks) => {
    const groupedTasks = {};
    tasks.forEach(task => {
      const taskStartDate = new Date(task.estimate_start_date);
      const dateKey = taskStartDate.toDateString();
      if (!groupedTasks[dateKey]) {
        groupedTasks[dateKey] = [];
      }
      groupedTasks[dateKey].push(task);
    });
    return groupedTasks;
  };

  const tasksForLoadedDates = tasks.filter(task => {
    let taskStartDate;

    try {
      taskStartDate = new Date(task.estimate_start_date);
      if (isNaN(taskStartDate.getTime())) {
        throw new Error('Invalid date');
      }
    } catch (error) {
      console.error('Error parsing task start date:', error.message);
      return false; 
    }

    return loadedDates.some(date => isSameDate(taskStartDate, date));
  });

  useEffect(() => {
    if (tasksForLoadedDates.length === 0 && loadedDates.length < 30) {
      loadMoreDates();
    }
  }, [tasksForLoadedDates]);

  const groupedTasks = groupTasksByDate(tasksForLoadedDates);

  return (
    <View style={styles.container}>
      {Object.keys(groupedTasks).length > 0 ? (
        <FlatList
          data={Object.keys(groupedTasks)}
          renderItem={({ item: dateKey }) => (
            <View>
              <Text style={styles.date}>{formatDate(new Date(dateKey))}</Text>
              {groupedTasks[dateKey].map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  navigation={navigation}
                />
              ))}
            </View>
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={loadMoreDates}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
        />
      ) : (
        <Text>Loading tasks...</Text>
      )}
    </View>
  );
};

const isSameDate = (date1, date2) => (
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate()
);

export default AgendaDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 10,
  },
});
