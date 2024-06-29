import React, { useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import {
    Box, Button, ButtonText, Card, Center, CloseIcon, FlatList, 
    HStack, Heading, Icon, Text, Modal, 
    ModalCloseButton, ModalContent, VStack,
    View,
    ButtonIcon,
    CloseCircleIcon,
} from "@gluestack-ui/themed";
import { useEffect } from 'react';
import useCreateTaskStore from '../../store/createTaskStore';
import useTaskStore from '../../store/taskStore';
import profileStore from '../../store/profileStore'
import { addTask, getAISubTasks } from '../../services/tasks';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../../services/QueryClient';
import TitleModalScreen from './TitleModelScreen';
import NotesModalScreen from './NotesModelScreen';
import TaskPriorityModalScreen from './TaskPriorityModelScreen'
import DateTimeModelScreen from './DateTimeModelScreen'
import SubTaskScreen from './SubTaskScreen';
import { Pressable } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from '@gluestack-ui/themed';
import DateFormatter from '../../utils/DateFormatter';
import ConvertTimeStamp from '../../utils/ConvertTimeStamp';
import { scheduleNotification } from '../../services/notificationService'

const { width, height } = Dimensions.get('window');

const AddTaskScreen = ({ navigation }) => {
    const userId = '6668b7f95dbce97bc28322d2';
    const [modalTitleVisible, setModalTitleVisible] = useState(false);
    const [modalNoteVisible, setModalNoteVisible] = useState(false);
    const [modalPriorityVisible, setModalPriorityVisible] = useState(false);
    const [modalDateTimeVisible, setModalDateTimeVisible] = useState(false);
    const [modalSubTaskVisible, setModalSubTaskVisible] = useState(false);
    const [selectedSubTaskIndex, setSelectedSubTaskIndex] = useState(null);
    const [warningMessage, setWarningMessage] = useState('');
    const { task_reminder, setTaskReminder } = useCreateTaskStore();

    const handleOpenTitleModal = () => setModalTitleVisible(true);
    const handleCloseTitleModal = () => setModalTitleVisible(false);

    const handleOpenNoteModal = () => setModalNoteVisible(true);
    const handleCloseNoteModal = () => setModalNoteVisible(false);

    const handleOpenPriorityModal = () => setModalPriorityVisible(true);
    const handleClosePriorityModal = () => setModalPriorityVisible(false);
    
    const handleOpenDateTimeModal = () => setModalDateTimeVisible(true);
    const handleCloseDateTimeModal = () => setModalDateTimeVisible(false);

    const handleOpenSubTaskModal = (index) => {
        setSelectedSubTaskIndex(index);
        setModalSubTaskVisible(true);
    };

    const handleCloseSubTaskModal = () => {
        setSelectedSubTaskIndex(null);
        setModalSubTaskVisible(false);
    };

    const { addDataTask, setSelectedDate } = useTaskStore((state) => ({
        addDataTask: state.addDataTask,
        setSelectedDate: state.setSelectedDate,
    }));

    const { subTasks, title, addSubtask, removeSubtask, notes, task_urgency, clearCreateTaskStore, 
        start_date, end_date, start_time, end_time, user_estimate_duration } = useCreateTaskStore((state) => ({
        subTasks: state.subTasks,
        title: state.title,
        setTitle: state.setTitle,
        addSubtask: state.addSubtask,
        removeSubtask: state.removeSubtask,
        notes: state.notes,
        task_urgency: state.task_urgency,
        clearCreateTaskStore: state.clearCreateTaskStore,
        start_date: state.start_date,
        end_date: state.end_date,
        start_time: state.start_time,
        end_time: state.end_time,
        user_estimate_duration: state.user_estimate_duration,
    }));


    // const {first_name, userId} = profileStore((state) => ({
    //     first_name: state.first_name,
    //     userId: state.userId
    // }));

    // useEffect(() => {
    //     if (!userId) {
    //         navigation.navigate('ProfileStack', { screen: 'SignIn' });
    //     }
    //     else {console.log("userId !!!" , userId != null ? userId: 0)}
    // }, [userId, navigation]);

    const getAIMutation = useMutation({
        mutationFn: async (title) => await getAISubTasks(title),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['createTask']);
            addSubtask(data.subtask);
        },
    });

    const saveTaskMutation = useMutation({
        mutationFn: async (task) => await addTask(task),
        onSuccess: async (data) => {
            queryClient.invalidateQueries(['tasks']); // Invalidate task queries
            addDataTask(data); // Add task to taskStore
            setSelectedDate(DateFormatter(new Date()));
        },
    });

    const getAISubTasksResult = async () => {
        try {
            const newTitle = { title: title };
            await getAIMutation.mutateAsync(newTitle);
        } catch (error) {
            console.error('Error get AI subtasks:', error);
        }
    };

const handleSaveTask = async () => {
    if (!userId || userId.length === 0) {
        setWarningMessage('User ID is required');
        return;
    }
    if (!title || title.length === 0) {
        setWarningMessage('Title is required');
        return;
    }
    if (!subTasks || subTasks.length === 0) {
        setWarningMessage('At least one subtask is required');
        return;
    }
    if (!start_date || start_date.length === 0) {
        setWarningMessage('Schedule Date is require');
        return;
    }
    setWarningMessage('');
    try {
        let notificationId = null;
        if (task_reminder) { // schedule notification
            console.log('calling scheduleNotification')
            notificationId = await scheduleNotification({
                title,
                start_date,
                start_time
            });
            console.log('Returned notification ID:', notificationId);
        }

        const adjustedTaskUrgency = task_urgency === '' ? 'medium' : task_urgency;

        const newTask = {
            user_id: userId,
            title,
            notes,
            task_urgency: adjustedTaskUrgency ,
            subtask: subTasks,
            is_repeated: false,
            estimate_start_date: start_date,
            due_date: end_date,
            estimate_start_time: ConvertTimeStamp.convertTimeStringToMilliseconds(start_time),
            estimate_end_time: ConvertTimeStamp.convertTimeStringToMilliseconds(end_time),
            user_estimate_duration,
            notification_id: notificationId
        };

        await saveTaskMutation.mutateAsync(newTask);
        clearCreateTaskStore();
        navigation.navigate('Home');
    } catch (error) {
        console.error('Error adding task:', error);
    }
};


    const handleCancel = () => {
        clearCreateTaskStore(); 
        navigation.navigate('HomeScreen'); 
    };

    const handleDeleteSubtask = (index) => {
        removeSubtask(index);
    };

    const renderContent = () => (
        <>
            <Card style={styles.cardBody}>
                <Pressable onPress={handleOpenTitleModal} p="$5" style={styles.bottomLine}>
                    <View style={styles.detailItem}>
                        <Image source={require('../../../assets/plus-circle.png')} style={styles.icon} alt='add title' />
                        <Text color="black" fontWeight={"$bold"}>{title ? title : "Add Task Title"}</Text>
                    </View>
                </Pressable>
                <Pressable onPress={handleOpenDateTimeModal} p="$5" style={styles.bottomLine}>
                    <View style={styles.detailItem}>
                        <Image source={require('../../../assets/Calendar.png')} style={styles.icon} alt='add date and time' />
                        <Text color="black" fontWeight={"$bold"}>{start_date ? start_date : "Date"}</Text>
                    </View>
                </Pressable>
                <Pressable onPress={handleOpenNoteModal} p="$5" style={styles.bottomLine}>
                    <View style={styles.detailItem}>
                    <Image source={require('../../../assets/notes.png')} style={styles.icon} alt='add notes' />
                        <Text color="black" fontWeight={"$bold"}>{notes? notes : "Notes"}</Text>
                    </View>
                </Pressable>
                <Pressable onPress={handleOpenPriorityModal} p="$5">
                    <View style={styles.detailItem}>
                        <Image source={require('../../../assets/Tasks.png')} style={styles.icon} alt='add priority'/>
                        <Text color="black" fontWeight={"$bold"}>{task_urgency? task_urgency : "Task priority"}</Text>
                    </View>
                </Pressable>
            </Card>
            <Card style={styles.cardBody}>
                <Pressable onPress={() => console.log('Title')} style={styles.bottomLine}>
                    <View style={styles.detailItem}>
                        <Image source={require('../../../assets/plus-circle.png')} style={styles.icon} alt='add subtasks'/>
                        <Text color="black" fontWeight={"$bold"}>Add subtask</Text>
                    </View>                    
                </Pressable>
                <FlatList
                    data={subTasks}
                    renderItem={({ item, index }) => (
                        <Box key={index} style={styles.subTaskContainer}>
                            <TouchableOpacity key={index} onPress={() => handleOpenSubTaskModal(index)}>
                                <View style={styles.detailSubTask}>
                                    <Text color="black" fontWeight={"$bold"}>{item.sub_title}</Text>
                                    <Text color="gray" textAlign='right'>{item.time.replace('minutes', 'min').replace('minute', 'min')}</Text>
                                </View>
                            </TouchableOpacity>
                            <Button onPress={() => handleDeleteSubtask(index)} variant="link" size='md' p='$3.5' >
                                <ButtonIcon color="$black" as={CloseCircleIcon}/>
                            </Button>
                        </Box>
                    )}
                    keyExtractor={(item) => item.sub_title}
                    windowSize={10}
                    contentContainerStyle={styles.listContent}
                />
                <Text style={styles.txtCenter}>OR</Text>
                <Button size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} onPress={getAISubTasksResult}>
                    <ButtonText verticalAlign="middle">Add Subtask by AI</ButtonText>
                </Button>
            </Card>
        </>
    );

    return (
        <SafeAreaView>
            <HStack space="4xl" reversed={false} style={styles.headerContainer}>
                <Box width='20%'>
                    <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false} onPress={handleCancel}>
                        <ButtonText verticalAlign="middle">Cancel</ButtonText>
                    </Button>
                </Box>
                <Box width='40%'>
                    <Center>
                        <Heading>New Task</Heading>
                    </Center>
                </Box>
                <Box width='20%'>
                    <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false} onPress={handleSaveTask}>
                        <ButtonText verticalAlign="middle">Save</ButtonText>
                    </Button>
                </Box>
            </HStack> 
            {warningMessage ? (
                <Box style={styles.warningBox}>
                    <Text style={styles.warningText}>{warningMessage}</Text>
                </Box>
            ) : null}
            {/* {renderContent()} */}
            <FlatList
                data={[{ key: 'content' }]} 
                renderItem={renderContent}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.container}
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
            <Modal isOpen={modalDateTimeVisible} onClose={handleCloseDateTimeModal}>
                <ModalContent style={styles.modalContent}>
                    <Heading size='lg' textAlign='center'>Date and Time</Heading>
                    <ModalCloseButton style={styles.closeButton} onPress={handleCloseDateTimeModal}>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                    <VStack space={4} style={styles.modalBody}>
                        <DateTimeModelScreen/>
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
            <Modal isOpen={modalSubTaskVisible} onClose={handleCloseSubTaskModal}>
                <ModalContent style={styles.modalPriorityContent}>
                    <Heading size='lg' textAlign='center'>Sub-task Title</Heading>
                    <ModalCloseButton style={styles.closeButton} onPress={handleCloseSubTaskModal}>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                    <VStack space={4} style={styles.modalBody}>
                        <SubTaskScreen index={selectedSubTaskIndex} />
                    </VStack>
                </ModalContent>
            </Modal>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop:20
    },
    container: {
        //flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    modalContent: {
        width: '100%',
        height: '90%',
        margin: 0,
        padding: 0,
        borderRadius:20,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    modalNoteContent: {
        width: '100%',
        height: '25%',
        margin: 0,
        padding: 0,
        borderRadius:20,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    modalPriorityContent: {
        width: '100%',
        height: '55%',
        margin: 0,
        padding: 0,
        borderRadius:20,
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
    listContent: {
        paddingBottom: 20,
        justifyContent: 'space-between'
    },
    subTaskContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical:20,
        justifyContent: 'space-between'
    },
    txtCenter: {
        textAlign: 'center',
        marginBottom:20,
    },
    cardBody:{
        borderRadius:20,
        marginBottom:20,
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    detailSubTask: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        justifyContent: 'space-between'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    warningBox: {
        padding: 10,
        backgroundColor: '#ffcccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    warningText: {
        color: '#cc0000',
    },
});

export default AddTaskScreen;
