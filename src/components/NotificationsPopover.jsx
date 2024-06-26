// components/NotificationsPopover.js
import React from 'react';
import { View, Text } from 'react-native';
import { Popover, Button, VStack, HStack, Icon } from '@gluestack-ui/themed';
import useNotificationStore from '../store/notificationStore';
import NotificationsList from './NotificationsList';
import { CloseIcon } from '@gluestack-ui/icons'; // Adjust import based on actual path

const NotificationsPopover = () => {
    const isPopoverOpen = useNotificationStore((state) => state.isPopoverOpen);
    const closePopover = useNotificationStore((state) => state.closePopover);

    return (
        <Popover isOpen={isPopoverOpen} onClose={closePopover}>
            <Popover.Trigger>
                <Button onPress={closePopover} variant="ghost">
                    <Icon as={CloseIcon} />
                </Button>
            </Popover.Trigger>
            <Popover.Content>
                <VStack>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text>Notifications</Text>
                        <Button onPress={closePopover} variant="ghost">
                            <Icon as={CloseIcon} />
                        </Button>
                    </HStack>
                    <NotificationsList />
                </VStack>
            </Popover.Content>
        </Popover>
    );
};

export default NotificationsPopover;
