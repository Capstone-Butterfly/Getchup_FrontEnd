import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from 'react';
import { Box, HStack, Heading, Text, VStack } from "@gluestack-ui/themed"
import { StyleSheet } from "react-native";
import { defaultStyles } from "../styles/styles";

const Greeting = () => {
    const userId = '6668b7f95dbce97bc28322d2';
    const firstName = 'Nam';
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const getGreetingMessage = (firstName) => {
            const currentHour = new Date().getHours();
            if (currentHour >= 5 && currentHour < 12) {
                return `Good morning, ${firstName}!\nRise up, start fresh!`;
            } else if (currentHour >= 12 && currentHour < 17) {
                return `Good afternoon, ${firstName}!\nKeep going, you're halfway to your goal!`;
            } else if (currentHour >= 17 && currentHour < 21) {
                return `Good evening, ${firstName}!\nRelax and recharge`;
            } else {
                return `Good night, ${firstName}!\nRest well, for tomorrow brings new chances`;
            }
        };

        setGreeting(getGreetingMessage(firstName));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <HStack style={styles.hstack}>
                <VStack style={styles.vstack}>
                    <Heading style={defaultStyles.TypographyH2}>{greeting.split('\n')[0]}</Heading>
                    <Text style={[defaultStyles.TypographyBody, styles.text]}>{greeting.split('\n')[1]}</Text>
                </VStack>
                <VStack style={styles.vstack}>
                    <Text textAlign="center">Image here</Text>
                </VStack>
            </HStack>
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
