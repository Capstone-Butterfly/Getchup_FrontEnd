import React from 'react';
import { Button, ButtonGroup, ButtonText, Card, HStack, Heading, Pressable, Text, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { formatDateToString } from "../services/notificationService";
import { config } from '../styles/themeConfig.js'
import { defaultStyles } from '../styles/styles';
import Clock from '../../assets/icons/clock.svg'
import Circle from '../../assets/icons/solid-circle.svg'
import useTaskStore from '../store/taskStore.js'
import useNotificationStore from '../store/notificationStore.js';
import { manualCompleteTask, fetchTasksByTaskId } from '../services/tasks.js';
import { markNotificationAsRead } from '../services/notificationService';


const NotificationCard = ({ navigation, notification, userId }) => {

    const { fetchTasks } = useTaskStore();
    const { notifications, refetchNotifications, setNotifications } = useNotificationStore();

    const handleMarkAsDone = async () => {
        try {
            await manualCompleteTask(notification.task_id);
            await markNotificationAsRead(notification._id);
            refetchNotifications(userId);
            const updatedNotifications = notifications.map((notif) =>
                notif._id === notification._id ? { ...notif, read: true } : notif
            );
            setNotifications(updatedNotifications);
        } catch (error) {
            console.log("error marking task as done:", error)
        }
    };

    const handleMarkAsRead = async () => {
        try {
            await markNotificationAsRead(notification._id);
            refetchNotifications(userId);
        } catch (error) {
            console.log("error marking notification as read:", error)
        }
    };

    const handleNotificationClick = async () => {
        try {
            await manualCompleteTask(notification.task_id);
            await markNotificationAsRead(notification._id);
            refetchNotifications(userId);
            const task = await fetchTasksByTaskId(notification.task_id)
            // navigation.navigate('TaskDetailScreen', task );
            console.log('navigate to task details screen')
        } catch (error) {
            console.log("error handling the click on the notification card:", error)
        }
    };

    const cardStyle = notification.read ? styles.read : styles.unread;

    return (
        <Pressable onPress={handleNotificationClick} style={styles.container}>
            <Card key={notification.identifier} style={[styles.card, cardStyle]}>
                <HStack style={styles.firstLine}>
                    {!notification.read && <Circle height="8px" width="8px" style={styles.circle} />}
                    <Clock style={styles.clock} />
                    <Heading style={[defaultStyles.TypographyH3, styles.heading]}>Reminder!</Heading>
                    <Text style={defaultStyles.TypographyLabelSmall}>{formatDateToString(notification.sent_at)}</Text>
                </HStack>
                <Text style={styles.message}>{notification.message}</Text>
                <ButtonGroup style={styles.buttonGroup}>
                    <Button style={styles.button} onPress={handleMarkAsDone}>
                        <ButtonText style={[defaultStyles.TypographyBodySmallHeavy, styles.buttonText]}>Mark as done</ButtonText>
                    </Button>
                    {!notification.read && (
                        <Button style={styles.button} onPress={handleMarkAsRead}>
                            <ButtonText style={[defaultStyles.TypographyBodySmallHeavy, styles.buttonText]}>Mark as read</ButtonText>
                        </Button>
                    )}
                </ButtonGroup>
            </Card>
        </Pressable>
    );
}

export default NotificationCard;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "transparent",
        marginRight: config.tokens.spacing.lg,
        paddingHorizontal: 0,
    },
    buttonGroup: {
        margin: 0,
        paddingLeft: 20
    },
    buttonText: {
        color: config.tokens.colors.primaryDark,
        textAlign: "left",
    },
    card: {
        borderRadius: 0,
        paddingRight: config.tokens.spacing.lg,
        width: "100%",
    },
    circle: {
        marginRight: 8,
        alignSelf: "center",
    },
    clock: {
        marginRight: 12,
    },
    container: {
        width: "100%"
    },
    heading: {
        color: config.tokens.colors.primaryDark,
        flexGrow: 1,
    },
    firstLine: {
        marginBottom: 10,
        alignContent: 'center'
    },
    message: {
        marginBottom: config.tokens.spacing.xs,
        paddingLeft: 20
    },
    read: {
        backgroundColor: config.tokens.colors.white,
    },
    unread: {
        backgroundColor: config.tokens.colors.primary,

    },
});
