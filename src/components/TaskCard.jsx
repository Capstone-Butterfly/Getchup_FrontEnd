import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ConvertTimeStamp from '../utils/ConvertTimeStamp';
import { defaultStyles } from '../styles/styles';
import { HStack, VStack, View } from '@gluestack-ui/themed';
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
                borderColor = config.tokens.colors.highPriority;
                break;
            case 'medium':
                borderColor = config.tokens.colors.mediumPriority;
                break;
            case 'low':
                borderColor = config.tokens.colors.primary;
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
                    <Text style={[defaultStyles.TypographyBodyHeavyStrikethrough, styles.taskTitle, styles.strikethrough]}>
                        {task.title}
                    </Text>
                ) : (
                        <VStack style={styles.taskInfo}>
                            <View>
                            <Text style={[defaultStyles.TypographyBodyHeavy, styles.taskTitle]}>
                                {task.title}
                            </Text>
                            <Text style={[defaultStyles.TypographyBodySmall, styles.subtask]}>
                                {task.subtask.filter(subtask => subtask.status === 'complete').length}/{task.subtask.length} Subtasks
                            </Text>
                            </View>
                        </VStack>
                )}
                <View style={styles.taskTimeContainer}>
                    {showStartTime && (
                        <Text style={[defaultStyles.TypographyLabelSmall, styles.taskTime]}>
                            {formatEstimateTime(task.estimate_start_time)}
                        </Text>
                    )}
                    {showEndTime && (
                        <Text style={[defaultStyles.TypographyLabelSmall, styles.taskTime, styles.endTime]}>
                            {formatEstimateTime(task.estimate_end_time)}
                        </Text>
                    )}
                </View>
            </HStack>
        </TouchableOpacity>
    );
};

export default TaskCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
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
        justifyContent: 'space-between', 
    },
    taskInfo: {
        alignItems: 'flex-end', 
    },
    taskTime: {
        fontSize: 12,
        lineHeight: 14,
        marginBottom: 2,
    },
    endTime: {
        color: config.tokens.colors.neutralDark
    },
    taskTimeContainer: {
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    taskTitle: {
        fontSize: 16,
        lineHeight: 20,
    },
});
