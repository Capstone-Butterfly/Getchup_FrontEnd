import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Subtasks = ({ subtasks }) => {
    return (
        <View style={styles.subtasksContainer}>
            <Text style={styles.subtitle}>Subtask</Text>
            <FlatList
                data={subtasks}
                renderItem={({ item }) => (
                    <View style={styles.subtaskItem}>
                        <Text style={styles.subtaskTitle}>{item.sub_title}</Text>
                        <Text style={styles.subtaskTime}>{item.time} min.</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default Subtasks;

const styles = StyleSheet.create({
    subtasksContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    subtaskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    subtaskTitle: {
        fontSize: 14,
    },
    subtaskTime: {
        fontSize: 12,
        color: '#666',
    },
});
