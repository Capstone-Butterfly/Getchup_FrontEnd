import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import DateDisplayFormat from '../utils/DateDisplayFormat';

dayjs.extend(isoWeek);

const ProgressCalendar = () => {
    const today = dayjs().format('YYYY-MM-DD');
    const [selectedDates, setSelectedDates] = useState({ start: today, end: today });
    const [selectedWeek, setSelectedWeek] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const onDayPress = (day) => {
        const date = dayjs(day.dateString);
        const todayDate = dayjs();
        const referenceDate = date.isAfter(todayDate, 'day') ? todayDate : date;

        const startOfWeek = referenceDate.startOf('week'); // Sunday
        const endOfWeek = startOfWeek.add(6, 'day'); // Saturday

        const weekDays = {};

        for (let i = 0; i < 7; i++) {
            const currentDay = startOfWeek.add(i, 'day').format('YYYY-MM-DD');
            weekDays[currentDay] = { selected: true, marked: true, selectedColor: 'blue' };
        }
        setSelectedWeek(weekDays);
        setSelectedDates({ start: startOfWeek.format('YYYY-MM-DD'), end: endOfWeek.format('YYYY-MM-DD') });
        setModalVisible(false);
    };

  return ( 
    <View style={styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pressable}>
            <Text style={styles.dateText}>
            { DateDisplayFormat(selectedDates.start, selectedDates.end)}
            </Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} transparent={true}>
            <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={selectedWeek}
                    markingType={'simple'}
                />
                {/* <Calendar
                    onDayPress={onDayPress}
                    markedDates={{ [selectedDates.start]: { selected: true, selectedColor: 'blue' }, [selectedDates.end]: { selected: true, selectedColor: 'blue' } }}
                    markingType={'simple'}
                /> */}
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
            </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pressable: {
      padding: 10,
      backgroundColor: '#007AFF',
      borderRadius: 5,
    },
    dateText: {
      color: '#fff',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
    },
    closeButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#007AFF',
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

export default ProgressCalendar;
