import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TaskDetails = ({ task }) => {
    return (
        <View style={styles.detailsContainer}>
            <Text style={styles.title}>{task.title}</Text>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/Calendar.png')} style={styles.icon} />
                <Text style={styles.detailText}>{new Date(task.created_datetime).toLocaleDateString()}</Text>
            </View>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/Repeat.png')} style={styles.icon} />
                <Text style={styles.detailText}>Does not repeat</Text>
            </View>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/Tasks.png')} style={styles.icon} />
                <Text style={styles.detailText}>Medium priority</Text>
            </View>
        </View>
    );
};

export default TaskDetails;

const styles = StyleSheet.create({
    detailsContainer: {
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    detailText: {
        fontSize: 16,
    },
});
