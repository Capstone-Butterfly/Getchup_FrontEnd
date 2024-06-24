import React, { useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import {
    AddIcon, Box, Button, ButtonText, Card, Center, CloseIcon, FlatList, HStack, Heading, Icon, Input, InputField, Pressable, Text, Modal, ModalCloseButton, ModalContent, VStack,
    ModalHeader
} from "@gluestack-ui/themed";
import { useEffect } from 'react';
import { CalendarDaysIcon } from "@gluestack-ui/themed";
import useCreateTaskStore from '../../store/createTaskStore';
import { addTask, getAISubTasks } from '../../services/tasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TitleModalScreen from './TilteModelScreen';
import NotesModalScreen from './NotesModelScreen';
import TaskPriorityModalScreen from './TaskPriorityModelScreen'

const { width, height } = Dimensions.get('window');

const AddTaskScreen = ({ navigation }) => {
    const userId = '6668b7f95dbce97bc28322d2';
    const queryClient = useQueryClient();
    const [modalTitleVisible, setModalTitleVisible] = useState(false);
    const [modalNoteVisible, setModalNoteVisible] = useState(false);
    const [modalPriorityVisible, setModalPriorityVisible] = useState(false);

    const handleOpenTitleModal = () => setModalTitleVisible(true);
    const handleCloseTitleModal = () => setModalTitleVisible(false);

    const handleOpenNoteModal = () => setModalNoteVisible(true);
    const handleCloseNoteModal = () => setModalNoteVisible(false);

    const handleOpenPriorityModal = () => setModalPriorityVisible(true);
    const handleClosePriorityModal = () => setModalPriorityVisible(false);

    const handleSaveTitle = (newTitle) => {
        setTitle(newTitle);
        setModalTitleVisible(false);
    };

    const mutation = useMutation({
        mutationFn: async (title) => await getAISubTasks(title),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['tasks']);
            addSubtask(data.subtask);
        },
    });

    const displayData = (data) => {
        console.log("New Data ", JSON.stringify(data));
    };

    const { subTasks, title, setTitle, addSubtask, notes, task_urgency } = useCreateTaskStore((state) => ({
        subTasks: state.subTasks,
        title: state.title,
        setTitle: state.setTitle,
        addSubtask: state.addSubtask,
        notes: state.notes,
        task_urgency: state.task_urgency,
    }));

    // useEffect(() => {
    //     console.log("subTask!!!!! ", subTasks);
    // }, [subTasks, addSubtask]);


    const addToTask = async () => {
        try {
            const newTask = { title: title, user_id: userId };
            await mutation.mutateAsync(newTask);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const getAISubTasksResult = async () => {
        try {
            const newTitle = { title: title };
            await mutation.mutateAsync(newTitle);
        } catch (error) {
            console.error('Error get AI subtasks:', error);
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
                <Pressable onPress={handleOpenTitleModal} p="$5">
                    <Text color="black" fontWeight={"$bold"}>Add Task Title</Text>
                    <Text color="black">{title}</Text>
                </Pressable>
                <Pressable onPress={() => console.log('Date')} p="$5">
                    <Icon as={CalendarDaysIcon} stroke={'black'} fill={'black'} style={{ color: 'black' }} size="md" />
                    <Text color="black" fontWeight={"$bold"}>Date</Text>
                </Pressable>
                <Pressable onPress={handleOpenNoteModal} p="$5">
                    <Icon as={CalendarDaysIcon} stroke={'black'} fill={'black'} style={{ color: 'black' }} size="md" />
                    <Text color="black" fontWeight={"$bold"}>Notes</Text>
                    <Text color="black">{notes}</Text>
                </Pressable>
                <Pressable onPress={handleOpenPriorityModal} p="$5">
                    <Icon as={CalendarDaysIcon} stroke={'black'} fill={'black'} style={{ color: 'black' }} size="md" />
                    <Text color="black" fontWeight={"$bold"}>Task priority</Text>
                    <Text color="black">{task_urgency}</Text>
                </Pressable>
            </Card>
            <Card>
                <Pressable onPress={() => console.log('Title')} p="$5">
                    <Text color="black" fontWeight={"$bold"}>Add subtask</Text>
                </Pressable>
                <Text>OR</Text>
                <Button size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} onPress={getAISubTasksResult}>
                    <ButtonText verticalAlign="middle">Add Subtask by AI</ButtonText>
                </Button>
            </Card>
            <FlatList
            data={subTasks}
            renderItem={({ item }) => (
                <Box style={styles.subTaskContainer}>
                    <Text color="black" fontWeight={"$bold"}>{item.sub_title}</Text>
                    <Text color="black">Time: {item.time}</Text>
                    <Text color="black">Movement: {item.movement.toString()}</Text>
                </Box>
            )}
            keyExtractor={(item) => item.sub_title}
            />
            <Modal isOpen={modalTitleVisible} onClose={handleCloseTitleModal}>
                <ModalContent style={styles.modalContent}>
                    <Heading size='lg' textAlign='center'>Add Task Title</Heading>
                    <ModalCloseButton style={styles.closeButton} onPress={handleCloseTitleModal}>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                    <VStack space={4} style={styles.modalBody}>
                        <TitleModalScreen/>
                    </VStack>
                </ModalContent>
            </Modal>
            <Modal isOpen={modalNoteVisible} onClose={handleCloseNoteModal}>
                <ModalContent style={styles.modalNoteContent}>
                    <Heading size='lg' textAlign='center'>Notes</Heading>
                    <ModalCloseButton style={styles.closeButton} onPress={handleCloseNoteModal}>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                    <VStack space={4} style={styles.modalBody}>
                        <NotesModalScreen />
                    </VStack>
                </ModalContent>
            </Modal>
            <Modal isOpen={modalPriorityVisible} onClose={handleClosePriorityModal}>
                <ModalContent style={styles.modalPriorityContent}>
                    <Heading size='lg' textAlign='center'>Task Priority</Heading>
                    <ModalCloseButton style={styles.closeButton} onPress={handleClosePriorityModal}>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                    <VStack space={4} style={styles.modalBody}>
                        <TaskPriorityModalScreen />
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

export default AddTaskScreen;
