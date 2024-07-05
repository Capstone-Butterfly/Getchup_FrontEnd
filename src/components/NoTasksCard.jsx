import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Heading, Image, ButtonText, Box } from "@gluestack-ui/themed";
import { defaultStyles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NoTasksCard = ({navigation}) => {

    const handleAddTask = () => {
        navigation.navigate('AddTaskStack', {screen: 'AddTaskScreen'});
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/illustrations/no-task.png')}
                style={styles.image}
                alt=""
            />
            <Box style={styles.textContainer}>
                <Heading style={[defaultStyles.TypographyH2, styles.heading]}>No tasks yet</Heading>
                <Text style={[defaultStyles.TypographyBody, styles.text]}>Ready to add one?</Text>
            </Box>
            <Button
                size="md"
                variant="contained"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => navigation.navigate('AddTaskScreen')}
                style={[defaultStyles.ButtonDefault, styles.button]}
            >
                <ButtonText verticalAlign="middle" style={[defaultStyles.TypographyBodyHeavy, styles.buttonText]}>Add New Task</ButtonText>
            </Button>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 16,
        display: 'flex',
    },
    heading: {
        fontWeight: 'normal',
        marginBottom: 8,
        textAlign: 'center',
    },
    image: {
        width: 160,
        height: 160,
        marginBottom: 16,
    },
    text: {
        textAlign: 'center'
    },
    textContainer: {
        marginBottom: 10,
        paddingVertical: 20,
        width: "100%"
    },
});

export default NoTasksCard;
