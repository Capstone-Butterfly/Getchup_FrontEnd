import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ConvertTimeStamp from '../utils/ConvertTimeStamp';
import { defaultStyles } from '../styles/styles';
import { CheckIcon, Checkbox, CheckboxIcon, CheckboxIndicator, HStack, VStack } from '@gluestack-ui/themed';
import CheckboxEmpty from '../../assets/icons/checkbox-empty.svg'
import CheckboxChecked from '../../assets/icons/checkbox-checked.svg'
import { config } from '../styles/themeConfig';

const TaskCard = ({ task, navigation, showStartTime = true, showEndTime }) => {
    const formatEstimateTime = (time) => {
        if (time === 0 || time === null) {
            return '';
        }
        return ConvertTimeStamp.convertMillisecondsToTimeString(time);
    };

    let urgency = task.task_urgency;

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
            style={getCardStyle(urgency)}
            onPress={() => navigation.navigate('TaskDetailScreen', { task })}
        >
            <HStack style={styles.task}>
                {/* <Checkbox style={styles.checkbox} accessibilityLabel="Select this option">
                    <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                </Checkbox>  */}
                {task.main_status === "complete" ? (
                    <>
                        <TouchableOpacity>
                            <CheckboxChecked style={styles.checkbox} />
                        </TouchableOpacity>
                        <Text style={[defaultStyles.TypographyBodyHeavyStrikethrough, styles.taskTitle, styles.strikethrough]}>{task.title}</Text>

                    </>
                ) : (
                    <>
                        <TouchableOpacity>
                            <CheckboxEmpty style={styles.checkbox} />
                        </TouchableOpacity>
                        <VStack style={styles.taskInfo}>
                            <Text style={[defaultStyles.TypographyBodyHeavy, styles.taskTitle]}>{task.title}</Text>
                            <Text style={[defaultStyles.TypographyBodySmall, styles.subtask]}>{task.subtask.filter(subtask => subtask.status === 'complete').length}/{task.subtask.length} Subtasks</Text>
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
        // elevation: 3,
        width: '100%',
    },
    cardTitle: {
        fontWeight: 'bold'
    },
    checkbox: {
        // borderRadius: 50,
        marginRight: 11,
        flexShrink: 0,
        alignSelf: 'left',
    },
    icon: {
        width: 24,
        height: 24,
    },
    strikethrough: {
        color: config.tokens.colors.neutral,
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
    taskTimeContainer: {
        flexShrink: 0,
        alignItems: 'flex-end',
        justifyContent: 'center',
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
