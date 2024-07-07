import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConvertTimeStamp from '../utils/ConvertTimeStamp';
import { defaultStyles } from '../styles/styles'
import { CheckIcon, Checkbox, CheckboxIcon, CheckboxIndicator, HStack, Icon, VStack } from '@gluestack-ui/themed';
import { Svg, SvgUri } from 'react-native-svg';

const noTask = require('../../assets/icons/no-task.svg')

const TaskCard = ({ task, navigation }) => {
    const formatEstimateStartTime = (time) => {
        if (time === 0 || time === null) {
            return '';
        }
        return ConvertTimeStamp.convertMillisecondsToTimeString(time);
    };

    let urgency = task.task_urgency

    const getCardStyle = (urgency) => {
        let borderColor;
        switch (urgency) {
            case 'high':
                borderColor = '#f1938e';
                break;
            case 'medium':
                borderColor = '#efe37d';
                break;
            case 'low':
                borderColor = '#94b6ef';
                break;
            default:
                borderColor = 'transparent';
        }
        return [styles.card, { borderLeftWidth: 7, borderLeftColor: borderColor, elevation: 0 }];
    };

    return (
        <TouchableOpacity
            style={getCardStyle(urgency)}
            onPress={() => navigation.navigate('TaskDetailScreen', { task })}
        >
            <HStack style={styles.task}>
                <VStack style={styles.taskInfo}>
                    <Text style={[defaultStyles.TypographyBodyHeavy, styles.taskTitle]}>{task.title}</Text>
                    <Text style={[defaultStyles.TypographyBodySmall, styles.subtask]}>{task.subtask.filter(subtask => subtask.status === 'complete').length}/{task.subtask.length} Subtasks</Text>
                </VStack>
                <Text style={[defaultStyles.TypographyLabelSmall, styles.taskTime]}>{formatEstimateStartTime(task.estimate_start_time)}</Text>
            </HStack>
        </TouchableOpacity>
    );
};

export default TaskCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        paddingHorizontal: 11,
        paddingVertical: 5,
        marginVertical: 12,
        borderRadius: 8,
        elevation: 3,
        width: '100%',
    },
    cardTitle: {
        fontWeight: 'bold'
    },
    checkbox: {
        borderRadius: '50%',
        marginRight: 11,
        flexShrink: 0,
        alignSelf: 'left',
    },
    icon: {
        width: 24,
        height: 24,
    },
    subtask: {
        width: '100%',
        display: 'block',
        flexShrink: 1,
    },
    task: {
        display: 'flex',
        width: '100%',
    },
    taskInfo: {
        flexShrink: 1,
        flexGrow: 1,
    },
    taskTime: {
        flexShrink: 0,
    },
    taskTitle: {
        marginBottom: 8,
        display: 'block',
        width: '100%',
    },

});
