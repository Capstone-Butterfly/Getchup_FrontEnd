import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { defaultStyles } from '../styles/styles';
import { Divider } from '@gluestack-ui/themed';



const TaskDetails = ({ task }) => {
    return (
        <View style={defaultStyles.card}>
            <Text style={[styles.title, [defaultStyles.TypographyH2]]}>{task.title}</Text>
            <Divider style={styles.divider} />
            <View style={styles.detailItem}>
                <Image source={require('../../assets/Calendar.png')} style={styles.icon} />
                <Text style={[styles.detailText, [defaultStyles.TypographyBody]]}>{new Date(task.created_datetime).toLocaleDateString()}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.detailItem}>
                <Image source={require('../../assets/Repeat.png')} style={styles.icon} />
                <Text style={[styles.detailText, [defaultStyles.TypographyBody]]}>Does not repeat</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.detailItem}>
                <Image source={require('../../assets/Tasks.png')} style={styles.icon} />
                <Text style={[styles.detailText, [defaultStyles.TypographyBody]]}>Medium priority</Text>
            </View>
        </View>
    );
};

export default TaskDetails;

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        marginBottom: 15,
        textAlign:'center'
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingLeft: 20,
        paddingVertical: 10
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    detailText: {
        fontSize: 16,
    },
    divider: {
        backgroundColor: '#e6e6e6',
      },
});
