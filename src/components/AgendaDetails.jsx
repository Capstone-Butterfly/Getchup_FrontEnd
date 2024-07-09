import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import useTaskStore from '../store/taskStore';
import TaskCard from './TaskCard';
import { defaultStyles } from '../styles/styles';
import { Divider, ImageBackground, SafeAreaView } from '@gluestack-ui/themed';

const image = require('../../assets/background/background.png');

const AgendaDetails = ({ selectedDate, navigation }) => {
  const [loadedDates, setLoadedDates] = useState([selectedDate]);
  const [loading, setLoading] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);
  const today = new Date();

  const formatDate = (date, isToday = false) => {
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return isToday ? `Today, ${formattedDate}` : formattedDate;
  };

  const formatGroupDate = (date) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
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
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => new Date(a) - new Date(b));

  return (
    <SafeAreaView>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.mainContainer}>
          <Text style={[defaultStyles.TypographyBodyHeavy, styles.todayDate]}>{formatDate(today, true)}</Text>
          {sortedDates.length > 0 ? (
            <FlatList
              data={sortedDates}
              renderItem={({ item: dateKey }) => (
                <View style={styles.container}>
                  <Text style={styles.date}>{formatGroupDate(new Date(dateKey))}</Text>
                  {groupedTasks[dateKey].map(task => (
                    <React.Fragment key={task._id}>
                      <TaskCard
                          key={task._id}
                          task={task}
                          navigation={navigation}
                          showStartTime={true}
                          showEndTime={true}
                      />
                      <Divider style={styles.divider} />
                    </React.Fragment>
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const isSameDate = (date1, date2) => (
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate()
);

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  todayDate: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginVertical: 12,
    borderRadius: 20,
    elevation: 3,
    width: '100%',
    padding: 20,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 10
  },
  divider: {
    backgroundColor: '#e6e6e6',
  },
});

export default AgendaDetails;
