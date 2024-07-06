import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, ModalContent, Popover, Button, HStack, Icon, Text, VStack, ModalCloseButton, Heading } from "@gluestack-ui/themed";
import { CloseIcon } from '@gluestack-ui/themed';
import useNotificationStore from '../store/notificationStore';
import NotificationsList from './NotificationList';
import { defaultStyles } from '../styles/styles';
import NotificationIcon from '../../assets/icons/notification.svg'

const Header = () => {
    const { isOpen, openPopover, closePopover } = useNotificationStore();

    return (
        <SafeAreaView style={styles.container}>
            <HStack style={styles.hstack}>
                <Heading style={[defaultStyles.TypographyH1, styles.brand]}>Getchup!</Heading>
                <NotificationIcon />
                
                <Modal isOpen={isOpen} onClose={closePopover}>
                <ModalContent style={styles.modalContent}>
                    <Heading size='lg' textAlign='center'>Notifications</Heading>
                    <ModalCloseButton style={styles.closeButton} onPress={closePopover}>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                    <VStack space={4} style={styles.modalBody}>
                        <NotificationsList />
                    </VStack>
                </ModalContent>
            </Modal> 
                {/* Replace Bell icon when designers provide the asset */}
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
        padding: 0,
        borderRadius:10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    modalNoteContent: {
        width: '100%',
        height: '25%',
        margin: 0,
        padding: 0,
        borderRadius:10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    modalPriorityContent: {
        width: '100%',
        height: '55%',
        margin: 0,
        padding: 0,
        borderRadius:10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    closeButton: {
        position: 'absolute',
        left: 10,
    },
    modalBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:50,
    },
    subTaskContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Header;
