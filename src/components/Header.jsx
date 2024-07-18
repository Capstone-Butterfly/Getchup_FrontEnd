import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, ModalContent, HStack, Icon, Heading, Pressable, ModalHeader, ModalBody, ModalCloseButton, Text, ModalBackdrop } from "@gluestack-ui/themed";
import useNotificationStore from '../store/notificationStore';
import NotificationsList from './NotificationList';
import { defaultStyles } from '../styles/styles';
import NotificationIcon from '../../assets/icons/notification.svg';
import NotificationUnreadIcon from '../../assets/icons/notification-badges.svg';
import { config } from '../styles/themeConfig';
import { getSortedNotificationsByUserId } from '../services/notificationService';
import { useQuery } from '@tanstack/react-query';
import CloseIcon from '../../assets/icons/x.svg';

const Header = ({ userId, navigation }) => {
    const { isOpen, openPopover, closePopover } = useNotificationStore();

    const { notifications, setNotifications } = useNotificationStore((state) => ({
        notifications: state.notifications,
        setNotifications: state.setNotifications
    }));

    const { data: fetchedNotification, isLoading, error, refetch } = useQuery({
        queryKey: ['notifications', userId],
        queryFn: () => getSortedNotificationsByUserId(userId),
        onSuccess: (data) => {
            setNotifications(data)
        },
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    useEffect(() => {
        if (fetchedNotification) {
            setNotifications(fetchedNotification);
        }
    }, [fetchedNotification, setNotifications]);
    
    const unreadNotifications = notifications.filter(notification => !notification.read).length;
    const NotificationIconComponent = unreadNotifications > 0 ? NotificationUnreadIcon : NotificationIcon

    return (

        <SafeAreaView style={styles.container}>
            <HStack style={styles.hstack}>
                <Heading style={[defaultStyles.TypographyH1, styles.brand]}>Getchup!</Heading>
                <Pressable onPress={openPopover}>
                    {isLoading ? null : (
                        <Icon as={NotificationIconComponent} title="open" style={styles.icon} />
                    )}
                </Pressable>

                <Modal isOpen={isOpen} onClose={closePopover} style={styles.modal}>
                    <ModalBackdrop />
                    <ModalContent style={styles.modalContent}>
                        <ModalHeader style={[defaultStyles.TypographyH1, styles.modalHeader]}>
                            <Heading style={[defaultStyles.TypographyH1, styles.headerTitle]}>Notifications</Heading>
                            <ModalCloseButton style={styles.closeButton} onPress={closePopover}>
                                <Icon as={CloseIcon} />
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody style={styles.modalBody}>
                            <NotificationsList userId={userId} navigation={navigation} />
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
        paddingBottom: 16,
    },
    headerTitle: {
        color: config.tokens.colors.black,
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
        borderColor: "transparent"
    },
    modal: {
        height: "100%",
    },
    modalContent: {
        width: '100%',
        height: '100%',
        margin: 0,
        marginTop: 8,
        padding: 0,
        borderRadius: 0,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        display: "flex",
    },
    modalHeader: {
        display: "flex",
    },
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
    // title: {
    //     color: config.tokens.colors.black,
    // },
});

export default Header;
