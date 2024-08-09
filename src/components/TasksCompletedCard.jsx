import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Heading, Image, ButtonText, Box, FlatList, Divider, HStack, Icon, Card } from "@gluestack-ui/themed";
import { defaultStyles } from '../styles/styles';
import CheckedIcon from '../../assets/icons/checkbox-checked.svg'
import { config } from '../styles/themeConfig';

const TasksCompletedCard = ({ navigation, tasks }) => {

    return (
        <SafeAreaView style={styles.container}>

            <Image source={require('../../assets/illustrations/congrats.gif')} style={styles.image} alt="" />
            {/* <CompleteImg style={styles.image}/> */}
            <Box style={styles.textContainer}>
                <Heading style={[defaultStyles.TypographyH2, styles.heading]}>All tasks completed</Heading>
                <Text style={[defaultStyles.TypographyBody, styles.text]}>Enjoy the rest of the day</Text>
            </Box>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <>
                        <Card style={styles.card}>
                            <HStack>
                                <Icon as={CheckedIcon} style={styles.icon} />
                                <Text style={[defaultStyles.TypographyBodyHeavyStrikethrough, styles.taskTitle, styles.strikethrough]}>{item.title}</Text>
                            </HStack>
                        </Card>
                    </>
                )}
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
    },
    card: {
        backgroundColor: "transparent",
        borderBottomColor: config.tokens.colors.neutralLight,
        borderBottomWidth: 1,
        elevation: 0,
        margin: 0,
        marginTop: 10,
        paddingHorizontal: 17,
        paddingVertical: 12,
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
    icon: {
        marginRight: 11,
    },
    image: {
        width: 215,
        height: 150,
        marginBottom: 16,
        marginTop: Platform.OS === "android" ? 0 : -50,
    },
    list: {
        width: "100%",
        
    },
    listContent: {
        paddingHorizontal: 20,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: config.tokens.colors.neutralDark,
    },
    taskTitle: {
        color: config.tokens.colors.neutralDark,
        shadowColor: "transparent"
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
