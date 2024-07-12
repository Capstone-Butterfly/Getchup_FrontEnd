import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Heading, Image, ButtonText, Box } from "@gluestack-ui/themed";
import { defaultStyles } from '../styles/styles';
import CompleteImg from '../../assets/illustrations/complete.svg'

const TasksCompletedCard = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>

            <Image source={require('../../assets/illustrations/congrats.gif')} style={styles.image} alt="" />
            {/* <CompleteImg style={styles.image}/> */}
            <Box style={styles.textContainer}>
                <Heading style={[defaultStyles.TypographyH2, styles.heading]}>All tasks completed</Heading>
                <Text style={[defaultStyles.TypographyBody, styles.text]}>Enjoy the rest of the day</Text>
            </Box>

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
        width: 200,
        height: 150,
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

export default TasksCompletedCard;
