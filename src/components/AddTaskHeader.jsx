import { HStack, Box, Button, ButtonText, Center, Heading } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { config } from '../styles/themeConfig'; // Import the theme configuration
import { defaultStyles } from '../styles/styles'

const AddTaskHeader = ({ handleCancel, handleSaveTask }) => {
    return (
        <HStack space="4xl" reversed={false} style={styles.headerContainer}>
            <Box width="20%" style={styles.leftItem}>
                <Button
                    size="md"
                    variant="link"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={handleCancel}
                >
                    <ButtonText verticalAlign="middle" style={[defaultStyles.TypographyBody, styles.text]}>Cancel</ButtonText>
                </Button>
            </Box>
            <Box width="40%">
                <Center>
                    <Heading style={defaultStyles.TypographyH1}>New Task</Heading>
                </Center>
            </Box>
            <Box width="20%" style={styles.rightItem}>
                <Button
                    size="md"
                    variant="link"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={handleSaveTask}
                >
                    <ButtonText verticalAlign="middle" style={[defaultStyles.TypographyBody, styles.text]}>Save</ButtonText>
                </Button>
            </Box>
        </HStack>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop:40,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftItem: {
        alignItems: 'flex-start',
    },
    rightItem: {
        alignItems: 'flex-end',
    },
    text: {
        color: config.tokens.colors.black,
    }
});

export default AddTaskHeader;
