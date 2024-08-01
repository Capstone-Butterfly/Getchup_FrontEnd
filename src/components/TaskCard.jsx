import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ConvertTimeStamp from '../utils/ConvertTimeStamp';
import { defaultStyles } from '../styles/styles';
import { Box, HStack, Icon, Pressable, VStack, View } from '@gluestack-ui/themed';
import { config } from '../styles/themeConfig';
import CheckboxEmptyIcon from '../../assets/icons/checkbox-empty.svg'
import CheckboxCheckedIcon from '../../assets/icons/checkbox-checked.svg'
import useTaskStore from '../store/taskStore.js';
import { manualCompleteTask } from '../services/tasks.js';
import dayjs from 'dayjs';

const TaskCard = ({ task, navigation, showStartTime = true, showEndTime = false }) => {

    const { tasks, setTasks } = useTaskStore();

    const formatEstimateTime = (milliseconds) => {
        if (milliseconds === 0 || milliseconds === null) {
            return '';
        }
        // return ConvertTimeStamp.convertMillisecondsToTimeString(time);
        const timeString = ConvertTimeStamp.convertMillisecondsToTimeString(milliseconds);
        const [hours, minutes] = timeString.split(':').map(Number);
        return dayjs().hour(hours).minute(minutes).format('hh:mm A');
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
        return [styles.urgencyBar, { backgroundColor: borderColor }];
    };

    const handleMarkAsDone = async () => {
        try {
            await manualCompleteTask(task._id);

            const updatedTasks = tasks.map((t) =>
                t._id === task._id ? { ...t, main_status: "complete" } : t
            );
            setTasks(updatedTasks);
            //console.log("updating task", task._id)
        } catch (error) {
            console.log("error marking task as done:", error)
        }
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TaskDetailScreen', { task })}
        >
            <HStack style={styles.task}>
                {task.main_status === "complete" ? (
                    <> 
                        <Box style={styles.urgencyBar} />
                            <Icon as={CheckboxCheckedIcon} style={styles.checkbox} />
                        <Text style={[styles.taskInfo, defaultStyles.TypographyBodyHeavyStrikethrough, styles.taskTitle, styles.strikethrough]}>
                            {task.title}
                        </Text>
                    </>
                ) : (
                    <>
                        <Box style={getCardStyle(task.task_urgency)} />
                        <Pressable onPress={handleMarkAsDone}>
                            <Icon as={CheckboxEmptyIcon} style={styles.checkbox} />
                        </Pressable>
                        <VStack style={styles.taskInfo}>
                            <View style={styles.view}>
                                <Text style={[defaultStyles.TypographyBodyHeavy, styles.taskTitle]}>
                                    {task.title}
                                </Text>
                                <Text style={[defaultStyles.TypographyBodySmall, styles.subtask]}>
                                    {task.subtask.filter(subtask => subtask.status === 'complete').length}/{task.subtask.length} Subtasks
                                </Text>
                            </View>
                        </VStack>
                    </>
                )}
                {task.main_status !== "complete" && (
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
                )}
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
        marginVertical: 5,
        borderRadius: 8,
        width: '100%',
    },
    checkbox: {
        marginRight: 11,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: config.tokens.colors.neutralDark,
    },
    subtask: {
        color: config.tokens.colors.muted,
        marginTop: 8,
    },
    task: {
        alignItems: 'center',
        borderBottomColor: config.tokens.colors.neutralLight,
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        minHeight: 48,
        paddingVertical: 12,
        paddingRight: 10,
    },
    taskInfo: {
        alignItems: 'flex-start',
        flexGrow: 1,
        flexShrink: 1,
    },
    taskTime: {
        fontSize: 12,
        lineHeight: 14,
        marginBottom: 2,
        marginLeft: 11,
    },
    endTime: {
        color: config.tokens.colors.neutralDark
    },
    taskTimeContainer: {
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: "flex-start"
    },
    taskTitle: {
        fontSize: 16,
        lineHeight: 22,
        flexShrink: 1,
        flexWrap: "wrap",
        // maxHeight: 44,
    },
    urgencyBar: {
        borderRadius: 10,
        height: "100%",
        marginRight: 11,
        width: 6,
    },
    view: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
});
