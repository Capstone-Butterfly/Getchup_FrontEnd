import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { defaultStyles } from '../styles/styles';
import { config } from '../styles/themeConfig';
import CheckboxEmpty from '../../assets/icons/checkbox-empty.svg';
import CheckboxChecked from '../../assets/icons/checkbox-checked.svg';
import { markSubtaskAsComplete } from '../services/tasks';

const extractMinutes = (timeString) => {
    const match = timeString.match(/\d+/);
    return match ? `${match[0]} min.` : timeString;
};

const Subtasks = ({ subtasks, taskId }) => {
    const [subtaskList, setSubtaskList] = useState(subtasks);

    const handleSubtaskClick = async (subtaskIndex) => {
        const updatedSubtasks = subtaskList.map((subtask, index) => {
            if (index === subtaskIndex) {
                const newStatus = subtask.status === 'complete' ? 'new' : 'complete';
                return { ...subtask, status: newStatus, end_time: new Date().getTime() };
            }
            return subtask;
        });

        setSubtaskList(updatedSubtasks);

        const subtask = updatedSubtasks[subtaskIndex];
        const isLastStep = subtaskIndex === updatedSubtasks.length - 1;
        const endTime = subtask.end_time; 
        try {
            await markSubtaskAsComplete(
                taskId,
                endTime, 
                subtask.status,
                subtaskIndex,
                updatedSubtasks.length
            );
        } catch (error) {
            console.error("Error updating subtask:", error);
        }
    };

    return (
        <View style={[defaultStyles.card]}>
            <Text style={[styles.subtitle, defaultStyles.TypographyH3]}>Subtask</Text>
            <FlatList
                data={subtaskList}
                renderItem={({ item, index }) => (
                    <View style={styles.subtaskItem}>
                        <View style={styles.checkBoxAndTitle}>
                            <TouchableOpacity onPress={() => handleSubtaskClick(index)}>
                                {item.status === 'complete' ? (
                                    <CheckboxChecked style={styles.checkbox} />
                                ) : (
                                    <CheckboxEmpty style={styles.checkbox} />
                                )}
                            </TouchableOpacity>
                            <Text 
                                style={[
                                    defaultStyles.TypographyBody, 
                                    styles.subtaskTitle, 
                                    item.status === 'complete' && styles.strikethrough
                                ]}
                            >
                                {item.sub_title}
                            </Text>
                        </View>
                        <Text style={[defaultStyles.TypographyBody, styles.time]}>{extractMinutes(item.time)}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default Subtasks;

const styles = StyleSheet.create({
    subtitle: {
        marginBottom: 15,
    },
    subtaskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 11,
    },
    checkBoxAndTitle: {
        flexDirection: 'row',
        flex: 1,
    },
    subtaskTitle: {
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        color: config.tokens.colors.neutralDark, 
    },
    time: {
        color: config.tokens.colors.neutralDark,
    },
});
