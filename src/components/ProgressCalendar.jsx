import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import DateDisplayFormat from '../utils/DateDisplayFormat';
import useProgressDateRangeStore from '../store/progressDateRangeStore';
import { defaultStyles } from '../styles/styles';
import { config } from '../styles/themeConfig';
import { Modal, ModalBackdrop, ModalContent, ModalHeader } from '@gluestack-ui/themed';

dayjs.extend(isoWeek);

const ProgressCalendar = ({chartStartDate, chartEndDate}) => {
    const { activeDateRangeTab, setActiveDateRangeTab, 
      chartSelectedStartDate, setchartSelectedStartDate,
      chartSelectedEndDate, setchartSelectedEndDate } = useProgressDateRangeStore((state) => ({
        activeDateRangeTab : state.activeDateRangeTab,
        setActiveDateRangeTab : state.setActiveDateRangeTab,
        chartSelectedStartDate : state.chartSelectedStartDate,
        setchartSelectedStartDate : state.setchartSelectedStartDate,
        chartSelectedEndDate : state.chartSelectedEndDate,
        setchartSelectedEndDate : state.setchartSelectedEndDate,
    }));

    useEffect(() => {
      setchartSelectedStartDate(chartStartDate);
      setchartSelectedEndDate(chartEndDate);
    }, [chartStartDate, setchartSelectedStartDate, chartEndDate, setchartSelectedEndDate]);

    const today = dayjs().format('YYYY-MM-DD');
    const [selectedDates, setSelectedDates] = useState({
      [today]: {
          selected: true,
          customStyles: {
              container: {
                  backgroundColor: config.tokens.colors.primary,
                  borderRadius: 15
              },
              text: {
                  color: config.tokens.colors.black,
                  fontWeight: 'bold'
              }
          }
      }
  });
    const [modalVisible, setModalVisible] = useState(false);

    const onDayPress = (day) => {
      const date = dayjs(day.dateString);
      const todayDate = dayjs();
      const referenceDate = date.isAfter(todayDate, 'day') ? todayDate : date;

      let startDate;
      let endDate;
      let dates = {};

      if (activeDateRangeTab === 'Day') {
        startDate = date.format('YYYY-MM-DD');
        endDate = date.format('YYYY-MM-DD');
        dates[startDate] = { selected: true, customStyles: { container: { backgroundColor: config.tokens.colors.primary , borderRadius: 15 }, text: { color: config.tokens.colors.black , fontWeight: 'bold'} } };
      } else if (activeDateRangeTab === 'Weekly') {
        startDate = referenceDate.startOf('week').format('YYYY-MM-DD');
        endDate = referenceDate.endOf('week').format('YYYY-MM-DD');
        for (let i = 0; i < 7; i++) {
          const currentDay = dayjs(startDate).add(i, 'day').format('YYYY-MM-DD');
          //dates[date.format('YYYY-MM-DD')] = { selected: true, customStyles: { container: { backgroundColor: config.tokens.colors.primary , borderRadius: 15 }, text: { color: config.tokens.colors.black, fontWeight: 'bold'} } };
          dates[currentDay] = { selected: true, customStyles: { container: { backgroundColor: config.tokens.colors.primary , borderRadius: 15 }, text: { color: config.tokens.colors.black, fontWeight: 'bold'} } };
        }
      } else if (activeDateRangeTab === 'Monthly') {
        startDate = referenceDate.startOf('month').format('YYYY-MM-DD');
        endDate = referenceDate.endOf('month').format('YYYY-MM-DD');
        for (let i = 0; i < dayjs(endDate).diff(startDate, 'day') + 1; i++) {
          const currentDay = dayjs(startDate).add(i, 'day').format('YYYY-MM-DD');
          //dates[date.format('YYYY-MM-DD')] = { selected: true, customStyles: { container: { backgroundColor: config.tokens.colors.primary , borderRadius: 15 }, text: { color: config.tokens.colors.black, fontWeight: 'bold'} } };
          dates[currentDay] = { selected: true, customStyles: { container: { backgroundColor: config.tokens.colors.primary , borderRadius: 15 }, text: { color: config.tokens.colors.black , fontWeight: 'bold'} } };
        }
      }

      setSelectedDates(dates);
      setchartSelectedStartDate(startDate);
      setchartSelectedEndDate(endDate);
      setModalVisible(false);
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pressable}>
        <Text style={[defaultStyles.TypographyBodyHeavy]}>
          {DateDisplayFormat(chartSelectedStartDate, chartSelectedEndDate)}
        </Text>
      </TouchableOpacity>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <ModalBackdrop/>
        <ModalContent>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={selectedDates}
              markingType={'custom'}
              theme={{
                arrowColor: config.tokens.colors.black,
                textMonthFontWeight: 'bold',
                textDayFontWeight: 'normal',
                textDayHeaderFontWeight: 'normal',
                todayTextColor: config.tokens.colors.primaryDark,
                selectedDayBackgroundColor: config.tokens.colors.primary,
                selectedDayTextColor: config.tokens.colors.black,
              }}
            />              
          </View> 
      </ModalContent>
    </Modal>
      {/* <Modal visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={selectedDates}
                markingType={'custom'}
                theme={{
                  arrowColor: config.tokens.colors.black,
                  textMonthFontWeight: 'bold',
                  textDayFontWeight: 'normal',
                  textDayHeaderFontWeight: 'normal',
                  todayTextColor: config.tokens.colors.primaryDark,
                  selectedDayBackgroundColor: config.tokens.colors.primary,
                  selectedDayTextColor: config.tokens.colors.black,
              }}
              />              
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      // borderWidth: 1,
      // borderColor: 'black'
    },
    pressable: {
      paddingTop: 20,
      paddingLeft: 20,
      borderRadius: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.125)',
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
