import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from 'react';
import { Box, HStack, Heading, Text, VStack } from "@gluestack-ui/themed"
import { StyleSheet } from "react-native";
import { defaultStyles } from "../styles/styles";

const Greeting = ({name}) => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const getGreetingMessage = (name) => {
            const currentHour = new Date().getHours();
            if (currentHour >= 5 && currentHour < 12) {
                return `Good morning, ${name}!\nRise up, start fresh!`;
            } else if (currentHour >= 12 && currentHour < 17) {
                return `Good afternoon, ${name}!\nKeep going, you're halfway to your goal!`;
            } else if (currentHour >= 17 && currentHour < 21) {
                return `Good evening, ${name}!\nRelax and recharge`;
            } else {
                return `Good night, ${name}!\nRest well, for tomorrow brings new chances`;
            }
        };

        setGreeting(getGreetingMessage(name));
    }, []);

    return (
        <SafeAreaView>
            <Heading>Good morning, Nam!</Heading>
            <Text>Rise up, start fresh!</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
    },
    hstack: {
        width: '100%',
    },
    text: {
        marginTop: 8,
    },
    vstack: {
        width: '50%',
    },

})

export default Greeting;
