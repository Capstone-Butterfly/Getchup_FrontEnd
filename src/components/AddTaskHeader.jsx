import { HStack, Box, Button, ButtonText, Center, Heading } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { config } from '../styles/themeConfig'; // Import the theme configuration
import { defaultStyles } from '../styles/styles'

const AddTaskHeader = ({ handleCancel, handleSaveTask }) => {
    return (
        <HStack reversed={false} style={styles.headerContainer}>
            <Box width="20%" style={styles.leftItem}>
                <Button
                    size="md"
                    variant="link"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={handleCancel}
                    style={styles.button}
                >
                    <ButtonText style={[defaultStyles.TypographyBodyHeavy, styles.text]}>Cancel</ButtonText>
                </Button>
            </Box>
            <Box width="40%" style={styles.centerItem}>
                <Button
                        size="md"
                        variant="link"
                        action="primary"
                        isDisabled={false}
                        isFocusVisible={false}
                        style={styles.button}
                    >
                        <ButtonText style={[defaultStyles.TypographyH1, styles.heading, styles.text]}>New Task</ButtonText>
                    </Button>
                {/* <Heading style={[defaultStyles.TypographyH1, styles.heading]}>New Task</Heading> */}
            </Box>
            <Box width="20%" style={styles.rightItem}>
                <Button
                    size="md"
                    variant="link"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={handleSaveTask}
                    style={styles.button}
                >
                    <ButtonText verticalAlign="bottom" style={[defaultStyles.TypographyBodyHeavy, styles.text]}>Save</ButtonText>
                </Button>
            </Box>
        </HStack>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop:30,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centerItem: {
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    leftItem: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    rightItem: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    text: {
        color: config.tokens.colors.black,
        lineHeight: 30,
    },
    heading: {
        textAlign: 'center',
        alignSelf: 'center',
    }
});

export default AddTaskHeader;
