import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { defaultStyles } from '../styles/styles';
import { Divider } from '@gluestack-ui/themed';

import CalendarSVG from '../../assets/icons/calendar.svg'
import RepeatSVG from '../../assets/icons/repeat.svg'
import TasksSVG from '../../assets/icons/tasks.svg'

const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};  

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const TaskDetails = ({ task }) => {
    return (
        <View style={[defaultStyles.card, styles.card]}>
            <Text style={[styles.title, [defaultStyles.TypographyH2]]}>{task.title}</Text>
            <Divider style={styles.divider} />
            <View style={styles.detailItem}>
                <CalendarSVG style={styles.icon} />
                <Text style={[styles.detailText, [defaultStyles.TypographyBody]]}> {formatDate(task.created_datetime)}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.detailItem}>
                <RepeatSVG style={styles.icon}/>
                <Text style={[styles.detailText, [defaultStyles.TypographyBody]]}>{task.is_repeated ?'Repeats': 'Does not repeat' }</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.detailItem}>
                <TasksSVG style={styles.icon}/>
                <Text style={[styles.detailText, [defaultStyles.TypographyBody]]}>{capitalizeFirstLetter(task.task_urgency)}</Text>
            </View>
        </View>
    );
};

export default TaskDetails;

const styles = StyleSheet.create({
    card: {
        marginVertical: 0,
        paddingHorizontal: 20,
        paddingVertical: 0
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
        textAlign:'center'
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingLeft: 20,
        paddingVertical: 10
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    detailText: {
        fontSize: 16,
    },
    divider: {
        backgroundColor: '#e6e6e6',
      },
});
