import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ConvertTimeStamp from '../utils/ConvertTimeStamp';
import { defaultStyles } from '../styles/styles';
import CheckboxEmpty from '../../assets/icons/checkbox-empty.svg';
import CheckboxChecked from '../../assets/icons/checkbox-checked.svg';
import { HStack, VStack } from '@gluestack-ui/themed';
import { config } from '../styles/themeConfig';

const TaskCard = ({ task, navigation, showStartTime = true, showEndTime = false }) => {
    const formatEstimateTime = (time) => {
        if (time === 0 || time === null) {
            return '';
        }
        return ConvertTimeStamp.convertMillisecondsToTimeString(time);
    };

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
        return [styles.card, { borderLeftWidth: 7, borderLeftColor: borderColor }];
    };

    return (
        <TouchableOpacity
            style={getCardStyle(task.task_urgency)}
            onPress={() => navigation.navigate('TaskDetailScreen', { task })}
        >
            <HStack style={styles.task}>
                {task.main_status === "complete" ? (
                    <>
                        <TouchableOpacity>
                            <CheckboxChecked style={styles.checkbox} />
                        </TouchableOpacity>
                        <Text style={[defaultStyles.TypographyBodyHeavyStrikethrough, styles.taskTitle, styles.strikethrough]}>
                            {task.title}
                        </Text>
                    </>
                ) : (
                    <>
                        <TouchableOpacity>
                            <CheckboxEmpty style={styles.checkbox} />
                        </TouchableOpacity>
                        <VStack style={styles.taskInfo}>
                            <Text style={[defaultStyles.TypographyBodyHeavy, styles.taskTitle]}>
                                {task.title}
                            </Text>
                            <Text style={[defaultStyles.TypographyBodySmall, styles.subtask]}>
                                {task.subtask.filter(subtask => subtask.status === 'complete').length}/{task.subtask.length} Subtasks
                            </Text>
                        </VStack>
                    </>
                )}
                <VStack style={styles.taskTimeContainer}>
                    {showStartTime && (
                        <Text style={[defaultStyles.TypographyLabelSmall, styles.taskTime]}>
                            {formatEstimateTime(task.estimate_start_time)}
                        </Text>
                    )}
                    {showEndTime && (
                        <Text style={[defaultStyles.TypographyLabelSmall, styles.taskTime]}>
                            {formatEstimateTime(task.estimate_end_time)}
                        </Text>
                    )}
                </VStack>
            </HStack>
        </TouchableOpacity>
    );
};

export default TaskCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: config.tokens.colors.white,
        paddingHorizontal: 11,
        paddingVertical: 5,
        marginVertical: 12,
        borderRadius: 8,
        width: '100%',
    },
    checkbox: {
        marginRight: 11,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    subtask: {
        color: config.tokens.colors.muted,
    },
    task: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    taskInfo: {
        flex: 1,
        marginLeft: 10,
    },
    taskTime: {
        fontSize: 12,
        lineHeight: 14,
        marginBottom: 2,
    },
    taskTimeContainer: {
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    taskTitle: {
        fontSize: 16,
        lineHeight: 20,
    },
});
