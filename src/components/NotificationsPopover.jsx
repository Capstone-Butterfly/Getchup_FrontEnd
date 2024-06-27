// components/NotificationsPopover.js
import React from 'react';
import { View, Text } from 'react-native';
import { Popover, Button, VStack, HStack, Icon } from '@gluestack-ui/themed';
import useNotificationStore from '../store/notificationStore';
import NotificationsList from './NotificationsList';
import { CloseIcon } from '@gluestack-ui/icons'; // Adjust import based on actual path

const NotificationsPopover = () => {
    const { isOpen, openPopover, closePopover } = useNotificationStore();

    return (
        <Popover
            isOpen={isOpen}
            onClose={closePopover}
            onOpen={openPopover}
            placement="bottom"
            size="md"
            trigger={() => {
                return (
                    <Button onPress={openPopover}>
                        <Text>Popover</Text>
                    </Button>
                );
            }}
        >
            <PopoverBackdrop />
            <PopoverContent>
                <PopoverHeader>
                    <Heading size='lg'>Welcome!</Heading>
                    <PopoverCloseButton onPress={closePopover}>
                        <Icon as={CloseIcon} />
                    </PopoverCloseButton>
                </PopoverHeader>
                <PopoverBody>
                    <Text size='sm'>
                        Join the product tour and start creating your own checklist. Are you ready to jump in?
                    </Text>
                </PopoverBody>
                <PopoverFooter>
                    <Text size='xs' flex={1}>
                        Step 2 of 3
                    </Text>
                    <ButtonGroup space='md'>
                        <Button variant="outline" action='secondary' onPress={closePopover}>
                            <Text>Back</Text>
                        </Button>
                        <Button onPress={closePopover}>
                            <Text>Next</Text>
                        </Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationsPopover;
