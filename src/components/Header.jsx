import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, ModalContent, HStack, Icon, Heading, Pressable, ModalHeader, ModalBody, ModalCloseButton } from "@gluestack-ui/themed";
import { CloseIcon } from '@gluestack-ui/themed';
import useNotificationStore from '../store/notificationStore';
import NotificationsList from './NotificationList';
import { defaultStyles } from '../styles/styles';
import NotificationIcon from '../../assets/icons/notification.svg';
import NotificationUnreadIcon from '../../assets/icons/notification-badges.svg';
import { config } from '../styles/themeConfig';
import { getUnreadNotificationsByUserId } from '../services/notificationService';

const Header = ({ userId }) => {
    const { isOpen, openPopover, closePopover, notifications, setNotifications } = useNotificationStore();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const fetchedNotifications = await getUnreadNotificationsByUserId(userId);
                setNotifications(fetchedNotifications);
            } catch (error) {
                console.error("Error fetching notifications: ", error);
            }
        };

        fetchNotifications();
    }, [userId, setNotifications]);

    const unreadNotifications = notifications.filter(notification => !notification.read).length;
    const NotificationIconComponent = unreadNotifications > 0 ? NotificationUnreadIcon : NotificationIcon

    return (
        <SafeAreaView style={styles.container}>
            <HStack style={styles.hstack}>
                <Heading style={[defaultStyles.TypographyH1, styles.brand]}>Getchup!</Heading>
                <Pressable onPress={openPopover}>
                    <Icon as={NotificationIconComponent} title="open" style={styles.icon} />
                </Pressable>

                <Modal isOpen={isOpen} onClose={closePopover} style={styles.modal}>
                    <ModalContent style={styles.modalContent}>
                        <ModalHeader style={[defaultStyles.TypographyH1, styles.modalHeader]}>
                            <Heading style={styles.headerTitle}>Notifications</Heading>
                            <ModalCloseButton style={styles.closeButton} onPress={closePopover}>
                                <Icon as={CloseIcon} />
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody style={styles.modalBody}>
                            <NotificationsList userId={userId} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </HStack>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    brand: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        zIndex: 1000,
    },
    headerTitle: {
        color: config.tokens.colors.neutralDark,
        flexGrow: 1,
        textAlign: "center",
    },
    hstack: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 16,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    icon: {
        display: 'flex',
        alignSelf: 'center',
    },
    modalContent: {
        width: '100%',
        height: '85%',
        margin: 0,
        marginTop: 8,
        padding: 0,
        borderRadius: 10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        display: "flex",
    },
    modalHeader: {
        display: "flex",
    },
    closeButton: {},
    modalBody: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 0,
        display: "flex",
    },
    subTaskContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Header;
