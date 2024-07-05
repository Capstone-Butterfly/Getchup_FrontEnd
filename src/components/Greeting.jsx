import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from 'react';
import { Box, HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import { StyleSheet, Image } from "react-native";
import { defaultStyles } from "../styles/styles";


const Greeting = ({ name }) => {
    const [greeting, setGreeting] = useState('');
    const [imagePath, setImagePath] = useState(null);

    useEffect(() => {
        const getGreetingMessageAndImage = (name) => {
            const currentHour = new Date().getHours();
            let message = '';
            let image = null;

            if (currentHour >= 5 && currentHour < 12) {
                message = `Good morning, ${name}!\nRise up, start fresh!`;
                image = require('../../assets/illustrations/day.png'); // Replace with your morning image path
            } else if (currentHour >= 12 && currentHour < 17) {
                message = `Good afternoon, ${name}!\nKeep going, you're halfway to your goal!`;
                image = require('../../assets/illustrations/day.png'); // Replace with your afternoon image path
            } else if (currentHour >= 17 && currentHour < 21) {
                message = `Good evening, ${name}!\nRelax and recharge`;
                image = require('../../assets/illustrations/night.png'); // Replace with your evening image path
            } else {
                message = `Good night, ${name}!\nRest well, for tomorrow brings new chances`;
                image = require('../../assets/illustrations/night.png'); // Replace with your night image path
            }

            return { message, image };
        };

        const { message, image } = getGreetingMessageAndImage(name);
        setGreeting(message);
        setImagePath(image);
    }, [name]);

    return (
        <SafeAreaView style={styles.container}>
            <HStack style={styles.hstack}>
                <VStack style={styles.vstack}>
                    <Heading style={defaultStyles.TypographyH2}>{greeting.split('\n')[0]}</Heading>
                    <Text style={[defaultStyles.TypographyBody, styles.text]}>{greeting.split('\n')[1]}</Text>
                </VStack>
                <VStack style={styles.vstack}>
                    {imagePath ? (
                        <Image source={imagePath} style={styles.image} />
                    ) : (
                        <Text textAlign="center">Image here</Text>
                    )}
                </VStack>
            </HStack>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexShrink: 0,
        marginTop: 40,
        paddingHorizontal: 20,
        width: '100%',
        marginBottom: 1,
    },
    hstack: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 0,
    },
    text: {
        marginTop: 12,
    },
    vstack: {
        width: '60%',
    
    },
    image: {
        alignSelf: 'center',
        height: 120, // Adjust the size as needed
        marginRight: 38,
        width: 116,
    },
});

export default Greeting;
