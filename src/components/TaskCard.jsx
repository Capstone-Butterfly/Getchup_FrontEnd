import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ConvertTimeStamp from '../utils/ConvertTimeStamp';
import { defaultStyles } from '../styles/styles';
import { Box, HStack, Icon, Pressable, VStack, View } from '@gluestack-ui/themed';
import { config } from '../styles/themeConfig';
import CheckboxEmptyIcon from '../../assets/icons/checkbox-empty.svg'
import CheckboxCheckedIcon from '../../assets/icons/checkbox-checked.svg'

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
        return [styles.urgencyBar, { backgroundColor: borderColor }];
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('TaskDetailScreen', { task })}
        >
            <HStack style={styles.task}>
                {task.main_status === "complete" ? (
                    <> 
                    {/* // task is completed */}
                        <Box style={styles.urgencyBar} />
                        <Pressable>
                            <Icon as={CheckboxCheckedIcon} style={styles.checkbox} />
                        </Pressable>
                        <Text style={[styles.taskInfo, defaultStyles.TypographyBodyHeavyStrikethrough, styles.taskTitle, styles.strikethrough]}>
                            {task.title}
                        </Text>
                    </>
                ) : (
                    <>
                        <Box style={getCardStyle(task.task_urgency)} />
                        <Pressable>
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
        // paddingVertical: 5,
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
    },
    task: {
        alignItems: 'center',
        borderBottomColor: config.tokens.colors.neutralLight,
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        maxHeight: 73,
        minHeight: 48,
        paddingVertical: 12,
        paddingRight: 10,
    },
    taskInfo: {
        alignItems: 'flex-start',
        flexGrow: 1,
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
    urgencyBar: {
        borderRadius: 10,
        height: "100%",
        marginRight: 11,
        width: 8,
    },
    view: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"

    },
});
