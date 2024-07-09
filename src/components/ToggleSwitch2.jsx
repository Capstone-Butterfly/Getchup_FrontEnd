import React from 'react';
import { StyleSheet } from "react-native";
import { Switch } from '@petros-g/react-native-switch';
import useCreateTaskStore from "../store/createTaskStore";
import { HStack, Text, View } from "@gluestack-ui/themed";
import { config } from '../styles/themeConfig';
import { defaultStyles } from '../styles/styles';

const ToggleSwitch2 = () => {

    const { movement_reminder, setMovementReminder } = useCreateTaskStore((state) => ({
        movement_reminder: state.movement_reminder,
        setMovementReminder: state.setMovementReminder,
    }));

    const toggleSwitch = () => {
        setMovementReminder(!movement_reminder);
    };

    return (
        <View style={styles.container}>
            <HStack style={styles.hstack}>
                <Text style={[defaultStyles.TypographyBodyHeavy, styles.text]}>Track Movement</Text>
                <Switch
                disabled={false}
                value={movement_reminder}
                onValueChange={toggleSwitch}
                enableDrag={false}
                trackWidth={32}
                trackHeight={16}
                circleSize={8}
                circleOffset={-3}
                circleActiveColor="white"
                trackActiveColor={config.tokens.colors.primaryDark}
                trackInactiveColor={config.tokens.colors.neutral}
                animationDuration={200}
                style={styles.switch}
                />
            </HStack>
        </View>
    )
}

export default ToggleSwitch2;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 20,
    },
    hstack: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        
    },
    switch: {
        flexGrow: 0,
    },
    text: {
        flexGrow: 1,
    },
  });
