import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { defaultStyles } from '../styles/styles';
import { config } from '../styles/themeConfig';
import CheckboxEmpty from '../../assets/icons/checkbox-empty.svg';
import CheckboxChecked from '../../assets/icons/checkbox-checked.svg';

const extractMinutes = (timeString) => {
    const match = timeString.match(/\d+/);
    return match ? `${match[0]} min.` : timeString;
};

const Subtasks = ({ subtasks }) => {
    return (
        <View style={[defaultStyles.card]}>
            <Text style={[styles.subtitle, defaultStyles.TypographyH3]}>Subtask</Text>
            <FlatList
                data={subtasks}
                renderItem={({ item }) => (
                    <View style={styles.subtaskItem}>
                        <View style={styles.checkBoxAndTitle}>
                            <TouchableOpacity>
                                {item.status === 'complete' ? (
                                    <CheckboxChecked style={styles.checkbox} />
                                ) : (
                                    <CheckboxEmpty style={styles.checkbox} />
                                )}
                            </TouchableOpacity>
                            <Text style={[defaultStyles.TypographyBody, styles.subtaskTitle]}>{item.sub_title}</Text>
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
    time: {
        color: config.tokens.colors.neutralDark,
    },
});
