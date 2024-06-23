import React, { useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import {
    AddIcon, Box, Button, ButtonText, Card, Center, CloseIcon, FlatList, HStack, Heading, Icon, Input, InputField, Pressable, Text, Modal, ModalCloseButton, ModalContent, VStack,
    ModalHeader
} from "@gluestack-ui/themed";
import { useEffect } from 'react';
import { CalendarDaysIcon } from "@gluestack-ui/themed";
import useCreateTaskStore from '../../store/createTaskStore';
import { addTask } from '../../services/tasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TitleModelScreen from './TilteModelScreen';
import { Header } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');

const AddTaskScreen = ({ navigation }) => {
    const userId = '6668b7f95dbce97bc28322d2';
    const queryClient = useQueryClient();
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    const handleSaveTitle = (newTitle) => {
        setTitle(newTitle);
        setModalVisible(false);
    };


    const mutation = useMutation({
        mutationFn: async (newTask) => await addTask(newTask),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['tasks']);
            displayData(data);
        },
    });

    const displayData = (data) => {
        console.log("New Data ", JSON.stringify(data));
    };

    const { title, setTitle } = useCreateTaskStore((state) => ({
        title: state.title,
        setTitle: state.setTitle,
    }));


    const addToTask = async () => {
        try {
            const newTask = { title: title, user_id: userId };
            await mutation.mutateAsync(newTask);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <HStack space="4xl" reversed={false}>
                <Box width='20%'>
                    <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false}>
                        <ButtonText verticalAlign="middle">Cancel</ButtonText>
                    </Button>
                </Box>
                <Box width='40%'>
                    <Center>
                        <Heading>New Task</Heading>
                    </Center>
                </Box>
                <Box width='20%'>
                    <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false}>
                        <ButtonText verticalAlign="middle">Save</ButtonText>
                    </Button>
                </Box>
            </HStack>
            <Card>
                <Pressable onPress={handleOpenModal} p="$5">
                    <Text color="black" fontWeight={"$bold"}>Add Task Title</Text>
                    <Text color="black">{title}</Text>
                </Pressable>
                <Pressable onPress={() => console.log('Date')} p="$5">
                    <Icon as={CalendarDaysIcon} stroke={'black'} fill={'black'} style={{ color: 'black' }} size="md" />
                    <Text color="black" fontWeight={"$bold"}>Date</Text>
                </Pressable>
                <Pressable onPress={() => console.log('Notes')} p="$5">
                    <Icon as={CalendarDaysIcon} stroke={'black'} fill={'black'} style={{ color: 'black' }} size="md" />
                    <Text color="black" fontWeight={"$bold"}>Notes</Text>
                </Pressable>
                <Pressable onPress={() => console.log('Task priority')} p="$5">
                    <Icon as={CalendarDaysIcon} stroke={'black'} fill={'black'} style={{ color: 'black' }} size="md" />
                    <Text color="black" fontWeight={"$bold"}>Task priority</Text>
                </Pressable>
            </Card>
            <Card>
                <Pressable onPress={() => console.log('Title')} p="$5">
                    <Text color="black" fontWeight={"$bold"}>Add subtask</Text>
                </Pressable>
                <Text>OR</Text>
                <Button size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} onPress={addToTask}>
                    <ButtonText verticalAlign="middle">Add Subtask by AI</ButtonText>
                </Button>
            </Card>
            <Modal isOpen={modalVisible} onClose={handleCloseModal}>
                <ModalContent style={styles.modalContent}>
                    <Heading size='lg' textAlign='center'>Add Task Title</Heading>
                    <ModalCloseButton style={styles.closeButton} onPress={handleCloseModal}>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                    <VStack space={4} style={styles.modalBody}>
                        <TitleModelScreen title={title} handleSaveTitle={handleSaveTitle} />
                    </VStack>
                </ModalContent>
            </Modal>
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
        backgroundColor: 'white'
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
});

export default AddTaskScreen;
