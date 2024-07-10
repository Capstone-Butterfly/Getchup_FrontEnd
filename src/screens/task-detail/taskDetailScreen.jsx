import { Button, ButtonText, ImageBackground, SafeAreaView } from '@gluestack-ui/themed';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import TaskDetails from '../../components/TaskDetails';
import Subtasks from '../../components/Subtasks';

const image = require('../../../assets/background/background.png');

const TaskDetailScreen = ({ route, navigation }) => {
    const { task } = route.params;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.container}>
                    <TaskDetails task={task} />
                    <Subtasks subtasks={task.subtask} />
                    <Button style={styles.focusButton} onPress={() => navigation.navigate('FocusModeScreen', { task })}>
                        <ButtonText style={styles.buttonText}>Start Focus Mode</ButtonText>
                    </Button>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: 0
    },
    imageBackground: {
        flex: 1,

    },
    container: {
        padding: 20,
    },
    
    
    focusButton: {
        backgroundColor: '#2E7D32',
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TaskDetailScreen;
