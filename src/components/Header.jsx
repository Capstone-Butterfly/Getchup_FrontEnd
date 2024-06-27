import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, ModalContent, Popover, Button, BellIcon, HStack, Icon, Text, PopoverBackdrop, PopoverContent, PopoverHeader, PopoverCloseButton, VStack, ModalCloseButton, PopoverBody, PopoverFooter, Heading, ButtonGroup, ButtonText } from "@gluestack-ui/themed";
import { CloseIcon } from '@gluestack-ui/themed';
import useNotificationStore from '../store/notificationStore';
import NotificationsList from './NotificationList';
import { formatNotificationDate } from '../services/notificationService';

const Header = () => {
    const { isOpen, openPopover, closePopover } = useNotificationStore();

    return (
        <SafeAreaView>
            <HStack>
                <Text>Getchup!</Text>
                <Icon as={BellIcon} title="open" onPress={openPopover}/>
                
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
    container: {
        flex: 1,
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
